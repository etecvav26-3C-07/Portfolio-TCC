<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import ThreePanel from "./ThreePanel.vue";

const props = defineProps({
  concepts: {
    type: Array,
    default: () => []
  }
});

const index = ref(0);
const root = ref(null);
let pointerStartX = 0;
let pointerDelta = 0;

const total = computed(() => props.concepts.length);
const current = computed(() => props.concepts[index.value] || {});
const topic = computed(() => current.value.topic || current.value.id || "default");

const goTo = (next) => {
  if (!total.value) return;
  index.value = ((next % total.value) + total.value) % total.value;
};

const next = () => goTo(index.value + 1);
const prev = () => goTo(index.value - 1);

const onKeydown = (event) => {
  if (event.key === "ArrowRight") {
    event.preventDefault();
    next();
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    prev();
  }
};

const onPointerDown = (event) => {
  if (isControlTarget(event)) return;
  if (event.pointerType === "mouse" && event.button !== 0) return;
  pointerStartX = event.clientX;
  pointerDelta = 0;
};

const onPointerUp = (event) => {
  if (isControlTarget(event)) return;
  pointerDelta = event.clientX - pointerStartX;
  if (Math.abs(pointerDelta) < 48) return;
  if (pointerDelta < 0) next();
  else prev();
};

const isControlTarget = (event) => event.target?.closest?.("button");

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <section
    ref="root"
    class="carousel"
    tabindex="0"
    aria-roledescription="carrossel"
    :aria-label="current.title || 'Conceitos de computação gráfica'"
    @pointerdown="onPointerDown"
    @pointerup="onPointerUp"
  >
    <article class="slide" :aria-live="'polite'">
      <div class="copy">
        <p class="kicker">{{ index + 1 }} / {{ total }}</p>
        <h2 class="title">{{ current.title }}</h2>
        <p class="text">{{ current.text }}</p>
      </div>
      <div class="visual">
        <ThreePanel
          :topic="topic"
          :title="current.title"
          :show-header="false"
          :playing="true"
        />
      </div>
    </article>

    <div class="controls">
      <button type="button" class="nav" aria-label="Conceito anterior" @click="prev">
        ‹
      </button>
      <div class="dots" role="tablist" aria-label="Conceitos">
        <button
          v-for="(concept, i) in concepts"
          :key="concept.id || i"
          type="button"
          class="dot"
          :class="{ active: i === index }"
          role="tab"
          :aria-selected="i === index"
          :aria-label="concept.title"
          @click="goTo(i)"
        />
      </div>
      <button type="button" class="nav" aria-label="Próximo conceito" @click="next">
        ›
      </button>
    </div>
  </section>
</template>

<style scoped>
.carousel {
  outline: none;
  display: grid;
  gap: 16px;
  margin: 28px 0 40px;
}

.slide {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 1.05fr);
  gap: 28px;
  align-items: stretch;
  padding: 26px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.12);
  min-height: 360px;
  touch-action: pan-y;
}

.copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  min-width: 0;
}

.kicker {
  margin: 0;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.75rem;
  color: #7dd3fc;
}

.title {
  margin: 0;
  font-size: 1.7rem;
  line-height: 1.2;
}

.text {
  margin: 0;
  line-height: 1.75;
  color: var(--vp-c-text-2);
}

.visual {
  min-height: 300px;
}

.visual :deep(.three-panel),
.visual :deep(.canvas-frame) {
  height: 100%;
  min-height: 300px;
}

.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.nav {
  width: 42px;
  height: 42px;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.22);
  background: rgba(15, 23, 42, 0.45);
  color: inherit;
  font-size: 1.6rem;
  line-height: 1;
  cursor: pointer;
}

.nav:hover,
.dot:hover {
  border-color: rgba(56, 189, 248, 0.55);
}

.dots {
  display: flex;
  gap: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  padding: 0;
  border-radius: 999px;
  border: 0;
  background: rgba(148, 163, 184, 0.45);
  cursor: pointer;
}

.dot.active {
  width: 22px;
  background: #38bdf8;
}

@media (max-width: 980px) {
  .slide {
    grid-template-columns: 1fr;
    padding: 20px;
    min-height: 0;
  }

  .title {
    font-size: 1.4rem;
  }

  .visual,
  .visual :deep(.canvas-frame) {
    min-height: 240px;
  }
}
</style>
