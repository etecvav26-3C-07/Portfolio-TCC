<template>
  <div class="three-panel">
    <div class="canvas-frame" @pointerdown="onPointerDown" @pointermove="onPointerMove" @pointerup="onPointerUp" @pointerleave="onPointerUp" @pointercancel="onPointerUp">
      <canvas ref="canvas" class="animation-canvas"></canvas>
      <div class="three-overlay">
        <span class="type-badge">🌐 3D Interativo • Arraste para Girar</span>
        <div class="btn-group">
          <button 
            type="button" 
            class="ctrl-btn" 
            :class="{ active: isWireframe }" 
            title="Alternar Modo Wireframe" 
            @click.stop="toggleWireframe"
          >
            🕸
          </button>
          <button 
            type="button" 
            class="ctrl-btn" 
            title="Resetar Orientação" 
            @click.stop="resetOrientation"
          >
            ↺
          </button>
          <button 
            type="button" 
            class="ctrl-btn" 
            :title="isLocalPlaying ? 'Pausar Rotação' : 'Continuar Rotação'" 
            @click.stop="togglePlay"
          >
            {{ isLocalPlaying ? '⏸' : '▶' }}
          </button>
        </div>
      </div>
    </div>
    <div v-if="showHeader && title" class="three-header">
      <h3 class="three-title">{{ title }}</h3>
      <p v-if="subtitle" class="three-subtitle">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";

const props = defineProps({
  topic: { type: String, default: "default" },
  title: { type: String, default: "" },
  subtitle: { type: String, default: "" },
  playing: { type: Boolean, default: true },
  showHeader: { type: Boolean, default: true }
});

const canvas = ref(null);
const isLocalPlaying = ref(props.playing);
const isWireframe = ref(false);

let renderer = null;
let scene = null;
let camera = null;
let mesh = null;
let userPivot = null;
let defaultLights = [];
let extraObjects = [];
let particlesMesh = null;
let gridFloor = null;
let updateFn = null;
let disposeFn = null;
let frameId = null;
let lastTime = 0;
let pageVisible = true;
let resizeObserver = null;

// Interaction & Inertia state
let isDragging = false;
let previousPointerPosition = { x: 0, y: 0 };
let targetRotation = { x: 0, y: 0 };
let currentRotation = { x: 0, y: 0 };
let userHasInteracted = false;

const onPointerDown = (e) => {
  if (e.target.closest("button")) return;
  isDragging = true;
  userHasInteracted = true;
  previousPointerPosition = { x: e.clientX, y: e.clientY };
  try {
    e.currentTarget?.setPointerCapture?.(e.pointerId);
  } catch (err) {}
};

const onPointerMove = (e) => {
  if (!isDragging) return;
  const deltaX = e.clientX - previousPointerPosition.x;
  const deltaY = e.clientY - previousPointerPosition.y;

  targetRotation.y += deltaX * 0.008;
  // Limitar pitch vertical entre ~-75° e +75° para evitar inversão ou desorientação
  targetRotation.x = Math.max(-1.3, Math.min(1.3, targetRotation.x + deltaY * 0.008));

  previousPointerPosition = { x: e.clientX, y: e.clientY };
};

const onPointerUp = (e) => {
  if (!isDragging) return;
  isDragging = false;
  try {
    if (e?.currentTarget && e.pointerId != null) {
      e.currentTarget.releasePointerCapture?.(e.pointerId);
    }
  } catch (err) {}
};

const togglePlay = () => {
  isLocalPlaying.value = !isLocalPlaying.value;
};

const toggleWireframe = () => {
  isWireframe.value = !isWireframe.value;
  if (!mesh) return;
  mesh.traverse((child) => {
    if (child.isMesh && child.material) {
      if (Array.isArray(child.material)) {
        child.material.forEach((m) => { m.wireframe = isWireframe.value; });
      } else {
        child.material.wireframe = isWireframe.value;
      }
    }
  });
};

const resetOrientation = () => {
  targetRotation.x = 0;
  targetRotation.y = 0;
  currentRotation.x = 0;
  currentRotation.y = 0;
  if (userPivot) {
    userPivot.rotation.set(0, 0, 0);
  }
  resetCamera();
};

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
      ? Array.isArray(child.material) ? child.material : [child.material]
      : [];
    materials.forEach((m) => m?.dispose?.());
  });
};

