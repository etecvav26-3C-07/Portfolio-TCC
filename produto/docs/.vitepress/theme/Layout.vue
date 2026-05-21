<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import { watch } from 'vue'
import { useRecentPages } from './composables/useRecentPages'
import RecentPages from './composables/RecentPages.vue'

const { Layout } = DefaultTheme

const route = useRoute()

const { addPage } = useRecentPages()

watch(
  () => route.path,
  (path) => {
    if (typeof window === 'undefined') return

    addPage({
      title: document.title,
      path
    })
  },
  {
    immediate: true
  }
)
</script>

<template>
  <Layout>
    <template #aside-outline-after>
      <RecentPages />
    </template>
  </Layout>
</template>