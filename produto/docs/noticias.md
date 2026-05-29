
---
title: Notícias
---

<script setup>
import { ref, onMounted } from 'vue'

const news = ref([])

onMounted(async () => {
  const response = await fetch('/noticias.json')
  news.value = await response.json()
})
</script>

# Notícias Vulkan

<div
  v-for="item in news"
  :key="item.link"
  style="border:1px solid #444;padding:16px;margin:16px 0;border-radius:10px;"
>
  <h2>{{ item.title }}</h2>

  <p>
    <strong>{{ item.date }}</strong>
  </p>

  <p>{{ item.content }}</p>

  <a :href="item.link" target="_blank">
    Ler mais
  </a>
</div>