const clearMesh = () => {
  extraObjects.forEach((obj) => {
    userPivot?.remove(obj);
    scene?.remove(obj);
    disposeObject(obj);
  });
  extraObjects = [];

  if (mesh && userPivot) {
    userPivot.remove(mesh);
    disposeObject(mesh);
  } else if (mesh && scene) {
    scene.remove(mesh);
    disposeObject(mesh);
  }
  mesh = null;
  updateFn = null;
  if (typeof disposeFn === "function") {
    try { disposeFn(); } catch (e) {}
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
  } catch (e) {}
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
  if (!pageVisible || !renderer || !scene || !camera) return;

  const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0.016;
  lastTime = time;

  // Orbit inertia interpolation
  currentRotation.x += (targetRotation.x - currentRotation.x) * 0.1;
  currentRotation.y += (targetRotation.y - currentRotation.y) * 0.1;

  if (userPivot) {
    if (isLocalPlaying.value && !isDragging) {
      targetRotation.y += dt * 0.35;
      if (!userHasInteracted) {
        targetRotation.x = Math.sin(time * 0.001) * 0.12;
      }
    }
    userPivot.rotation.x = currentRotation.x;
    userPivot.rotation.y = currentRotation.y;
  }

  if (mesh && typeof updateFn === "function") {
    updateFn(mesh, dt, THREE, context());
  }

  // Drift ambient particles
  if (particlesMesh) {
    particlesMesh.rotation.y += dt * 0.05;
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
  scene.background = new THREE.Color(0x0c0f1d);
  scene.fog = new THREE.FogExp2(0x0c0f1d, 0.08);

  camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  resetCamera();

  userPivot = new THREE.Group();
  scene.add(userPivot);

  const key = new THREE.PointLight(0xffffff, 2.0, 25);
  key.position.set(2.5, 2.5, 3.5);
  key.userData.baseIntensity = 2.0;

  const fill = new THREE.AmbientLight(0xffffff, 0.65);
  fill.userData.baseIntensity = 0.65;

  const rim = new THREE.DirectionalLight(0x38bdf8, 1.2);
  rim.position.set(-3, 2, -2);
  rim.userData.baseIntensity = 1.2;

  defaultLights = [key, fill, rim];
  defaultLights.forEach((light) => scene.add(light));

  // Holographic Subtle Grid Floor
  const gridHelper = new THREE.GridHelper(16, 24, 0x38bdf8, 0x1e293b);
  gridHelper.position.y = -1.35;
  gridHelper.material.transparent = true;
  gridHelper.material.opacity = 0.35;
  scene.add(gridHelper);
  gridFloor = gridHelper;

  // Atmospheric Star/Dust Particles
  const particleCount = 70;
  const pGeom = new THREE.BufferGeometry();
  const pPos = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    pPos[i] = (Math.random() - 0.5) * 8;
    pPos[i + 1] = (Math.random() - 0.5) * 6;
    pPos[i + 2] = (Math.random() - 0.5) * 8;
  }
  pGeom.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({
    color: 0x38bdf8,
    size: 0.04,
    transparent: true,
    opacity: 0.5
  });
  particlesMesh = new THREE.Points(pGeom, pMat);
  scene.add(particlesMesh);
};

let buildToken = 0;
const buildMesh = async (topic) => {
  const token = ++buildToken;
  clearMesh();
  const loaded = await loadModuleFor(topic);
  if (token !== buildToken) {
    if (loaded?.object) disposeObject(loaded.object);
    return;
  }
  if (loaded?.object && scene) {
    mesh = loaded.object;
    updateFn = loaded.update || null;
    disposeFn = loaded.dispose || null;
    if (userPivot) {
      userPivot.add(mesh);
    } else {
      scene.add(mesh);
    }
    if (Array.isArray(mesh.userData?.extras)) {
      extraObjects = mesh.userData.extras;
      extraObjects.forEach((obj) => (userPivot ? userPivot.add(obj) : scene.add(obj)));
    }
  }
};

watch(
  () => props.topic,
  (topic) => {
    isDragging = false;
    resetOrientation();
    userHasInteracted = false;
    isWireframe.value = false;
    if (scene) buildMesh(topic);
  }
);

watch(
  () => props.playing,
  (val) => {
    isLocalPlaying.value = val;
  }
);

const onVisibility = () => {
  pageVisible = document.visibilityState !== "hidden";
  if (pageVisible) startLoop();
  else stopLoop();
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
  startLoop();
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
  if (particlesMesh) {
    disposeObject(particlesMesh);
    scene?.remove(particlesMesh);
  }
  if (gridFloor) {
    disposeObject(gridFloor);
    scene?.remove(gridFloor);
  }
  if (renderer) {
    renderer.dispose();
    renderer = null;
  }
});
</script>

<style scoped>
.three-panel {
  width: 100%;
  display: grid;
  gap: 12px;
  margin: 1.75rem 0;
}

.three-header {
  display: grid;
  gap: 4px;
}

.three-title {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--vp-c-text-1, #f1f5f9);
}

.three-subtitle {
  margin: 0;
  color: #94a3b8;
  font-size: 0.88rem;
  line-height: 1.4;
}

.canvas-frame {
  position: relative;
  width: 100%;
  min-height: 280px;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(56, 189, 248, 0.22);
  background: radial-gradient(circle at center, #151930 0%, #0c0f1d 85%);
  box-shadow: 0 10px 35px -8px rgba(0, 0, 0, 0.6), 0 0 20px -4px rgba(56, 189, 248, 0.12);
  cursor: grab;
  user-select: none;
  touch-action: none;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.canvas-frame:active {
  cursor: grabbing;
}

.canvas-frame:hover {
  border-color: rgba(56, 189, 248, 0.4);
  box-shadow: 0 14px 45px -8px rgba(0, 0, 0, 0.7), 0 0 28px -4px rgba(56, 189, 248, 0.2);
}

.animation-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.three-overlay {
  position: absolute;
  top: 10px;
  right: 12px;
  left: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  pointer-events: none;
  z-index: 2;
}

.type-badge {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  padding: 3px 9px;
  border-radius: 6px;
  background: rgba(15, 23, 42, 0.75);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.3);
  backdrop-filter: blur(8px);
}

.btn-group {
  display: flex;
  align-items: center;
  gap: 6px;
  pointer-events: auto;
}

.ctrl-btn {
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: rgba(15, 23, 42, 0.75);
  color: #94a3b8;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s ease;
}

.ctrl-btn:hover {
  color: #ffffff;
  background: rgba(56, 189, 248, 0.25);
  border-color: rgba(56, 189, 248, 0.4);
}

.ctrl-btn.active {
  color: #38bdf8;
  border-color: #38bdf8;
  background: rgba(56, 189, 248, 0.2);
}
</style>
