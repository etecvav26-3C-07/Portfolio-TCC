---
title: Notícias
---

<script setup>
import { ref, onMounted } from 'vue'

const vulkan = ref([])
const opengl = ref([])
const blender = ref([])

onMounted(async () => {
  vulkan.value = await (
    await fetch('/vulkan-news.json')
  ).json()

  opengl.value = await (
    await fetch('/opengl-news.json')
  ).json()

  blender.value = await (
    await fetch('/blender-news.json')
  ).json()
})
</script>

# Notícias

## Vulkan

<div v-for="item in vulkan.slice(0,3)" :key="item.link">

### {{ item.title }}

**{{ item.date }}**

{{ item.content }}

<a v-bind:href="item.link" target="_blank">
Ler mais
</a>

<hr>

</div>

<details>

<summary>Ver mais notícias Vulkan</summary>

<div v-for="item in vulkan.slice(3)" :key="item.link">

### {{ item.title }}

**{{ item.date }}**

{{ item.content }}

<a v-bind:href="item.link" target="_blank">
Ler mais
</a>

<hr>

</div>

</details>

---

## OpenGL

<div v-for="item in opengl.slice(0,3)" :key="item.link">

### {{ item.title }}

**{{ item.date }}**

{{ item.content }}

<a v-bind:href="item.link" target="_blank">
Ler mais
</a>

<hr>

</div>

<details>

<summary>Ver mais notícias OpenGL</summary>

<div v-for="item in opengl.slice(3)" :key="item.link">

### {{ item.title }}

**{{ item.date }}**

{{ item.content }}

<a v-bind:href="item.link" target="_blank">
Ler mais
</a>

<hr>

</div>

</details>

---

## Blender

<div v-for="item in blender.slice(0,3)" :key="item.link">

### {{ item.title }}

**{{ item.date }}**

{{ item.content }}

<a v-bind:href="item.link" target="_blank">
Ler mais
</a>

<hr>

</div>

<details>

<summary>Ver mais notícias Blender</summary>

<div v-for="item in blender.slice(3)" :key="item.link">

### {{ item.title }}

**{{ item.date }}**

{{ item.content }}

<a v-bind:href="item.link" target="_blank">
Ler mais
</a>

<hr>

</div>

</details>