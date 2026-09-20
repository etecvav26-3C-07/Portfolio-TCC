---
title: Shaders e Linguagens de Sombreamento
sidebar_label: Shaders
description: O que são Shaders, linguagens (GLSL, HLSL, WGSL, MSL), pipelines programáveis e demonstrações interativas.
---

<script setup>
import CanvasPanel from "./.vitepress/components/CanvasPanel.vue";
import ThreePanel from "./.vitepress/components/ThreePanel.vue";
import sketchShaders from "./.vitepress/components/animations/canvas_shaders.js";
import sketchPbr from "./.vitepress/components/animations/canvas_pbr.js";
</script>

# Shaders e Programação Gráfica

> Um **Shader** (sombreamento) é um pequeno programa escrito para ser executado diretamente nos milhares de núcleos paralelos da GPU. Eles controlam como cada vértice é transformado no espaço e qual cor cada pixel final recebe na tela.

Antes dos anos 2000, as placas de vídeo possuíam pipelines de função fixa (*fixed-function pipeline*): o desenvolvedor só podia ligar ou desligar parâmetros pré-definidos. Hoje, todo o pipeline gráfico é programável através de shaders.

## Demonstrações Interativas

### 1. Vertex & Fragment Shader em Tempo Real
Abaixo combinamos a visualização tridimensional interativa (com deformação de vértices e cálculo de cor em tempo real na GPU) com o diagrama didático 2D do trânsito de dados através do pipeline gráfico.

<ThreePanel
  topic="shaders"
  title="Visualização 3D de Shaders na GPU"
  subtitle="Deformação senoidal contínua de vértices (Vertex Shader) e coloração dinâmica por fragmento."
/>

<CanvasPanel
  :sketch="sketchShaders"
  title="Diagrama Didático 2D: Fluxo do Pipeline Programável"
  subtitle="Vértices de Entrada → Vertex Shader → Rasterizador → Fragment Shader → Pixels na Tela."
/>

### 2. Shaders de Materiais PBR (Physically Based Rendering)
Shaders modernos calculam interações da luz com propriedades físicas reais da matéria (como rugosidade e metalicidade). Interaja com a matriz de esferas 3D abaixo e compare com o modelo esquemático microfacetário.

<ThreePanel
  topic="pbr"
  title="Matriz 3D de Esferas PBR"
  subtitle="Superfícies dielétricas e metálicas sob luz pontual móvel revelando reflexão difusa vs especular."
/>

<CanvasPanel
  :sketch="sketchPbr"
  title="Diagrama Didático 2D: Parâmetros PBR"
  subtitle="Variação controlada de Roughness (eixo vertical) e Metalness (eixo horizontal)."
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

