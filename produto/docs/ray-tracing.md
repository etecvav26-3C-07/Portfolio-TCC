---
title: Ray Tracing e Renderização Baseada em Física
sidebar_label: Ray Tracing
description: Fundamentos de Ray Tracing, Path Tracing, aceleração BVH e aceleração por hardware (RTX / DXR / Vulkan RT).
---

<script setup>
import ThreePanel from "./.vitepress/components/ThreePanel.vue";
</script>

# Ray Tracing

> **Ray Tracing** é um método de computação gráfica que gera imagens simulando o trajeto óptico real da luz: raios virtuais são disparados a partir da câmera (olho do observador), intersectam geometrias no espaço tridimensional e calculam reflexões, refrações, sombras realistas e iluminação global.

Enquanto a **rasterização** tradicional (utilizada em jogos clássicos) projeta primitivas poligonais diretamente no plano 2D da tela, o Ray Tracing rastreia a física dos fótons. Historicamente restrito a filmes de animação e efeitos visuais pré-renderizados, hoje opera em **tempo real** graças a núcleos dedicados nas GPUs modernas (RT Cores).

## Demonstração Interativa

O painel abaixo simula o disparo de raios primários a partir do ponto de vista do observador, o cálculo de intersecção com uma esfera reflectiva e o rebatimento dos raios secundários pelo espaço.

<ThreePanel
  topic="raytracing"
  title="Intersecção e Rebatimento de Raios"
  subtitle="Raios de luz virtuais atingem a geometria e produzem reflexões físicas calculadas pela normal da superfície."
/>

---

## Conceitos Fundamentais

### 1. Ray Casting vs Ray Tracing vs Path Tracing
- **Ray Casting (1968):** Dispara um raio por pixel até atingir a primeira superfície visível. Determina visibilidade e sombreamento direto, sem calcular raios secundários de reflexão.
- **Whitted-Style Ray Tracing (1980):** Adiciona recursão. Quando um raio atinge uma superfície espelhada ou transparente, novos raios reflexivos e refrativos são disparados.
- **Path Tracing (Kajiya, 1986):** Resolve a *Rendering Equation* completa usando métodos de Monte Carlo. Dispara múltiplos raios aleatórios por pixel para calcular iluminação global suave, sangramento de cor (*color bleeding*) e penumbras naturais.

### 2. Aceleração Espacial (BVH - Bounding Volume Hierarchy)
Testar cada raio contra milhões de triângulos tornaria o processo inviável. As GPUs modernas utilizam estruturas de aceleração hierárquicas como **BVH**:
1. A cena é encapsulada em caixas delimitadoras (*AABB - Axis-Aligned Bounding Boxes*).
2. O raio primeiro testa colisão contra as caixas maiores.
3. Apenas se colidir com a caixa, ele subdivide e testa os triângulos internos, reduzindo a complexidade de busca de $O(N)$ para $O(\log N)$.

### 3. Ray Tracing em Tempo Real (Hardware RT)
- **NVIDIA RTX:** RT Cores dedicados para teste rápido de BVH e intersecção raio-triângulo.
- **DirectX Raytracing (DXR):** Extensão oficial do DirectX 12 para pipelines de traçado de raios.
- **Vulkan Ray Tracing (VK_KHR_ray_tracing):** API aberta padrão da Khronos para aceleração de RT em multiplataforma.
- **Denoising (Redução de Ruído):** Como renderizar 1000 raios por pixel em tempo real a 60 FPS é pesado, os jogos disparam poucos raios (1 a 4 por pixel) e usam inteligência artificial (DLSS 3.5 Ray Reconstruction, OptiX Denoiser) para remover o ruído temporal.

---

## Links Rápidos

