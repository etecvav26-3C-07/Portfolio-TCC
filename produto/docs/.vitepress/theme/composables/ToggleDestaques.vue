<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
const isFiltered = ref(false)
const destaqueCount = ref(0)

function scanDestaques() {
  if (typeof document === 'undefined') return

  const items = document.querySelectorAll('.vp-doc li')
  let count = 0

  items.forEach((el) => {
    const text = el.textContent || ''
    if (text.includes('⭐')) {
      el.classList.add('has-destaque')
      count++
    } else {
      el.classList.remove('has-destaque')
    }
  })

  destaqueCount.value = count
}

function toggleFilter() {
  isFiltered.value = !isFiltered.value
  if (typeof document === 'undefined') return

  if (isFiltered.value) {
    document.body.classList.add('filter-destaques-active')
  } else {
    document.body.classList.remove('filter-destaques-active')
  }
}

watch(
  () => route.path,
  () => {
    setTimeout(() => {
      scanDestaques()
    }, 150)
  }
)

onMounted(() => {
  setTimeout(() => {
    scanDestaques()
  }, 200)
})
</script>

<template>
  <div v-if="destaqueCount > 0" class="destaques-widget">
    <div class="destaques-widget-header">
      <span>Recomendações</span>
      <span class="destaque-badge">⭐ {{ destaqueCount }}</span>
    </div>
    <button
      class="destaques-toggle-btn"
      :class="{ active: isFiltered }"
      @click="toggleFilter"
      :title="isFiltered ? 'Mostrar todos os recursos' : 'Mostrar apenas recomendados pela comunidade'"
    >
      <span class="indicator">⭐</span>
      <span>{{ isFiltered ? 'Ver Todos' : 'Filtrar ⭐ Recomendados' }}</span>
    </button>
  </div>
</template>

<style scoped>
.destaque-badge {
  font-size: 0.72rem;
  padding: 1px 6px;
  border-radius: 9999px;
  background: rgba(245, 158, 11, 0.15);
  color: #d97706;
  font-weight: 600;
}
.indicator {
  font-size: 0.85rem;
}
</style>
