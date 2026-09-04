---
title: Shaders e Linguagens de Sombreamento
sidebar_label: Shaders
description: O que são Shaders, linguagens (GLSL, HLSL, WGSL, MSL), pipelines programáveis e demonstrações interativas.
---

<script setup>
import ThreePanel from "./.vitepress/components/ThreePanel.vue";
</script>

# Shaders e Programação Gráfica

> Um **Shader** (sombreamento) é um pequeno programa escrito para ser executado diretamente nos milhares de núcleos paralelos da GPU. Eles controlam como cada vértice é transformado no espaço e qual cor cada pixel final recebe na tela.

Antes dos anos 2000, as placas de vídeo possuíam pipelines de função fixa (*fixed-function pipeline*): o desenvolvedor só podia ligar ou desligar parâmetros pré-definidos. Hoje, todo o pipeline gráfico é programável através de shaders.

## Demonstrações Interativas

### 1. Vertex & Fragment Shader em Tempo Real
O painel abaixo demonstra um shader procedimental onde os vértices são deslocados por funções trigonométricas no tempo, enquanto o fragment shader gera um gradiente dinâmico com interpolação de cores.

<ThreePanel
  topic="shaders"
  title="Shader Procedural Dinâmico"
  subtitle="Deformação senoidal de malha (Vertex Shader) e mapeamento cromático contínuo (Fragment Shader)."
/>

### 2. Shaders de Materiais PBR (Physically Based Rendering)
Shaders modernos calculam interações da luz com propriedades físicas reais da matéria (como rugosidade e metalicidade).

<ThreePanel
  topic="pbr"
  title="Matriz de Materiais PBR"
  subtitle="Variação de Roughness (eixo vertical) e Metalness (eixo horizontal) sob luz pontual em movimento."
/>

---

## Tipos de Shaders no Pipeline Moderno

| Tipo de Shader | Estágio | O que processa | Exemplo de Aplicação |
|---|---|---|---|
| **Vertex Shader** | Entrada de Geometria | Vértice individual | Transformação de coordenadas (matriz MVP), animação de esqueletos (skinning), ondas no mar |
| **Tessellation Shader** | Subdivisão | Primitivas poligonais | Adição dinâmica de detalhes geométricos conforme proximidade da câmera (LOD) |
| **Geometry Shader** | Pós-Vértices | Primitivas inteiras (triângulos/linhas) | Geração de partículas, wireframe, silhuetas e prismas volumétricos |
| **Fragment / Pixel Shader** | Rasterização | Pixel / Fragmento individual | Cálculo de iluminação (Phong, PBR), texturização, reflexos, sombras e neblina |
| **Compute Shader** | Processamento Geral (GPGPU) | Dados arbitrários em buffers | Simulação de fluidos, física de partículas, inteligência artificial e culling |
| **Mesh Shader** | Pipeline de Próxima Geração | Meshlets (blocos de triângulos) | Substitui Vertex + Geometry Shaders com controle fino (adotado no DX12 Ultimate e Vulkan) |

---

## As Grandes Linguagens de Shader

- **GLSL (OpenGL Shading Language):** Linguagem base do OpenGL e WebGL. Sintaxe muito próxima de C.
- **HLSL (High-Level Shading Language):** Linguagem proprietária da Microsoft para DirectX (D3D11, D3D12) e Xbox.
- **WGSL (WebGPU Shading Language):** A linguagem padrão da W3C para WebGPU no navegador, segura e fortemente tipada.
- **MSL (Metal Shading Language):** Baseada em C++14, desenvolvida pela Apple para iOS, iPadOS e macOS.
- **SPIR-V:** Representação intermediária binária padronizada pela Khronos. Permite escrever shaders em GLSL ou HLSL e compilá-los para um formato único que o driver da GPU consome diretamente.

---

## Links Rápidos

