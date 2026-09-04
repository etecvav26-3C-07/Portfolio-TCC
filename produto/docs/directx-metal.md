---
title: DirectX e Metal
sidebar_label: DirectX & Metal
description: As APIs gráficas de baixo nível da Microsoft (DirectX 12 / DXR) e da Apple (Metal 3 / MetalKit) para jogos e aplicações de alta performance.
---

<script setup>
import ThreePanel from "./.vitepress/components/ThreePanel.vue";
</script>

# DirectX e Metal

> Enquanto **OpenGL** e **Vulkan** são padrões abertos multiplataforma geridos pelo Khronos Group, **DirectX** (Microsoft) e **Metal** (Apple) são as APIs nativas proprietárias dominantes nos sistemas operacionais Windows/Xbox e macOS/iOS.

Tanto o DirectX 12 quanto o Metal 3 foram projetados com o mesmo objetivo moderno do Vulkan: **eliminar o gargalo da CPU**, oferecendo controle explícito sobre a memória da GPU, filas de comandos assíncronas e execução paralela multi-thread.

## Demonstração do Pipeline Explícito

Nas APIs modernas como DirectX 12 e Metal, você não apenas envia chamadas de desenho; você grava comandos em *Command Lists* paralelas que são submetidas a *Command Queues* na placa de vídeo.

<ThreePanel
  topic="pipeline"
  title="Fluxo de Pipeline Moderno"
  subtitle="Dados e shaders transitam pelas etapas até a geração final do frame nos buffers de exibição."
/>

<ThreePanel
  topic="sombras"
  title="Cálculo de Sombras e Luz Dinâmica"
  subtitle="Passes de renderização (Shadow Pass -> Color Pass) orquestrados explicitamente na GPU."
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

## 🎮 Microsoft DirectX

O DirectX é a espinha dorsal dos jogos no ecossistema PC e consoles Xbox desde 1995.

### Evolução Histórica:
- **DirectX 9 (2002):** A era de ouro do Shader Model 2.0/3.0. Pipeline parcialmente programável.
- **DirectX 11 (2009):** Altamente estável e amplamente adotado. Introduziu multithreading básico, Tessellation e Compute Shaders. Driver abstraía quase tudo da GPU.
- **DirectX 12 (2015):** Reformulação total para arquiteturas modernas. Drivers finos, gerenciamento manual de barreiras de sincronização e alocação explícita de VRAM.
- **DirectX 12 Ultimate (2020):** Unificação dos quatro pilares modernos: **DXR 1.1**, **Mesh Shaders**, **Variable Rate Shading (VRS)** e **Sampler Feedback**.

---

## 🍏 Apple Metal

Lançado em 2014 para substituir o OpenGL ES no iOS e mais tarde introduzido no OS X, o Metal foi a primeira grande API moderna a ir para produção, antecipando o Vulkan e o DX12.

### Principais Destaques do Metal:
- **Unificação com Apple Silicon:** O Metal tira proveito da arquitetura de **Memória Unificada (UMA)** dos processadores M1/M2/M3/M4, onde CPU e GPU compartilham o mesmo pool de RAM sem cópias caras por barramento PCIe.
- **Metal Performance Shaders (MPS):** Primitivas ultra-otimizadas para machine learning, visão computacional e álgebra linear.
- **Game Porting Toolkit (GPTK):** Camada de tradução da Apple para converter jogos de DirectX 12 para Metal em tempo real, facilitando ports de PC para Mac.

---

## Links Rápidos

