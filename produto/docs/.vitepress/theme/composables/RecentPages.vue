<script setup lang="ts">
import { computed } from 'vue'
import { useRecentPages } from '../composables/useRecentPages'

const { pages, clearPages } = useRecentPages()

const recentPages = computed(() => pages.value)
</script>

<template>
  <div
    v-if="recentPages.length"
    class="recent-pages"
  >
    <div class="header">
      <h3>Recentes</h3>

      <button @click="clearPages">
        Limpar
      </button>
    </div>

    <ul>
      <li
        v-for="page in recentPages"
        :key="page.path"
      >
        <a :href="page.path">
          {{ page.title }}
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.recent-pages {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--vp-c-divider);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h3 {
  font-size: 14px;
  margin: 0 0 12px;
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

li {
  margin-bottom: 8px;
}

a {
  font-size: 13px;
  color: var(--vp-c-text-2);
  text-decoration: none;
}

a:hover {
  color: var(--vp-c-brand-1);
}

button {
  font-size: 12px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--vp-c-text-3);
}
</style>