---
title: Vulkan
sidebar_label: Vulkan
description: Recursos, tutoriais e ferramentas para aprender Vulkan, com visualização do modelo de filas.
---

<script setup>
import ThreePanel from "./.vitepress/components/ThreePanel.vue";
import WebGPUPanel from "./.vitepress/components/WebGPUPanel.vue";
</script>

# Vulkan

Vulkan é uma API explícita: a aplicação monta command buffers, escolhe filas da GPU e sincroniza o acesso à swapchain. Não roda no navegador, mas o **WebGPU** herda a mesma ideia (device, queue, encoder, pipeline). A animação ilustra trabalho em paralelo nas filas; o cubo embaixo é um exemplo real de WebGPU.

<ThreePanel
  topic="vulkan"
  title="Filas e command buffers"
  subtitle="Três filas enviam blocos de trabalho em ritmos diferentes até a GPU."
/>

<WebGPUPanel
  title="WebGPU — o parente web do Vulkan"
  subtitle="Cubo em WGSL com pipeline, bind group e fila de comandos. Chrome e Edge recentes."
/>

## Links rápidos

- [Vulkan Tutorial](https://vulkan-tutorial.com/)
- [VkGuide](https://vkguide.dev/)
- [Khronos Vulkan](https://www.khronos.org/vulkan/)
- [Vulkan Samples](https://github.com/KhronosGroup/Vulkan-Samples)
- [RenderDoc](https://renderdoc.org/)

## Recursos

- [Vulkan Tutorial](https://vulkan-tutorial.com/) — melhor intro prática
- [VkGuide](https://vkguide.dev/) — guia didático
- [Khronos Vulkan](https://www.khronos.org/vulkan/) — documentação oficial
- [Vulkan Guide](https://github.com/KhronosGroup/Vulkan-Guide) — material da Khronos
- [SPIR-V Registry](https://registry.khronos.org/SPIR-V/) — especificação de shaders

## Ferramentas

- [RenderDoc](https://renderdoc.org/) — debug do pipeline
- [GPUView](https://learn.microsoft.com/windows-hardware-drivers/devtest/gpuview) — diagnóstico de GPU
- [SPIRV-Tools](https://github.com/KhronosGroup/SPIRV-Tools) — ferramentas para SPIR-V
- [Vulkan Memory Allocator](https://github.com/GPUOpen-LibrariesAndSDKs/VulkanMemoryAllocator) — alocação de memória

## Repositórios

- [Vulkan Samples](https://github.com/KhronosGroup/Vulkan-Samples) — exemplos oficiais
- [VkGuide repo](https://github.com/vkguide/vkguide) — código e materiais
- [RenderDoc](https://github.com/baldurk/renderdoc) — depuração gráfica
- [MoltenVK](https://github.com/KhronosGroup/MoltenVK) — Vulkan em macOS

## Best picks

- [Vulkan Tutorial](https://vulkan-tutorial.com/) — melhor caminho para começar
- [VkGuide](https://vkguide.dev/) — excelente introdução
- [Vulkan Samples](https://github.com/KhronosGroup/Vulkan-Samples) — referência prática
- [RenderDoc](https://renderdoc.org/) — ferramenta indispensável