- [Microsoft Learn: DirectX Graphics and Gaming](https://learn.microsoft.com/windows/win32/direct3d) — documentação oficial da Microsoft
- [DirectX Graphics Samples GitHub](https://github.com/microsoft/DirectX-Graphics-Samples) — repositório oficial com dezenas de exemplos em D3D12 e DXR
- [Apple Developer: Metal Documentation](https://developer.apple.com/metal/) — documentação oficial do ecossistema Metal
- [DirectX Tool Kit (DirectXTK)](https://github.com/microsoft/DirectXTK12) — classes utilitárias em C++ para agilizar projetos em D3D12
- [MoltenVK](https://github.com/KhronosGroup/MoltenVK) — biblioteca open source que traduz chamadas Vulkan para Metal no macOS e iOS

---

## 🚀 MEGA LINK DUMP - DirectX & Metal

### 🖥️ Microsoft DirectX 11 & 12
- [Microsoft DirectX-Graphics-Samples](https://github.com/microsoft/DirectX-Graphics-Samples) — / [GitHub](https://github.com/microsoft/DirectX-Graphics-Samples) / [Exemplos D3D12](https://github.com/microsoft/DirectX-Graphics-Samples/tree/master/Samples/Desktop/D3D12HelloWorld) / [Exemplos DXR](https://github.com/microsoft/DirectX-Graphics-Samples/tree/master/Samples/Desktop/D3D12Raytracing)
- [DirectX Tool Kit for DX12](https://github.com/microsoft/DirectXTK12) — / [GitHub](https://github.com/microsoft/DirectXTK12) / [Wiki e Tutoriais](https://github.com/microsoft/DirectXTK12/wiki) / [Releases](https://github.com/microsoft/DirectXTK12/releases)
- [DirectX Shader Compiler (DXC)](https://github.com/microsoft/DirectXShaderCompiler) — compilador oficial de HLSL baseado em LLVM — / [GitHub](https://github.com/microsoft/DirectXShaderCompiler) / [Docs](https://github.com/microsoft/DirectXShaderCompiler/wiki)
- [DirectStorage API](https://github.com/microsoft/DirectStorage) — subsistema de IO ultrarrápido para jogos modernos — / [GitHub](https://github.com/microsoft/DirectStorage) / [Documentação](https://learn.microsoft.com/gaming/gdk/_content/gc/system/overviews/directstorage/directstorage-overview)
- [PIX on Windows](https://devblogs.microsoft.com/pix/) — o profiler e depurador de performance oficial da Microsoft para DirectX 12 — / [Blog e Download](https://devblogs.microsoft.com/pix/) / [Documentação](https://devblogs.microsoft.com/pix/documentation/)
- [3D Game Programming with DirectX 12 (Frank Luna)](https://www.d3dcoder.net/) — o livro mais respeitado para aprendizado de D3D12 — / [Website do Autor](https://www.d3dcoder.net/) / [Código Fonte GitHub](https://github.com/d3dcoder/d3d12book)

### 🍏 Apple Metal Framework
- [Apple Metal Portal](https://developer.apple.com/metal/) — / [Visão Geral](https://developer.apple.com/metal/) / [Documentação da API](https://developer.apple.com/documentation/metal) / [Metal Shading Language Spec](https://developer.apple.com/metal/Metal-Shading-Language-Specification.pdf)
- [Metal By Example (Warren Moore)](https://metalbyexample.com/) — o melhor livro e guia introdutório independente para Metal — / [Website](https://metalbyexample.com/) / [Código Fonte GitHub](https://github.com/metal-by-example/sample-code)
- [Apple Sample Code: Metal](https://developer.apple.com/metal/sample-code/) — exemplos oficiais cobrindo Ray Tracing, PBR e compute shaders — / [Catálogo de Exemplos](https://developer.apple.com/metal/sample-code/)
- [Metal Performance Shaders (MPS)](https://developer.apple.com/documentation/metalperformanceshaders) — / [Guia Oficial](https://developer.apple.com/documentation/metalperformanceshaders) / [Grafos MPSGraph](https://developer.apple.com/documentation/metalperformanceshadersgraph)
- [Game Porting Toolkit (Apple)](https://developer.apple.com/games/) — ferramentas para avaliação e conversão de jogos DirectX para Metal — / [Portal](https://developer.apple.com/games/) / [Downloads](https://developer.apple.com/download/all/?q=Game%20Porting%20Toolkit)
- [MoltenVK](https://github.com/KhronosGroup/MoltenVK) — camada de compatibilidade Vulkan rodando em cima de Metal — / [GitHub](https://github.com/KhronosGroup/MoltenVK) / [User Guide](https://github.com/KhronosGroup/MoltenVK/blob/master/Docs/MoltenVK_Runtime_UserGuide.md)

### 🔄 Bibliotecas de Abstração Multiplataforma
- [bgfx](https://github.com/bkaradzic/bgfx) — biblioteca C++ que abstrai DirectX 11, DirectX 12, Metal, Vulkan, OpenGL e WebGL numa única interface — / [GitHub](https://github.com/bkaradzic/bgfx) / [Docs](https://bkaradzic.github.io/bgfx/)
- [Diligent Engine](https://github.com/DiligentGraphics/DiligentEngine) — engine gráfica moderna que unifica DX11, DX12, OpenGL, Vulkan e Metal — / [Website](https://diligentgraphics.com/) / [GitHub](https://github.com/DiligentGraphics/DiligentEngine)
- [Sokol (sokol_gfx)](https://github.com/floooh/sokol) — headers minimalistas em C para gráficos agnósticos de API — / [GitHub](https://github.com/floooh/sokol) / [Exemplos WebAssembly](https://floooh.github.io/sokol-html5/)
