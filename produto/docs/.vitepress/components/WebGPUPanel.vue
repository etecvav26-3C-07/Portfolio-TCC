<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps({
  title: { type: String, default: "WebGPU" },
  subtitle: { type: String, default: "" }
});

const canvas = ref(null);
const status = ref("");

let device = null;
let context = null;
let pipeline = null;
let uniformBuffer = null;
let bindGroup = null;
let vertexBuffer = null;
let indexBuffer = null;
let frameId = null;
let pageVisible = true;
let resizeObserver = null;
let start = 0;
let format = "bgra8unorm";
let depthTexture = null;

const WGSL = `
struct Uniforms {
  mvp : mat4x4<f32>,
};
@group(0) @binding(0) var<uniform> uniforms : Uniforms;

struct VSOut {
  @builtin(position) position : vec4<f32>,
  @location(0) color : vec3<f32>,
};

@vertex
fn vs_main(@location(0) position : vec3<f32>, @location(1) color : vec3<f32>) -> VSOut {
  var out : VSOut;
  out.position = uniforms.mvp * vec4<f32>(position, 1.0);
  out.color = color;
  return out;
}

@fragment
fn fs_main(in : VSOut) -> @location(0) vec4<f32> {
  return vec4<f32>(in.color, 1.0);
}
`;

const identity = () => new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

const multiply = (a, b) => {
  const out = new Float32Array(16);
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      out[j * 4 + i] =
        a[i] * b[j * 4] +
        a[i + 4] * b[j * 4 + 1] +
        a[i + 8] * b[j * 4 + 2] +
        a[i + 12] * b[j * 4 + 3];
    }
  }
  return out;
};

const perspective = (fov, aspect, near, far) => {
  const f = 1 / Math.tan(fov / 2);
  const nf = 1 / (near - far);
  const out = new Float32Array(16);
  out[0] = f / aspect;
  out[5] = f;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[14] = 2 * far * near * nf;
  return out;
};

const translate = (x, y, z) => {
  const m = identity();
  m[12] = x;
  m[13] = y;
  m[14] = z;
  return m;
};

const rotateX = (r) => {
  const c = Math.cos(r);
  const s = Math.sin(r);
  const m = identity();
  m[5] = c;
  m[6] = s;
  m[9] = -s;
  m[10] = c;
  return m;
};

const rotateY = (r) => {
  const c = Math.cos(r);
  const s = Math.sin(r);
  const m = identity();
  m[0] = c;
  m[2] = -s;
  m[8] = s;
  m[10] = c;
  return m;
};

const cubeInterleaved = () => {
  const faces = [
    { c: [0.45, 0.85, 1.0], v: [-0.7, -0.7, 0.7, 0.7, -0.7, 0.7, 0.7, 0.7, 0.7, -0.7, 0.7, 0.7] },
    { c: [0.62, 0.48, 1.0], v: [0.7, -0.7, -0.7, -0.7, -0.7, -0.7, -0.7, 0.7, -0.7, 0.7, 0.7, -0.7] },
    { c: [1.0, 0.48, 0.74], v: [-0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, -0.7, -0.7, 0.7, -0.7] },
    { c: [0.2, 0.92, 0.78], v: [-0.7, -0.7, -0.7, 0.7, -0.7, -0.7, 0.7, -0.7, 0.7, -0.7, -0.7, 0.7] },
    { c: [1.0, 0.78, 0.3], v: [0.7, -0.7, 0.7, 0.7, -0.7, -0.7, 0.7, 0.7, -0.7, 0.7, 0.7, 0.7] },
    { c: [0.68, 0.9, 0.4], v: [-0.7, -0.7, -0.7, -0.7, -0.7, 0.7, -0.7, 0.7, 0.7, -0.7, 0.7, -0.7] }
  ];
  const data = [];
  const indices = [];
  let offset = 0;
  faces.forEach((face) => {
    for (let i = 0; i < 4; i++) {
      data.push(face.v[i * 3], face.v[i * 3 + 1], face.v[i * 3 + 2], ...face.c);
    }
    indices.push(offset, offset + 1, offset + 2, offset, offset + 2, offset + 3);
    offset += 4;
  });
  return { vertices: new Float32Array(data), indices: new Uint16Array(indices) };
};

const resize = () => {
  if (!canvas.value || !context || !device) return;
  const frame = canvas.value.parentElement;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(Math.floor(frame.clientWidth * dpr), 1);
  const height = Math.max(Math.floor(frame.clientHeight * dpr), 1);
  canvas.value.width = width;
  canvas.value.height = height;
  context.configure({
    device,
    format,
    alphaMode: "opaque"
  });
  depthTexture?.destroy?.();
  depthTexture = device.createTexture({
    size: { width, height },
    format: "depth24plus",
    usage: GPUTextureUsage.RENDER_ATTACHMENT
  });
};

