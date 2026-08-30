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
  },
  playing: {
    type: Boolean,
    default: true
  },
  showHeader: {
    type: Boolean,
    default: true
  }
});

const canvas = ref(null);
let renderer = null;
let scene = null;
let camera = null;
let mesh = null;
let defaultLights = [];
let extraObjects = [];
let updateFn = null;
let disposeFn = null;
let frameId = null;
let lastTime = 0;
let pageVisible = true;
let resizeObserver = null;

const resetCamera = () => {
  if (!camera) return;
  camera.fov = 45;
  camera.position.set(0, 0.4, 4.2);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();
};

const disposeObject = (obj) => {
  if (!obj) return;
  obj.traverse((child) => {
    child.geometry?.dispose();
    const materials = child.material
      ? Array.isArray(child.material)
        ? child.material
        : [child.material]
      : [];
    materials.forEach((material) => material?.dispose?.());
  });
};

const clearMesh = () => {
  extraObjects.forEach((obj) => {
    scene?.remove(obj);
    disposeObject(obj);
  });
  extraObjects = [];

  if (mesh && scene) {
    scene.remove(mesh);
    disposeObject(mesh);
  }
  mesh = null;
  updateFn = null;
  if (typeof disposeFn === "function") {
    try {
      disposeFn();
    } catch (e) {
      // ignore
    }
  }
  disposeFn = null;
  defaultLights.forEach((light) => {
    light.visible = true;
    if ("intensity" in light && light.userData.baseIntensity != null) {
      light.intensity = light.userData.baseIntensity;
    }
  });
  resetCamera();
};

const context = () => ({
  scene,
  camera,
  defaultLights
});

const normalizeCreated = (created, mod) => {
  if (!created) return null;
  if (created.isObject3D) {
    return {
      object: created,
      update: typeof mod.update === "function" ? mod.update : created.userData?.update,
      dispose: created.userData?.dispose
    };
  }
  if (created.object) {
    return {
      object: created.object,
      update: created.update || mod.update,
      dispose: created.dispose
    };
  }
  return null;
};

const loadModuleFor = async (topic) => {
  const tryLoad = async (name) => {
    const mod = await import(`./animations/anim_${name}.js`);
    let created = null;
    if (typeof mod.createMesh === "function") {
      created = mod.createMesh(THREE, context());
    }
    return normalizeCreated(created, mod);
  };

  try {
    const loaded = await tryLoad(topic);
    if (loaded?.object) return loaded;
  } catch (e) {
    // fallback to default
  }
  try {
    return await tryLoad("default");
  } catch (e) {
    return null;
  }
};

const resizeRenderer = () => {
  if (!renderer || !camera || !canvas.value) return;
  const container = canvas.value.parentElement;
  const width = Math.max(container.clientWidth, 1);
  const height = Math.max(container.clientHeight, 1);
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};

const stopLoop = () => {
  if (frameId) {
    cancelAnimationFrame(frameId);
    frameId = null;
  }
};

const tick = (time) => {
  frameId = requestAnimationFrame(tick);
  if (!props.playing || !pageVisible || !renderer || !scene || !camera) return;

  const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0.016;
  lastTime = time;

  if (typeof updateFn === "function" && mesh) {
    updateFn(mesh, dt, THREE, context());
  } else if (mesh) {
    mesh.rotation.x += 0.008;
    mesh.rotation.y += 0.012;
  }

  renderer.render(scene, camera);
};

const startLoop = () => {
  if (frameId) return;
  lastTime = 0;
  frameId = requestAnimationFrame(tick);
};

const setupScene = () => {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b1220);

  camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  resetCamera();

  const key = new THREE.PointLight(0xffffff, 1.15, 20);
  key.position.set(2.4, 2.2, 3.2);
  key.userData.baseIntensity = 1.15;

  const fill = new THREE.AmbientLight(0xffffff, 0.32);
  fill.userData.baseIntensity = 0.32;

  const rim = new THREE.DirectionalLight(0x93c5fd, 0.35);
  rim.position.set(-2, 1, -1);
  rim.userData.baseIntensity = 0.35;

  defaultLights = [key, fill, rim];
  defaultLights.forEach((light) => scene.add(light));
};

const buildMesh = async (topic) => {
  clearMesh();
  const loaded = await loadModuleFor(topic);
  if (loaded?.object && scene) {
    mesh = loaded.object;
    updateFn = loaded.update || null;
    disposeFn = loaded.dispose || null;
    scene.add(mesh);
    if (Array.isArray(mesh.userData?.extras)) {
      extraObjects = mesh.userData.extras;
      extraObjects.forEach((obj) => scene.add(obj));
    }
  }
};

watch(
  () => props.topic,
  (topic) => {
    if (scene) buildMesh(topic);
  }
);

watch(
  () => props.playing,
  (playing) => {
    if (playing && pageVisible) startLoop();
    else stopLoop();
  }
);

const onVisibility = () => {
  pageVisible = document.visibilityState !== "hidden";
  if (pageVisible && props.playing) startLoop();
  else if (!pageVisible) stopLoop();
};

onMounted(async () => {
  renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
    antialias: true,
    alpha: true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  setupScene();
  resizeRenderer();
  await buildMesh(props.topic);
  if (props.playing) startLoop();
  window.addEventListener("resize", resizeRenderer);
  document.addEventListener("visibilitychange", onVisibility);
  if (canvas.value?.parentElement && typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(resizeRenderer);
    resizeObserver.observe(canvas.value.parentElement);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeRenderer);
  document.removeEventListener("visibilitychange", onVisibility);
  resizeObserver?.disconnect();
  stopLoop();
  clearMesh();
  if (renderer) {
    renderer.dispose();
    renderer = null;
  }
});
</script>

<template>
  <div class="three-panel">
    <div v-if="showHeader" class="three-header">
      <h3 class="three-title">{{ title || "Visualização 3D" }}</h3>
      <p v-if="subtitle" class="three-subtitle">{{ subtitle }}</p>
    </div>
    <div class="canvas-frame">
      <canvas ref="canvas" class="animation-canvas"></canvas>
    </div>
  </div>
</template>

<style scoped>
.three-panel {
  width: 100%;
  height: 100%;
  display: grid;
  gap: 14px;
  min-height: 0;
}

.three-header {
  display: grid;
  gap: 4px;
}

.three-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

.three-subtitle {
  margin: 0;
  color: #94a3b8;
  font-size: 0.9rem;
}

.canvas-frame {
  width: 100%;
  min-height: 280px;
  height: 100%;
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
