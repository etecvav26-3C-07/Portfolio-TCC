---
title: OpenGL
sidebar_label: OpenGL
description: Recursos, bibliotecas e materiais para aprender OpenGL, com um exemplo ao vivo em WebGL.
---

<script setup>
import ThreePanel from "./.vitepress/components/ThreePanel.vue";
import WebGLPanel from "./.vitepress/components/WebGLPanel.vue";
</script>

# OpenGL

OpenGL é uma API de rasterização de baixo nível: você envia vértices, programa shaders GLSL e a GPU preenche triângulos na tela. No navegador, o equivalente direto é o **WebGL** (OpenGL ES). O cubo abaixo é desenhado com WebGL 2, sem Three.js — o mesmo tipo de pipeline que um programa desktop faria com GLFW + GLSL.

<WebGLPanel
  title="Exemplo WebGL 2"
  subtitle="Cubo colorido com vertex shader, fragment shader, VBO e matriz MVP — o OpenGL da web."
/>

O painel seguinte mostra, em Three.js, o fluxo típico do pipeline: buffer de vértices, shader de vértice, rasterização e shader de fragmento.

<ThreePanel
  topic="opengl"
  title="Pipeline OpenGL"
  subtitle="Um triângulo percorre as etapas do pipeline gráfico."
/>

## Links rápidos

- [Khronos OpenGL](https://registry.khronos.org/OpenGL/)
- [LearnOpenGL](https://learnopengl.com/)
- [OpenGL Wiki](https://www.khronos.org/opengl/wiki/)
- [GLFW](https://www.glfw.org/)
- [GLM](https://github.com/g-truc/glm)
- [WebGL Fundamentals](https://webglfundamentals.org/)

## Recursos

- [LearnOpenGL](https://learnopengl.com/) — melhor guia para começar
- [Open.GL](https://open.gl/) — introdução direta
- [OpenGL Wiki](https://www.khronos.org/opengl/wiki/) — referência oficial
- [Khronos Registry](https://registry.khronos.org/OpenGL/) — especificações
- [NVIDIA OpenGL Docs](https://developer.nvidia.com/) — documentações de GPU

## Bibliotecas

- [GLFW](https://www.glfw.org/) — criação de janela e contexto
- [GLM](https://github.com/g-truc/glm) — vetores, matrizes e transformações
- [Dear ImGui](https://github.com/ocornut/imgui) — UI para debug
- [Assimp](https://github.com/assimp/assimp) — importação de modelos 3D
- [stb_image](https://github.com/nothings/stb) — carregamento de imagens
- [TinyOBJLoader](https://github.com/tinyobjloader/tinyobjloader) — loader de OBJ

## Repositórios

- [LearnOpenGL repo](https://github.com/JoeyDeVries/LearnOpenGL) — exemplos do tutorial
- [OpenGL samples](https://github.com/KhronosGroup/OpenGL-Guide) — exemplos oficiais
- [glfw](https://github.com/glfw/glfw) — biblioteca principal
- [glm](https://github.com/g-truc/glm) — matemática 3D
- [tinyobjloader](https://github.com/tinyobjloader/tinyobjloader) — OBJ loader

## Best picks

- [LearnOpenGL](https://learnopengl.com/) — melhor ponto de partida
- [OpenGL Wiki](https://www.khronos.org/opengl/wiki/) — referência técnica
- [GLFW](https://www.glfw.org/) — base para projetos desktop
- [GLM](https://github.com/g-truc/glm) — matemática essencial
