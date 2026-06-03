<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  concepts: {
    type: Array,
    default: () => []
  }
});

const active = ref(props.concepts[0] || {});

onMounted(() => {
  const items = document.querySelectorAll("[data-id]");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.dataset.id;
        const found = props.concepts.find(c => c.id === id);
        if (found) active.value = found;
      }
    });
  }, { threshold: 0.5 });

  items.forEach(el => observer.observe(el));
});
</script>

<template>
  <div class="layout">
    <div class="content">
      <div
        v-for="c in concepts"
        :key="c.id"
        class="concept-card"
        :class="{ active: active.id === c.id }"
        :data-id="c.id"
      >
        <h2>{{ c.title }}</h2>
        <p>{{ c.text }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  justify-content: center;
  padding: 32px 16px 56px;
}

.content {
  width: min(100%, 1080px);
  display: grid;
  gap: 24px;
}

.concept-card {
  padding: 26px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.12);
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.concept-card:hover,
.concept-card.active {
  transform: translateY(-3px);
  border-color: rgba(56, 189, 248, 0.28);
  background: rgba(59, 130, 246, 0.08);
}

.concept-card h2 {
  margin: 0 0 12px;
  font-size: 1.35rem;
}

.concept-card p {
  margin: 0;
  line-height: 1.75;
  color: #d8d8d8;
}

@media (max-width: 980px) {
  .layout {
    padding: 24px 12px 40px;
  }

  .content {
    gap: 18px;
  }
}
</style>
