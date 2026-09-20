---
title: DirectX e Metal
sidebar_label: DirectX & Metal
description: As APIs gráficas de baixo nível da Microsoft (DirectX 12 / DXR) e da Apple (Metal 3 / MetalKit) para jogos e aplicações de alta performance.
---

<script setup>
import CanvasPanel from "./.vitepress/components/CanvasPanel.vue";
import ThreePanel from "./.vitepress/components/ThreePanel.vue";
import sketchDxPipeline from "./.vitepress/components/animations/canvas_dx_pipeline.js";
import sketchDxShadow from "./.vitepress/components/animations/canvas_dx_shadow.js";
</script>

# DirectX e Metal

> Enquanto **OpenGL** e **Vulkan** são padrões abertos multiplataforma geridos pelo Khronos Group, **DirectX** (Microsoft) e **Metal** (Apple) são as APIs nativas proprietárias dominantes nos sistemas operacionais Windows/Xbox e macOS/iOS.

Tanto o DirectX 12 quanto o Metal 3 foram projetados com o mesmo objetivo moderno do Vulkan: **eliminar o gargalo da CPU**, oferecendo controle explícito sobre a memória da GPU, filas de comandos assíncronas e execução paralela multi-thread.

## Demonstração do Pipeline Explícito

Nas APIs modernas como DirectX 12 e Metal, você não apenas envia chamadas de desenho; você grava comandos em *Command Lists* paralelas que são submetidas a *Command Queues* na placa de vídeo.

### 1. Gravação e Execução Explícita

<ThreePanel
  topic="pipeline"
  title="Pipeline Explícito 3D"
  subtitle="Nós de processamento de hardware transitando primitivas até a composição do framebuffer."
/>

<CanvasPanel
  :sketch="sketchDxPipeline"
  title="Diagrama Didático 2D: Fluxo de Gravação e Submissão"
  subtitle="Command Lists gravadas em threads da CPU submetidas à Command Queue unificada da GPU."
/>

### 2. Multi-pass de Sombras em Tempo Real

<ThreePanel
  topic="sombras"
  title="Sombras Projetadas 3D em Tempo Real"
  subtitle="Oclusores geométricos projetando silhuetas dinâmicas no solo sob fonte de luz direcional móvel."
/>

<CanvasPanel
  :sketch="sketchDxShadow"
  title="Diagrama Didático 2D: Render Passes (Shadow Pass → Color Pass)"
  subtitle="1º Pass gera o Depth Map da perspectiva da luz; 2º Pass amostra as profundidades para o Color Buffer."
/>

---

## Comparativo: As Grandes APIs de Baixo Nível

| Recurso | DirectX 12 Ultimate (Microsoft) | Metal 3 (Apple) | Vulkan 1.3 (Khronos) |
|---|---|---|---|
| **Plataformas** | Windows 10/11, Xbox Series X/S | macOS, iOS, iPadOS, visionOS | Windows, Linux, Android, Switch, macOS (via MoltenVK) |
| **Linguagem de Shaders** | HLSL (High-Level Shading Language) | MSL (Metal Shading Language, C++14) | GLSL / HLSL compilados para SPIR-V |
| **Ray Tracing Nativo** | DXR (DirectX Raytracing) Tier 1.1 | Metal Ray Tracing (Intersector API) | VK_KHR_ray_tracing |
| **Mesh Shaders** | Suportado nativamente | Suportado (Object & Mesh Shaders) | VK_EXT_mesh_shader |
| **Carregamento Rápido** | DirectStorage (Bypass da CPU para SSD NVMe) | Metal IO (Fast Resource Loading) | Extensões de descompressão por GPU |
| **Upscaling de Imagem** | DirectSR (Super Resolution agnóstica) | MetalFX Upscaling (Temporal & Spatial) | FSR / DLSS / XeSS via extensões |

---

## Microsoft DirectX