- [The Book of Shaders](https://thebookofshaders.com/) — o guia visual definitivo para iniciantes
- [Shadertoy](https://www.shadertoy.com/) — comunidade global para escrever e compartilhar fragment shaders no browser
- [Khronos GLSL Reference](https://registry.khronos.org/OpenGL/specs/gl/GLSLangSpec.4.60.pdf) — especificação oficial do GLSL 4.6
- [Microsoft HLSL Guide](https://learn.microsoft.com/windows/win32/direct3dhlsl/dx-graphics-hlsl) — documentação do HLSL no DirectX
- [W3C WGSL Specification](https://www.w3.org/TR/WGSL/) — especificação oficial do WebGPU Shading Language

---

## 🚀 MEGA LINK DUMP - Shaders & GLSL/HLSL/WGSL

### 🎨 Playgrounds Online e Editores
- [Shadertoy](https://www.shadertoy.com/) — / [Explorar Shaders](https://www.shadertoy.com/browse) / [Novo Shader](https://www.shadertoy.com/new) / [Documentação](https://www.shadertoy.com/howto) / [Fórum](https://www.shadertoy.com/)
- [GLSL Sandbox](https://glslsandbox.com/) — editor minimalista de fragment shaders — / [Website](https://glslsandbox.com/) / [GitHub](https://github.com/mrdoob/glsl-sandbox)
- [VertexShaderArt](https://www.vertexshaderart.com/) — criação musical e visual com vertex shaders — / [Website](https://www.vertexshaderart.com/) / [Galeria](https://www.vertexshaderart.com/art)
- [ComputeToy](https://computetoy.org/) — playground para compute shaders WebGPU em tempo real — / [Website](https://computetoy.org/) / [GitHub](https://github.com/compute-toy/compute-toy)
- [Kitsunec Studio WebGPU](https://cohost.org/) — testador de WGSL interativo no navegador — / [WebGPU Samples](https://webgpu.github.io/webgpu-samples/)

### 📖 Livros, Tutoriais e Cursos
- [The Book of Shaders](https://thebookofshaders.com/) — / [Livro Online](https://thebookofshaders.com/) / [GitHub](https://github.com/patriciogonzalezvivo/thebookofshaders) / [Glossário GLSL](https://thebookofshaders.com/glossary/) / [Exemplos](https://github.com/Book-of-Shaders-Examples)
- [Inigo Quilez Articles](https://iquilezles.org/articles/) — matemática, SDF (Signed Distance Fields), ruído e iluminação — / [Artigos Técnicos](https://iquilezles.org/articles/) / [SDF 3D Functions](https://iquilezles.org/articles/distfunctions/) / [YouTube](https://www.youtube.com/c/InigoQuilez)
- [LearnOpenGL: Shaders](https://learnopengl.com/Getting-started/Shaders) — / [Tutorial Básico](https://learnopengl.com/Getting-started/Shaders) / [PBR Shading](https://learnopengl.com/PBR/Theory) / [Compute Shaders](https://learnopengl.com/Guest-Articles/2022/Compute-Shaders/Introduction)
- [Ronja's Shader Tutorials](https://www.ronja-tutorials.com/) — shaders de alta qualidade em HLSL/Unity — / [Website](https://www.ronja-tutorials.com/) / [Patreon](https://www.patreon.com/ronja_tutorials)
- [Catlike Coding: Custom SRP & Shaders](https://catlikecoding.com/) — / [Tutoriais Unity/HLSL](https://catlikecoding.com/unity/tutorials/) / [Rendering Pipeline](https://catlikecoding.com/unity/tutorials/rendering/)
- [Shader-Learn](https://shader-learn.com/) — plataforma interativa guiada para aprendizado de GLSL — / [Website](https://shader-learn.com/)

### 🛠️ Ferramentas, Compiladores e Depuradores
- [glslang](https://github.com/KhronosGroup/glslang) — validador e compilador oficial de GLSL/HLSL para SPIR-V — / [GitHub](https://github.com/KhronosGroup/glslang)
- [SPIRV-Cross](https://github.com/KhronosGroup/SPIRV-Cross) — tradutor de SPIR-V para GLSL, HLSL, MSL e C++ — / [GitHub](https://github.com/KhronosGroup/SPIRV-Cross)
- [Naga (Rust)](https://github.com/gfx-rs/wgpu/tree/master/naga) — tradutor universal de shaders (WGSL, SPV, MSL, HLSL, GLSL) — / [GitHub](https://github.com/gfx-rs/wgpu)
- [Shaderc (Google)](https://github.com/google/shaderc) — pacote com wrappers em torno de glslang e spirv-tools — / [GitHub](https://github.com/google/shaderc)
- [RenderDoc](https://renderdoc.org/) — depurador gráfico profissional de frames e shaders — / [Website](https://renderdoc.org/) / [GitHub](https://github.com/baldurk/renderdoc)
- [Spector.js](https://spector.babylonjs.com/) — extensão de navegador para inspecionar comandos WebGL e shaders — / [GitHub](https://github.com/BabylonJS/Spector.js)

### 👥 Comunidades de Shaders
- [Reddit r/shaders](https://www.reddit.com/r/shaders/) — / [Comunidade](https://www.reddit.com/r/shaders/)
- [Reddit r/shadertoy](https://www.reddit.com/r/shadertoy/) — / [Comunidade](https://www.reddit.com/r/shadertoy/)
- [Discord Graphics Programming](https://discord.gg/graphicsprogramming) — o maior servidor de programação gráfica do Discord
