<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";

const props = defineProps({
  topic: {
    type: String,
    default: "default"
  },
  title: {
    type: String,
    default: ""
  },
  subtitle: {
    type: String,
    default: ""
  }
});

const canvas = ref(null);
let renderer = null;
let scene = null;
let camera = null;
let mesh = null;
let light = null;
let frameId = null;

const clearMesh = () => {
  if (!mesh || !scene) return;
  scene.remove(mesh);
  try {
    mesh.geometry?.dispose();
    mesh.material?.dispose();
  } catch (e) {
    // ignore
  }
  mesh = null;
};

const loadModuleFor = async (topic) => {
  try {
    const mod = await import(`./animations/anim_${topic}.js`);
    if (mod && typeof mod.createMesh === "function") return mod.createMesh(THREE);
  } catch (e) {
    // fallback to default
  }
  try {
    const def = await import("./animations/anim_default.js");
    return def.createMesh(THREE);
  } catch (e) {
    return null;
  }
};

const resizeRenderer = () => {
  if (!renderer || !camera || !canvas.value) return;
  const container = canvas.value.parentElement;
  const width = container.clientWidth;
  const height = container.clientHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};

const animate = () => {
  frameId = requestAnimationFrame(animate);
  if (mesh) {
    mesh.rotation.x += 0.008;
    mesh.rotation.y += 0.012;
  }
  renderer.render(scene, camera);
};

const setupScene = () => {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b1220);

  camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 3.8);

  light = new THREE.PointLight(0xffffff, 1.2, 15);
  light.position.set(2, 2, 3);
  scene.add(light);

  const ambient = new THREE.AmbientLight(0xffffff, 0.35);
  scene.add(ambient);
};

const buildMesh = async (topic) => {
  clearMesh();
  const created = await loadModuleFor(topic);
  if (created && scene) {
    mesh = created;
    scene.add(mesh);
  }
};

watch(
  () => props.topic,
  (topic) => {
    if (scene) buildMesh(topic);
  },
  { immediate: true }
);

onMounted(async () => {
  renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
    antialias: true,
    alpha: true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  setupScene();
  resizeRenderer();
  await buildMesh(props.topic);
  animate();
  window.addEventListener("resize", resizeRenderer);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeRenderer);
  cancelAnimationFrame(frameId);
  if (renderer) renderer.dispose();
  clearMesh();
});
</script>

<template>
  <div class="three-panel">
    <div class="three-header">
      <h3 class="three-title">{{ props.title || "Visualização 3D" }}</h3>
      <p v-if="props.subtitle" class="three-subtitle">{{ props.subtitle }}</p>
    </div>
    <div class="canvas-frame">
      <canvas ref="canvas" class="animation-canvas"></canvas>
    </div>
  </div>
</template>

<style scoped>
.three-panel {
  width: 100%;
  display: grid;
  gap: 14px;
}

.three-label {
  color: #cbd5e1;
  font-size: 0.92rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.canvas-frame {
  width: 100%;
  min-height: 280px;
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
</style>