- [GLSL (OpenGL Shading Language)](https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language) — linguagem base do OpenGL e WebGL, sintaxe próxima de C — / [Spec PDF](https://registry.khronos.org/OpenGL/specs/gl/GLSLangSpec.4.60.pdf) / [Wiki](https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language)
- [HLSL (High-Level Shading Language)](https://learn.microsoft.com/windows/win32/direct3dhlsl/dx-graphics-hlsl) — linguagem proprietária da Microsoft para DirectX (D3D11, D3D12) e Xbox — / [Documentação](https://learn.microsoft.com/windows/win32/direct3dhlsl/dx-graphics-hlsl) / [Referência](https://learn.microsoft.com/windows/win32/direct3dhlsl/dx-graphics-hlsl-reference)
- 🌐 [WGSL (WebGPU Shading Language)](https://www.w3.org/TR/WGSL/) — padrão da W3C para WebGPU no navegador, segura e fortemente tipada — / [Especificação](https://www.w3.org/TR/WGSL/) / [Tour](https://google.github.io/tour-of-wgsl/)
- [MSL (Metal Shading Language)](https://developer.apple.com/metal/Metal-Shading-Language-Specification.pdf) — baseada em C++14, desenvolvida pela Apple para iOS, iPadOS e macOS — / [Spec PDF](https://developer.apple.com/metal/Metal-Shading-Language-Specification.pdf) / [Documentação](https://developer.apple.com/documentation/metal)
- [SPIR-V](https://www.khronos.org/spir/) — representação intermediária binária da Khronos; recebe GLSL ou HLSL e gera um binário único para o driver consumir — / [Especificação](https://registry.khronos.org/SPIR-V/) / [GitHub Tools](https://github.com/KhronosGroup/SPIRV-Tools)

---

## Recursos

### Playgrounds Online e Editores
- [Shadertoy](https://www.shadertoy.com/) — / [Explorar Shaders](https://www.shadertoy.com/browse) / [Novo Shader](https://www.shadertoy.com/new) / [Documentação](https://www.shadertoy.com/howto) / [Fórum](https://www.shadertoy.com/)
- [GLSL Sandbox](https://glslsandbox.com/) — editor minimalista de fragment shaders — / [Site](https://glslsandbox.com/) / [GitHub](https://github.com/mrdoob/glsl-sandbox)
- [VertexShaderArt](https://www.vertexshaderart.com/) — criação musical e visual com vertex shaders — / [Site](https://www.vertexshaderart.com/) / [Galeria](https://www.vertexshaderart.com/art)
- [ComputeToy](https://compute.toys/) — playground para compute shaders WebGPU em tempo real — / [Site](https://compute.toys/) / [GitHub](https://github.com/compute-toy)
- [WebGPU Samples (Google)](https://webgpu.github.io/webgpu-samples/) — testador de WGSL e exemplos interativos no navegador — / [WebGPU Samples](https://webgpu.github.io/webgpu-samples/) / [GitHub](https://github.com/webgpu/webgpu-samples)

### Livros, Tutoriais e Cursos
- [The Book of Shaders](https://thebookofshaders.com/) — / [Livro Online](https://thebookofshaders.com/) / [GitHub](https://github.com/patriciogonzalezvivo/thebookofshaders) / [Glossário GLSL](https://thebookofshaders.com/glossary/) / [Exemplos](https://github.com/patriciogonzalezvivo/thebookofshaders)
- [Inigo Quilez Articles](https://iquilezles.org/articles/) — matemática, SDF (Signed Distance Fields), ruído e iluminação — / [Artigos Técnicos](https://iquilezles.org/articles/) / [SDF 3D Functions](https://iquilezles.org/articles/distfunctions/) / [YouTube](https://www.youtube.com/@InigoQuilez)
- [LearnOpenGL: Shaders](https://learnopengl.com/Getting-started/Shaders) — / [Tutorial Básico](https://learnopengl.com/Getting-started/Shaders) / [PBR Shading](https://learnopengl.com/PBR/Theory) / [Compute Shaders](https://learnopengl.com/Guest-Articles/2022/Compute-Shaders/Introduction)
- [Ronja's Shader Tutorials](https://www.ronja-tutorials.com/) — shaders de alta qualidade em HLSL/Unity — / [Site](https://www.ronja-tutorials.com/)
- [Catlike Coding: Custom SRP & Shaders](https://catlikecoding.com/) — / [Tutoriais Unity/HLSL](https://catlikecoding.com/unity/tutorials/) / [Rendering Pipeline](https://catlikecoding.com/unity/tutorials/rendering/)
- [Shader-Learn](https://shader-learn.com/) — plataforma interativa guiada para aprendizado de GLSL — / [Site](https://shader-learn.com/)

### Ferramentas, Compiladores e Depuradores
- [glslang](https://github.com/KhronosGroup/glslang) — validador e compilador oficial de GLSL/HLSL para SPIR-V — / [GitHub](https://github.com/KhronosGroup/glslang)
- [SPIRV-Cross](https://github.com/KhronosGroup/SPIRV-Cross) — tradutor de SPIR-V para GLSL, HLSL, MSL e C++ — / [GitHub](https://github.com/KhronosGroup/SPIRV-Cross)
- [Naga (Rust)](https://github.com/gfx-rs/wgpu/tree/master/naga) — tradutor universal de shaders (WGSL, SPV, MSL, HLSL, GLSL) — / [GitHub](https://github.com/gfx-rs/wgpu)
- [Shaderc (Google)](https://github.com/google/shaderc) — pacote com wrappers em torno de glslang e spirv-tools — / [GitHub](https://github.com/google/shaderc)
- [RenderDoc](https://renderdoc.org/) — depurador gráfico profissional de frames e shaders — / [Site](https://renderdoc.org/) / [GitHub](https://github.com/baldurk/renderdoc)
- [Spector.js](https://spector.babylonjs.com/) — extensão de navegador para inspecionar comandos WebGL e shaders — / [GitHub](https://github.com/BabylonJS/Spector.js)

### Comunidades de Shaders
- [Reddit r/shaders](https://www.reddit.com/r/shaders/) — / [Comunidade](https://www.reddit.com/r/shaders/)
- [Reddit r/shadertoy](https://www.reddit.com/r/shadertoy/) — / [Comunidade](https://www.reddit.com/r/shadertoy/)
- [Discord Graphics Programming](https://discord.gg/graphicsprogramming) — o maior servidor de programação gráfica do Discord