const draw = (time) => {
  frameId = requestAnimationFrame(draw);
  if (!pageVisible || !device || !context || !pipeline || !depthTexture) return;
  const t = (time - start) / 1000;
  const aspect = canvas.value.width / Math.max(canvas.value.height, 1);
  const mvp = multiply(
    perspective((45 * Math.PI) / 180, aspect, 0.1, 20),
    multiply(translate(0, 0, -4.2), multiply(rotateY(t * 0.85), rotateX(t * 0.4)))
  );
  device.queue.writeBuffer(uniformBuffer, 0, mvp);

  const encoder = device.createCommandEncoder();
  const view = context.getCurrentTexture().createView();
  const pass = encoder.beginRenderPass({
    colorAttachments: [
      {
        view,
        clearValue: { r: 0.043, g: 0.071, b: 0.125, a: 1 },
        loadOp: "clear",
        storeOp: "store"
      }
    ],
    depthStencilAttachment: {
      view: depthTexture.createView(),
      depthClearValue: 1,
      depthLoadOp: "clear",
      depthStoreOp: "store"
    }
  });
  pass.setPipeline(pipeline);
  pass.setBindGroup(0, bindGroup);
  pass.setVertexBuffer(0, vertexBuffer);
  pass.setIndexBuffer(indexBuffer, "uint16");
  pass.drawIndexed(36);
  pass.end();
  device.queue.submit([encoder.finish()]);
};

const onVisibility = () => {
  pageVisible = document.visibilityState !== "hidden";
};

onMounted(async () => {
  if (!navigator.gpu) {
    status.value = "WebGPU não está disponível neste navegador. Use Chrome ou Edge recente com a API habilitada.";
    return;
  }
  try {
    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
      status.value = "Nenhum adaptador WebGPU foi encontrado.";
      return;
    }
    device = await adapter.requestDevice();
    context = canvas.value.getContext("webgpu");
    format = navigator.gpu.getPreferredCanvasFormat();
    resize();

    const mesh = cubeInterleaved();
    vertexBuffer = device.createBuffer({
      size: mesh.vertices.byteLength,
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
    });
    device.queue.writeBuffer(vertexBuffer, 0, mesh.vertices);
    indexBuffer = device.createBuffer({
      size: mesh.indices.byteLength,
      usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST
    });
    device.queue.writeBuffer(indexBuffer, 0, mesh.indices);

    uniformBuffer = device.createBuffer({
      size: 64,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    });

    const module = device.createShaderModule({ code: WGSL });
    pipeline = device.createRenderPipeline({
      layout: "auto",
      vertex: {
        module,
        entryPoint: "vs_main",
        buffers: [
          {
            arrayStride: 24,
            attributes: [
              { shaderLocation: 0, offset: 0, format: "float32x3" },
              { shaderLocation: 1, offset: 12, format: "float32x3" }
            ]
          }
        ]
      },
      fragment: {
        module,
        entryPoint: "fs_main",
        targets: [{ format }]
      },
      primitive: { topology: "triangle-list", cullMode: "back" },
      depthStencil: { format: "depth24plus", depthWriteEnabled: true, depthCompare: "less" }
    });
    bindGroup = device.createBindGroup({
      layout: pipeline.getBindGroupLayout(0),
      entries: [{ binding: 0, resource: { buffer: uniformBuffer } }]
    });

    start = performance.now();
    frameId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    if (canvas.value.parentElement && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas.value.parentElement);
    }
  } catch (error) {
    status.value = "Não foi possível iniciar o WebGPU neste dispositivo.";
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resize);
  document.removeEventListener("visibilitychange", onVisibility);
  resizeObserver?.disconnect();
  if (frameId) cancelAnimationFrame(frameId);
  device?.destroy?.();
});
</script>

<template>
  <div class="demo-panel">
    <div class="demo-header">
      <h3 class="demo-title">{{ title }}</h3>
      <p v-if="subtitle" class="demo-subtitle">{{ subtitle }}</p>
    </div>
    <div class="canvas-frame">
      <canvas ref="canvas" class="animation-canvas"></canvas>
      <p v-if="status" class="demo-status">{{ status }}</p>
    </div>
  </div>
</template>

<style scoped>
.demo-panel {
  width: 100%;
  display: grid;
  gap: 14px;
}

.demo-header {
  display: grid;
  gap: 4px;
}

.demo-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

.demo-subtitle {
  margin: 0;
  color: #94a3b8;
  font-size: 0.9rem;
}

.canvas-frame {
  position: relative;
  width: 100%;
  min-height: 320px;
  height: 360px;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.08);
  background: radial-gradient(circle at top, rgba(56, 189, 248, 0.12), transparent 30%),
    radial-gradient(circle at bottom, rgba(99, 102, 241, 0.12), transparent 40%);
}

.animation-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.demo-status {
  position: absolute;
  inset: 0;
  margin: 0;
  display: grid;
  place-items: center;
  padding: 24px;
  color: #cbd5e1;
  text-align: center;
}
</style>