O DirectX é a espinha dorsal dos jogos no ecossistema PC e consoles Xbox desde 1995.

### Evolução Histórica
- [DirectX 9 (2002)](https://learn.microsoft.com/windows/win32/direct3d9/dx9-sdk-doc) — era de ouro do Shader Model 2.0/3.0, pipeline parcialmente programável — / [Docs D3D9](https://learn.microsoft.com/windows/win32/direct3d9/dx9-sdk-doc)
- [DirectX 11 (2009)](https://learn.microsoft.com/windows/win32/direct3d11/atoc-dx-graphics-direct3d-11) — amplamente adotado, Tessellation e Compute Shaders — / [Docs D3D11](https://learn.microsoft.com/windows/win32/direct3d11/atoc-dx-graphics-direct3d-11) / [Exemplos](https://github.com/walbourn/directx-sdk-samples)
- [DirectX 12 (2015)](https://learn.microsoft.com/windows/win32/direct3d12/directx-12-programming-guide) — reformulação total, drivers finos, alocação explícita de VRAM — / [Docs D3D12](https://learn.microsoft.com/windows/win32/direct3d12/directx-12-programming-guide) / [Exemplos](https://github.com/microsoft/DirectX-Graphics-Samples)
- [DirectX 12 Ultimate (2020)](https://devblogs.microsoft.com/directx/announcing-directx-12-ultimate/) — DXR 1.1, Mesh Shaders, VRS e Sampler Feedback — / [Blog](https://devblogs.microsoft.com/directx/announcing-directx-12-ultimate/) / [Feature Levels](https://learn.microsoft.com/windows/win32/direct3d12/hardware-feature-levels)

---

## Apple Metal

Lançado em 2014 para substituir o OpenGL ES no iOS e mais tarde introduzido no OS X, o Metal foi a primeira grande API moderna a ir para produção, antecipando o Vulkan e o DX12.

### Principais Destaques do Metal
- [Memória Unificada (UMA)](https://developer.apple.com/documentation/apple-silicon/porting-your-metal-code-to-apple-silicon) — CPU e GPU compartilham o mesmo pool de RAM no Apple Silicon, sem cópias por PCIe — / [Guia Apple Silicon](https://developer.apple.com/documentation/apple-silicon/porting-your-metal-code-to-apple-silicon)
- [Metal Performance Shaders (MPS)](https://developer.apple.com/documentation/metalperformanceshaders) — primitivas ultra-otimizadas para machine learning, visão computacional e álgebra linear — / [Docs MPS](https://developer.apple.com/documentation/metalperformanceshaders) / [MPSGraph](https://developer.apple.com/documentation/metalperformanceshadersgraph)
- [Game Porting Toolkit (GPTK)](https://developer.apple.com/games/) — tradução de jogos DirectX 12 para Metal em tempo real — / [Portal](https://developer.apple.com/games/) / [WWDC Video](https://developer.apple.com/videos/play/wwdc2023/10101/)

---

## Recursos

### Microsoft DirectX 11 & 12
- [Microsoft DirectX-Graphics-Samples](https://github.com/microsoft/DirectX-Graphics-Samples) — / [GitHub](https://github.com/microsoft/DirectX-Graphics-Samples) / [Exemplos D3D12](https://github.com/microsoft/DirectX-Graphics-Samples/tree/master/Samples/Desktop/D3D12HelloWorld) / [Exemplos DXR](https://github.com/microsoft/DirectX-Graphics-Samples/tree/master/Samples/Desktop/D3D12Raytracing)
- [DirectX Tool Kit for DX12](https://github.com/microsoft/DirectXTK12) — / [GitHub](https://github.com/microsoft/DirectXTK12) / [Wiki e Tutoriais](https://github.com/microsoft/DirectXTK12/wiki) / [Releases](https://github.com/microsoft/DirectXTK12/releases)
- [DirectX Shader Compiler (DXC)](https://github.com/microsoft/DirectXShaderCompiler) — compilador oficial de HLSL baseado em LLVM — / [GitHub](https://github.com/microsoft/DirectXShaderCompiler) / [Documentação](https://github.com/microsoft/DirectXShaderCompiler/wiki)
- [DirectStorage API](https://github.com/microsoft/DirectStorage) — subsistema de IO ultrarrápido para jogos modernos — / [GitHub](https://github.com/microsoft/DirectStorage) / [Documentação](https://learn.microsoft.com/gaming/gdk/_content/gc/system/overviews/directstorage/directstorage-overview)
- [PIX on Windows](https://devblogs.microsoft.com/pix/) — o profiler e depurador de performance oficial da Microsoft para DirectX 12 — / [Blog e Download](https://devblogs.microsoft.com/pix/) / [Documentação](https://devblogs.microsoft.com/pix/documentation/)
- [3D Game Programming with DirectX 12 (Frank Luna)](https://www.d3dcoder.net/) — o livro mais respeitado para aprendizado de D3D12 — / [Website do Autor](https://www.d3dcoder.net/) / [Código-fonte no GitHub](https://github.com/d3dcoder/d3d12book)

### Apple Metal Framework
- [Apple Metal Portal](https://developer.apple.com/metal/) — / [Visão Geral](https://developer.apple.com/metal/) / [Documentação da API](https://developer.apple.com/documentation/metal) / [Metal Shading Language Spec](https://developer.apple.com/metal/Metal-Shading-Language-Specification.pdf)
- [Metal By Example (Warren Moore)](https://metalbyexample.com/) — o melhor livro e guia introdutório independente para Metal — / [Site](https://metalbyexample.com/) / [Código-fonte no GitHub](https://github.com/metal-by-example/sample-code)
- [Apple Sample Code: Metal](https://developer.apple.com/metal/sample-code/) — exemplos oficiais cobrindo Ray Tracing, PBR e compute shaders — / [Catálogo de Exemplos](https://developer.apple.com/metal/sample-code/)
- [Metal Performance Shaders (MPS)](https://developer.apple.com/documentation/metalperformanceshaders) — / [Guia Oficial](https://developer.apple.com/documentation/metalperformanceshaders) / [Grafos MPSGraph](https://developer.apple.com/documentation/metalperformanceshadersgraph)
- [Game Porting Toolkit (Apple)](https://developer.apple.com/games/) — ferramentas para avaliação e conversão de jogos DirectX para Metal — / [Portal](https://developer.apple.com/games/) / [Downloads](https://developer.apple.com/download/all/?q=Game%20Porting%20Toolkit)
- [MoltenVK](https://github.com/KhronosGroup/MoltenVK) — camada de compatibilidade Vulkan rodando em cima de Metal — / [GitHub](https://github.com/KhronosGroup/MoltenVK) / [User Guide](https://github.com/KhronosGroup/MoltenVK/blob/master/Docs/MoltenVK_Runtime_UserGuide.md)

### Bibliotecas de Abstração Multiplataforma
- [bgfx](https://github.com/bkaradzic/bgfx) — biblioteca C++ que abstrai DirectX 11, DirectX 12, Metal, Vulkan, OpenGL e WebGL numa única interface — / [GitHub](https://github.com/bkaradzic/bgfx) / [Documentação](https://bkaradzic.github.io/bgfx/)
- [Diligent Engine](https://github.com/DiligentGraphics/DiligentEngine) — engine gráfica moderna que unifica DX11, DX12, OpenGL, Vulkan e Metal — / [Site](https://diligentgraphics.com/) / [GitHub](https://github.com/DiligentGraphics/DiligentEngine)
- [Sokol (sokol_gfx)](https://github.com/floooh/sokol) — headers minimalistas em C para gráficos agnósticos de API — / [GitHub](https://github.com/floooh/sokol) / [Exemplos WebAssembly](https://floooh.github.io/sokol-html5/)
