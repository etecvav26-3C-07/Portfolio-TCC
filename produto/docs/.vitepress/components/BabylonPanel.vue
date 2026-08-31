<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps({
  title: { type: String, default: "Babylon.js" },
  subtitle: { type: String, default: "" },
  preferWebGPU: { type: Boolean, default: false }
});

const canvas = ref(null);
const status = ref("");
const backend = ref("");

let engine = null;
let scene = null;
let resizeObserver = null;

const loadBabylon = () =>
  new Promise((resolve, reject) => {
    if (window.BABYLON) {
      resolve(window.BABYLON);
      return;
    }
    const existing = document.querySelector("script[data-babylon]");
    if (existing) {
      existing.addEventListener("load", () => resolve(window.BABYLON));
      existing.addEventListener("error", reject);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdn.babylonjs.com/babylon.js";
    script.async = true;
    script.dataset.babylon = "true";
    script.onload = () => resolve(window.BABYLON);
    script.onerror = reject;
    document.head.appendChild(script);
  });

onMounted(async () => {
  try {
    const BABYLON = await loadBabylon();
    const tryWebGPU = props.preferWebGPU && navigator.gpu && BABYLON.WebGPUEngine;
    if (tryWebGPU) {
      try {
        engine = new BABYLON.WebGPUEngine(canvas.value, { adaptToDeviceRatio: true });
        await engine.initAsync();
        backend.value = "WebGPU";
      } catch (gpuError) {
        engine = null;
      }
    }
    if (!engine) {
      engine = new BABYLON.Engine(canvas.value, true, {
        preserveDrawingBuffer: false,
        stencil: false,
        adaptToDeviceRatio: true
      });
      backend.value = props.preferWebGPU ? "WebGL (fallback)" : "WebGL";
    }
    scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0.043, 0.071, 0.125, 1);

    const camera = new BABYLON.ArcRotateCamera(
      "camera",
      Math.PI / 3,
      Math.PI / 2.4,
      6.2,
      BABYLON.Vector3.Zero(),
      scene
    );
    camera.lowerRadiusLimit = 3.5;
    camera.upperRadiusLimit = 10;

    const hemi = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
    hemi.intensity = 0.45;

    const point = new BABYLON.PointLight("point", new BABYLON.Vector3(2.4, 2.2, 3), scene);
    point.intensity = 0.9;
    point.diffuse = new BABYLON.Color3(0.7, 0.85, 1);

    const knot = BABYLON.MeshBuilder.CreateTorusKnot(
      "knot",
      { radius: 0.95, tube: 0.28, radialSegments: 96, tubularSegments: 32, p: 2, q: 3 },
      scene
    );
    const material = new BABYLON.StandardMaterial("mat", scene);
    material.diffuseColor = new BABYLON.Color3(0.45, 0.72, 0.98);
    material.specularColor = new BABYLON.Color3(0.9, 0.95, 1);
    material.emissiveColor = new BABYLON.Color3(0.05, 0.1, 0.18);
    knot.material = material;

    const orbit = BABYLON.MeshBuilder.CreateSphere("orbit", { diameter: 0.28, segments: 16 }, scene);
    const glow = new BABYLON.StandardMaterial("glow", scene);
    glow.emissiveColor = new BABYLON.Color3(1, 0.82, 0.42);
    glow.disableLighting = true;
    orbit.material = glow;

    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
    const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
    groundMat.diffuseColor = new BABYLON.Color3(0.07, 0.09, 0.14);
    groundMat.specularColor = new BABYLON.Color3(0, 0, 0);
    ground.position.y = -1.45;
    ground.material = groundMat;

    scene.onBeforeRenderObservable.add(() => {
      const t = performance.now() * 0.001;
      knot.rotation.y = t * 0.55;
      knot.rotation.x = Math.sin(t * 0.4) * 0.25;
      camera.alpha = Math.PI / 3 + t * 0.18;
      orbit.position.set(Math.cos(t) * 2.1, 0.4 + Math.sin(t * 1.4) * 0.35, Math.sin(t) * 2.1);
      point.position.copyFrom(orbit.position);
    });

    engine.runRenderLoop(() => scene.render());

    const resize = () => engine?.resize();
    window.addEventListener("resize", resize);
    if (canvas.value.parentElement && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas.value.parentElement);
    }
    canvas.value._babylonResize = resize;
  } catch (error) {
    status.value = "Não foi possível carregar o Babylon.js. Verifique a conexão com a internet.";
  }
});

onBeforeUnmount(() => {
  if (canvas.value?._babylonResize) {
    window.removeEventListener("resize", canvas.value._babylonResize);
  }
  resizeObserver?.disconnect();
  scene?.dispose();
  engine?.dispose();
});
</script>

<template>
  <div class="demo-panel">
    <div class="demo-header">
      <h3 class="demo-title">{{ title }}</h3>
      <p v-if="subtitle || backend" class="demo-subtitle">
        {{ subtitle }}<template v-if="backend"> · {{ backend }}</template>
      </p>
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
  touch-action: none;
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
