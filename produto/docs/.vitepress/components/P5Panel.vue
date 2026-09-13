<template>
  <div class="p5-panel">
    <div ref="canvasContainer" class="canvas-container"></div>
    <div v-if="title" class="header">
      <h2>{{ title }}</h2>
      <p v-if="subtitle">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import p5 from 'p5';

const props = defineProps({
  sketch: { type: Function, required: true },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  playing: { type: Boolean, default: true },
});

const canvasContainer = ref<HTMLElement | null>(null);
let p5Instance: any = null;

onMounted(() => {
  if (canvasContainer.value && props.playing) {
    p5Instance = new p5(props.sketch, canvasContainer.value);
  }
});

onBeforeUnmount(() => {
  if (p5Instance) {
    p5Instance.remove();
    p5Instance = null;
  }
});

watch(() => props.playing, (newVal) => {
  if (newVal) {
    if (!p5Instance && canvasContainer.value) {
      p5Instance = new p5(props.sketch, canvasContainer.value);
    }
  } else {
    if (p5Instance) {
      p5Instance.noLoop();
    }
  }
});
</script>

<style scoped>
.p5-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
}
.canvas-container {
  width: 100%;
  max-width: 600px;
}
.header {
  text-align: center;
  margin-top: 0.5rem;
}
</style>