- [Ray Tracing in One Weekend](https://raytracing.github.io/) — melhor ponto de partida prático
- [Scratchapixel: Ray Tracing](https://www.scratchapixel.com/) — fundamentos matemáticos explicados do zero
- [PBRT Book (Physically Based Rendering)](https://pbr-book.org/) — o livro padrão da indústria de renderização
- [NVIDIA Ray Tracing Gems](https://developer.nvidia.com/ray-tracing-gems) — técnicas avançadas em tempo real
- [Intel Embree](https://www.embree.org/) — biblioteca líder em kernels de ray tracing de alta performance

---

## 🚀 MEGA LINK DUMP - Ray Tracing & Rendering

### 📚 Livros e Tutoriais Gratuitos
- [Ray Tracing in One Weekend](https://raytracing.github.io/) — / [GitHub](https://github.com/RayTracing/raytracing.github.io) / [PDF](https://raytracing.github.io/books/RayTracingInOneWeekend.html) / [Online Book](https://raytracing.github.io/) / [C++ Code](https://github.com/RayTracing/raytracing.github.io/releases)
- [Ray Tracing: The Next Week](https://raytracing.github.io/books/RayTracingTheNextWeek.html) — BVH, texturas, perlin noise e volumes — / [Livro](https://raytracing.github.io/books/RayTracingTheNextWeek.html) / [GitHub](https://github.com/RayTracing/raytracing.github.io)
- [Ray Tracing: The Rest of Your Life](https://raytracing.github.io/books/RayTracingTheRestOfYourLife.html) — Monte Carlo, PDF e importância amostral — / [Livro](https://raytracing.github.io/books/RayTracingTheRestOfYourLife.html)
- [PBRT - Physically Based Rendering (3ª e 4ª ed)](https://pbr-book.org/) — / [Livro Completo Grátis](https://pbr-book.org/) / [Código Fonte GitHub](https://github.com/mmp/pbrt-v4) / [Documentação](https://pbr-book.org/4ed/index)
- [Scratchapixel 3.0](https://www.scratchapixel.com/) — / [Visão Geral](https://www.scratchapixel.com/index.html) / [Aceleração BVH](https://www.scratchapixel.com/lessons/3d-basic-rendering/introduction-acceleration-structures) / [Matemática de Raios](https://www.scratchapixel.com/lessons/3d-basic-rendering/minimal-ray-tracer-rendering-simple-shapes)
- [SmallPT: 99 linhas de C++ Path Tracer](https://www.kevinbeason.com/smallpt/) — / [Website](https://www.kevinbeason.com/smallpt/) / [Código C++](https://www.kevinbeason.com/smallpt/) / [Explicativo](https://docs.google.com/presentation/d/1_A-49K6aT2ghOzke_J6m_F1eT_A9k_vW/present)
- [Computer Graphics from Scratch](https://gabrielgambetta.com/computer-graphics-from-scratch/) — / [Capítulo Raytracer](https://gabrielgambetta.com/computer-graphics-from-scratch/02-basic-raytracing.html) / [Demonstração Web](https://gabrielgambetta.com/computer-graphics-from-scratch/demos/raytracer-01.html)

### ⚙️ Motores de Produção e Pesquisa
- [Mitsuba 3](https://www.mitsuba-renderer.org/) — renderizador pesquisável e diferenciável — / [Website](https://www.mitsuba-renderer.org/) / [GitHub](https://github.com/mitsuba-renderer/mitsuba3) / [Docs](https://mitsuba.readthedocs.io/)
- [LuxCoreRender](https://luxcorerender.org/) — motor open source de iluminação global e path tracing — / [Website](https://luxcorerender.org/) / [GitHub](https://github.com/LuxCoreRender/LuxCore) / [Fórum](https://forums.luxcorerender.org/)
- [Cycles (Blender)](https://www.cycles-renderer.org/) — motor de produção baseado em física do Blender — / [Docs](https://docs.blender.org/manual/en/latest/render/cycles/) / [Código Fonte](https://github.com/blender/blender/tree/main/intern/cycles)
- [MoonRay (DreamWorks)](https://openmoonray.org/) — renderizador de animações de Hollywood open source — / [Website](https://openmoonray.org/) / [GitHub](https://github.com/dreamworksanimation/openmoonray) / [Docs](https://openmoonray.org/documentation)
- [Appleseed](https://appleseedhq.net/) — renderizador baseado em física para animação e VFX — / [Website](https://appleseedhq.net/) / [GitHub](https://github.com/appleseedhq/appleseed)
- [Tungsten](https://github.com/tunabrain/tungsten) — renderizador de alta performance em C++11 — / [GitHub](https://github.com/tunabrain/tungsten)

### ⚡ APIs e Aceleração de Hardware em Tempo Real
- [NVIDIA RTX & DXR Tutorials](https://developer.nvidia.com/rtx/ray-tracing) — / [Guia Oficial](https://developer.nvidia.com/rtx/ray-tracing) / [Tutorial DXR](https://developer.nvidia.com/rtx/raytracing/dxr/DX12-Raytracing-tutorial-Part-1) / [GitHub Samples](https://github.com/NVIDIA-RTX/RayTracingBaseWalkthrough)
- [Vulkan Ray Tracing Tutorial](https://nvpro-samples.github.io/vk_raytracing_tutorial_KHR/) — / [Tutorial Oficial](https://nvpro-samples.github.io/vk_raytracing_tutorial_KHR/) / [GitHub](https://github.com/nvpro-samples/vk_raytracing_tutorial_KHR)
- [Intel Embree](https://www.embree.org/) — kernels otimizados para SSE, AVX, AVX-512 e ARM NEON — / [Website](https://www.embree.org/) / [GitHub](https://github.com/embree/embree) / [Documentação](https://www.embree.org/documentation.html)
- [Intel Open Image Denoise (OIDN)](https://www.openimagedenoise.org/) — biblioteca de IA para desruído de traçado de raios — / [Website](https://www.openimagedenoise.org/) / [GitHub](https://github.com/OpenImageDenoise/oidn)
- [NVIDIA OptiX SDK](https://developer.nvidia.com/optix) — framework para construção de ray tracers em GPU — / [Website](https://developer.nvidia.com/optix) / [Guia de Programação](https://raytracing-docs.nvidia.com/optix8/guide/index.html)

### 🔬 Papers e Recursos Avançados
- [NVIDIA Ray Tracing Gems I & II (PDFs Gratuitos)](https://developer.nvidia.com/ray-tracing-gems) — / [RT Gems 1](https://www.realtimerendering.com/raytracinggems/rtg/index.html) / [RT Gems 2](https://www.realtimerendering.com/raytracinggems/rtg2/index.html) / [Código Fonte GitHub](https://github.com/Apress/ray-tracing-gems)
- [Kajiya 1986 - The Rendering Equation](https://www.cs.cmu.edu/afs/cs/academic/class/15462-s15/www/lec_slides/kajiya86.pdf) — o paper seminal de iluminação global
- [Whitted 1980 - An Improved Illumination Model for Shaded Display](https://dl.acm.org/doi/10.1145/358876.358882) — introdução ao ray tracing recursivo
