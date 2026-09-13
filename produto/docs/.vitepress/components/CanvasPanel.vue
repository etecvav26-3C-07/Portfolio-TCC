<template>
  <div class="canvas-panel">
    <div class="canvas-frame">
      <canvas ref="canvas" class="animation-canvas"></canvas>
      <div class="canvas-overlay">
        <span class="type-badge">📐 Diagrama Didático 2D</span>
        <button 
          type="button" 
          class="ctrl-btn" 
          :title="isLocalPlaying ? 'Pausar' : 'Continuar'" 
          @click="togglePlay"
        >
          {{ isLocalPlaying ? '⏸' : '▶' }}
        </button>
      </div>
    </div>
    <div v-if="title" class="canvas-header">
      <div class="title-row">
        <h3 class="canvas-title">{{ title }}</h3>
      </div>
      <p v-if="subtitle" class="canvas-subtitle">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";

const props = defineProps({
  sketch: { type: Function, required: true },
  title: { type: String, default: "" },
  subtitle: { type: String, default: "" },
  width: { type: Number, default: 600 },
  height: { type: Number, default: 300 },
  playing: { type: Boolean, default: true },
});

const canvas = ref(null);
const isLocalPlaying = ref(props.playing);
let ctx = null;
let frameId = null;
let startTime = 0;
let lastTime = 0;
let pageVisible = true;
let resizeObserver = null;

const togglePlay = () => {
  isLocalPlaying.value = !isLocalPlaying.value;
  if (isLocalPlaying.value) startLoop();
  else stopLoop();
};

const resizeCanvas = () => {
  if (!canvas.value) return;
  const container = canvas.value.parentElement;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = container.clientWidth;
  const h = Math.min(props.height, Math.max(220, w * 0.52));
  canvas.value.width = w * dpr;
  canvas.value.height = h * dpr;
  canvas.value.style.width = w + "px";
  canvas.value.style.height = h + "px";
  if (ctx) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
};

const tick = (timestamp) => {
  if (!isLocalPlaying.value || !pageVisible || !ctx || !canvas.value) {
    frameId = requestAnimationFrame(tick);
    return;
  }
  if (!startTime) startTime = timestamp;
  const time = (timestamp - startTime) / 1000;
  const dt = lastTime ? Math.min((timestamp - lastTime) / 1000, 0.05) : 0.016;
  lastTime = timestamp;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = canvas.value.width / dpr;
  const h = canvas.value.height / dpr;

  ctx.save();
  try {
    props.sketch(ctx, w, h, time, dt);
  } catch (e) {
    // silently ignore sketch errors
  }
  ctx.restore();
  frameId = requestAnimationFrame(tick);
};

const startLoop = () => {
  if (frameId) return;
  lastTime = 0;
  frameId = requestAnimationFrame(tick);
};

const stopLoop = () => {
  if (frameId) {
    cancelAnimationFrame(frameId);
    frameId = null;
  }
};

const onVisibility = () => {
  pageVisible = document.visibilityState !== "hidden";
  if (pageVisible && isLocalPlaying.value) startLoop();
  else if (!pageVisible) stopLoop();
};

watch(
  () => props.playing,
  (val) => {
    isLocalPlaying.value = val;
    if (val && pageVisible) startLoop();
    else stopLoop();
  }
);

onMounted(() => {
  if (!canvas.value) return;
  ctx = canvas.value.getContext("2d");
  resizeCanvas();
  if (isLocalPlaying.value) startLoop();
  window.addEventListener("resize", resizeCanvas);
  document.addEventListener("visibilitychange", onVisibility);
  if (canvas.value.parentElement && typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas.value.parentElement);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeCanvas);
  document.removeEventListener("visibilitychange", onVisibility);
  resizeObserver?.disconnect();
  stopLoop();
  ctx = null;
});
</script>

<style scoped>
.canvas-panel {
  width: 100%;
  display: grid;
  gap: 12px;
  margin: 1.75rem 0;
}

.canvas-header {
  display: grid;
  gap: 4px;
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.canvas-title {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--vp-c-text-1, #f1f5f9);
}

.canvas-subtitle {
  margin: 0;
  color: #94a3b8;
  font-size: 0.88rem;
  line-height: 1.4;
}

.canvas-frame {
  position: relative;
  width: 100%;
  min-height: 220px;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(56, 189, 248, 0.18);
  background: #0f111e;
  box-shadow: 0 8px 32px -8px rgba(0, 0, 0, 0.5), 0 0 16px -4px rgba(56, 189, 248, 0.08);
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.canvas-frame:hover {
  border-color: rgba(56, 189, 248, 0.35);
  box-shadow: 0 12px 40px -8px rgba(0, 0, 0, 0.6), 0 0 24px -4px rgba(56, 189, 248, 0.15);
}

.animation-canvas {
  width: 100%;
  display: block;
}

.canvas-overlay {
  position: absolute;
  top: 10px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  pointer-events: none;
  z-index: 2;
}

.type-badge {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  padding: 3px 8px;
  border-radius: 6px;
  background: rgba(15, 23, 42, 0.75);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.25);
  backdrop-filter: blur(8px);
}

.ctrl-btn {
  pointer-events: auto;
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
  background: rgba(56, 189, 248, 0.2);
  border-color: rgba(56, 189, 248, 0.4);
}
</style>
