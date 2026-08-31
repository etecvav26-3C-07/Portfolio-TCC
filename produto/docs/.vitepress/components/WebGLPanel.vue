<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps({
  title: { type: String, default: "WebGL" },
  subtitle: { type: String, default: "" }
});

const canvas = ref(null);
const status = ref("");

let gl = null;
let program = null;
let vao = null;
let frameId = null;
let pageVisible = true;
let resizeObserver = null;
let start = 0;

const VS = `#version 300 es
in vec3 aPosition;
in vec3 aColor;
uniform mat4 uMVP;
out vec3 vColor;
void main() {
  vColor = aColor;
  gl_Position = uMVP * vec4(aPosition, 1.0);
}
`;

const FS = `#version 300 es
precision mediump float;
in vec3 vColor;
out vec4 outColor;
void main() {
  outColor = vec4(vColor, 1.0);
}
`;

const compile = (type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(log);
  }
  return shader;
};

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

const cubeData = () => {
  const faces = [
    { n: [0, 0, 1], c: [0.38, 0.75, 0.98], v: [-1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1] },
    { n: [0, 0, -1], c: [0.49, 0.4, 0.93], v: [1, -1, -1, -1, -1, -1, -1, 1, -1, 1, 1, -1] },
    { n: [0, 1, 0], c: [0.96, 0.45, 0.71], v: [-1, 1, 1, 1, 1, 1, 1, 1, -1, -1, 1, -1] },
    { n: [0, -1, 0], c: [0.25, 0.88, 0.82], v: [-1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1] },
    { n: [1, 0, 0], c: [0.98, 0.75, 0.35], v: [1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1] },
    { n: [-1, 0, 0], c: [0.67, 0.88, 0.39], v: [-1, -1, -1, -1, -1, 1, -1, 1, 1, -1, 1, -1] }
  ];
  const positions = [];
  const colors = [];
  const indices = [];
  let offset = 0;
  faces.forEach((face) => {
    for (let i = 0; i < 4; i++) {
      positions.push(face.v[i * 3] * 0.7, face.v[i * 3 + 1] * 0.7, face.v[i * 3 + 2] * 0.7);
      colors.push(...face.c);
    }
    indices.push(offset, offset + 1, offset + 2, offset, offset + 2, offset + 3);
    offset += 4;
  });
  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    indices: new Uint16Array(indices)
  };
};

const resize = () => {
  if (!gl || !canvas.value) return;
  const frame = canvas.value.parentElement;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(frame.clientWidth, 1);
  const height = Math.max(frame.clientHeight, 1);
  canvas.value.width = Math.floor(width * dpr);
  canvas.value.height = Math.floor(height * dpr);
  gl.viewport(0, 0, canvas.value.width, canvas.value.height);
};

const draw = (time) => {
  frameId = requestAnimationFrame(draw);
  if (!pageVisible || !gl || !program) return;
  const t = (time - start) / 1000;
  const aspect = canvas.value.width / Math.max(canvas.value.height, 1);
  const mvp = multiply(
    perspective((45 * Math.PI) / 180, aspect, 0.1, 20),
    multiply(translate(0, 0, -4.2), multiply(rotateY(t * 0.8), rotateX(t * 0.45)))
  );

  gl.clearColor(0.043, 0.071, 0.125, 1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.useProgram(program);
  gl.bindVertexArray(vao);
  gl.uniformMatrix4fv(gl.getUniformLocation(program, "uMVP"), false, mvp);
  gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
};

const onVisibility = () => {
  pageVisible = document.visibilityState !== "hidden";
};

onMounted(() => {
  gl = canvas.value.getContext("webgl2", { antialias: true, alpha: false });
  if (!gl) {
    status.value = "Este navegador não oferece WebGL 2.";
    return;
  }

  const vs = compile(gl.VERTEX_SHADER, VS);
  const fs = compile(gl.FRAGMENT_SHADER, FS);
  program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    status.value = "Não foi possível ligar o programa GLSL.";
    return;
  }

  const data = cubeData();
  vao = gl.createVertexArray();
  gl.bindVertexArray(vao);

  const pos = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pos);
  gl.bufferData(gl.ARRAY_BUFFER, data.positions, gl.STATIC_DRAW);
  const aPosition = gl.getAttribLocation(program, "aPosition");
  gl.enableVertexAttribArray(aPosition);
  gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);

  const col = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, col);
  gl.bufferData(gl.ARRAY_BUFFER, data.colors, gl.STATIC_DRAW);
  const aColor = gl.getAttribLocation(program, "aColor");
  gl.enableVertexAttribArray(aColor);
  gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);

  const idx = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idx);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data.indices, gl.STATIC_DRAW);

  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);
  resize();
  start = performance.now();
  frameId = requestAnimationFrame(draw);
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", onVisibility);
  if (canvas.value.parentElement && typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas.value.parentElement);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resize);
  document.removeEventListener("visibilitychange", onVisibility);
  resizeObserver?.disconnect();
  if (frameId) cancelAnimationFrame(frameId);
  if (gl && program) gl.deleteProgram(program);
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
