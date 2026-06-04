---
title: Bibliotecas de Renderização
sidebar_label: Bibliotecas
description: Bibliotecas e motores gráficos para renderização em tempo real, ray tracing e pesquisa.
---
# 🎨 Awesome Render Libraries

## Legenda

* 🐐 GOAT — Essencial para aprender Computação Gráfica
* ⭐ Excelente
* 💎 Open Source
* 🔥 Muito utilizada na indústria
* 🧪 Pesquisa Acadêmica
* ⚡ Tempo Real

---

# Rasterização em Tempo Real

Bibliotecas focadas em desenhar milhões de triângulos rapidamente utilizando a GPU.

* 🐐 💎 🔥 ⚡ [bgfx](https://github.com/bkaradzic/bgfx) - Abstração multiplataforma sobre Vulkan, DirectX, Metal e OpenGL. Excelente para estudar engines e renderizadores modernos sem ficar preso a uma API específica.

* 🐐 💎 ⭐ ⚡ [OGRE](https://www.ogre3d.org/) - Engine de renderização orientada a cenas. Ótima para aprender iluminação, materiais, câmeras e gerenciamento de objetos 3D.

* 💎 ⭐ ⚡ [Irrlicht](https://irrlicht.sourceforge.io/) - Biblioteca clássica para aprendizado de gráficos 3D. Possui arquitetura simples e fácil de explorar.

* 💎 ⭐ ⚡ [Urho3D](https://urho3d.io/) - Renderização em tempo real com física, cenas e animações integradas.

* 💎 ⭐ ⚡ [Diligent Engine](https://github.com/DiligentGraphics/DiligentEngine) - Camada moderna que unifica diversas APIs gráficas.

* ⭐ ⚡ [Falcor](https://github.com/NVIDIAGameWorks/Falcor) - Framework da NVIDIA usado para pesquisa e prototipação de renderização avançada.

---

# Path Tracing e Ray Tracing

Bibliotecas focadas em simular o comportamento físico da luz.

* 🐐 💎 🔥 🧪 [PBRT](https://www.pbr-book.org/) - Referência máxima para aprender renderização fisicamente baseada. O código acompanha o famoso livro "Physically Based Rendering".

* 🐐 💎 ⭐ 🧪 [Mitsuba](https://mitsuba-renderer.org/) - Renderizador acadêmico extremamente utilizado em pesquisas sobre luz, materiais e sensores.

* 💎 ⭐ 🧪 [LuxCoreRender](https://luxcorerender.org/) - Renderização baseada em física com foco em realismo.

* 💎 ⭐ 🧪 [Tungsten](https://github.com/tunabrain/tungsten) - Renderizador educacional focado em ray tracing moderno.

* 💎 ⭐ 🧪 [MoonRay](https://openmoonray.org/) - Renderizador utilizado pela DreamWorks em produções cinematográficas.

* ⭐ 🧪 [Embree](https://www.intel.com/content/www/us/en/developer/tools/oneapi/embree-render-kernels.html) - Biblioteca da Intel especializada em acelerar interseções de raios.

---

# Pesquisa Acadêmica

Projetos criados para experimentação de algoritmos e publicação científica.

* 🐐 💎 🧪 [Nori](https://wjakob.github.io/nori/) - Renderizador educacional usado em cursos universitários de Computação Gráfica.

* 🐐 💎 🧪 [Mitsuba 3](https://mitsuba-renderer.org/) - Plataforma de pesquisa para óptica computacional, diferenciação automática e simulação de luz.

* 💎 🧪 [Taichi Graphics](https://github.com/taichi-dev/taichi) - Framework para experimentação de algoritmos gráficos e físicos.

* 💎 🧪 [Dr.Jit](https://github.com/mitsuba-renderer/drjit) - Computação vetorizada e diferenciação automática para renderização.

* 💎 🧪 [TinyRenderer](https://github.com/ssloy/tinyrenderer) - Implementação minimalista de um pipeline gráfico completo para estudo.

---

# Renderização Educacional

Projetos focados em ensinar como um renderizador funciona internamente.

* 🐐 💎 ⭐ [Ray Tracing in One Weekend](https://raytracing.github.io/) - Série de livros que ensina a construir um ray tracer do zero.

* 🐐 💎 ⭐ [TinyRenderer](https://github.com/ssloy/tinyrenderer) - Pipeline gráfico implementado em poucas linhas de código.

* 🐐 💎 ⭐ [Scratchapixel](https://www.scratchapixel.com/) - Tutoriais extremamente detalhados sobre matemática e algoritmos gráficos.

* 💎 ⭐ [MiniEngine](https://github.com/microsoft/DirectX-Graphics-Samples/tree/master/MiniEngine) - Engine educacional da Microsoft.

* 💎 ⭐ [TheChernoHazel](https://github.com/TheCherno/Hazel) - Engine criada em série educacional ensinando arquitetura de motores gráficos.

---

# Computação Gráfica Científica

Bibliotecas usadas para visualização científica e grandes conjuntos de dados.

* 🐐 💎 ⭐ [VTK](https://vtk.org/) - Visualização científica, medicina, engenharia e pesquisa.

* 💎 ⭐ [ParaView](https://www.paraview.org/) - Construído sobre o VTK para análise de grandes simulações.

* 💎 ⭐ [OpenSceneGraph](https://www.openscenegraph.com/) - Visualização de cenas complexas em aplicações científicas.

---

# Frameworks para Construir Engines

Ferramentas que servem como base para criar seu próprio motor gráfico.

* 🐐 💎 🔥 [bgfx](https://github.com/bkaradzic/bgfx) - Uma das melhores bases para criar engines multiplataforma.

* 🐐 💎 ⭐ [Magnum](https://magnum.graphics/) - Framework moderno com arquitetura limpa e excelente documentação.

* 💎 ⭐ [Diligent Engine](https://github.com/DiligentGraphics/DiligentEngine) - Abstração de APIs modernas.

* 💎 ⭐ [OGRE](https://www.ogre3d.org/) - Base sólida para sistemas gráficos orientados a cena.

* 💎 ⭐ [Urho3D](https://urho3d.io/) - Estrutura completa para jogos e simulações.

---

# GOATs para Aprender Computação Gráfica

* 🐐 PBRT — O livro e renderizador mais importante da área.
* 🐐 Mitsuba — Pesquisa moderna em iluminação.
* 🐐 bgfx — Excelente para criar renderizadores reais.
* 🐐 OGRE — Aprendizado de cenas e engines.
* 🐐 Ray Tracing in One Weekend — Melhor introdução ao ray tracing.
* 🐐 Scratchapixel — Melhor site para entender os algoritmos.
* 🐐 TinyRenderer — Entender o pipeline gráfico inteiro.
* 🐐 Embree — Aprender aceleração de ray tracing.
* 🐐 Magnum — Framework moderno para engines.
* 🐐 VTK — Visualização científica profissional.

---

