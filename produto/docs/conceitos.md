---
title: Conceitos de Computação Gráfica
sidebar_label: Conceitos
description: Conceitos fundamentais de computação gráfica e renderização, com visualizações 3D.
---

<script setup>
import ConceptCarousel from "./.vitepress/components/ConceptCarousel.vue";

const concepts = [
  {
    id: "modelagem",
    topic: "modelagem",
    title: "Modelagem",
    text: "A modelagem constrói a forma a partir de vértices, arestas e faces. O que você vê como um objeto 3D começa como uma malha: pontos no espaço ligados em polígonos. A visualização destaca essa estrutura — o sólido e o wireframe ao mesmo tempo."
  },
  {
    id: "transformacoes",
    topic: "transformacoes",
    title: "Transformações",
    text: "Depois de existir, o objeto precisa ser colocado na cena. Translação move, rotação orienta e escala muda o tamanho. Essas três operações, combinadas em matrizes, são o vocabulário básico de qualquer pipeline gráfico."
  },
  {
    id: "camera",
    topic: "camera",
    title: "Câmera",
    text: "A câmera não é o objeto da cena: é o ponto de vista. Posição, direção e campo de visão definem o que entra no quadro e como a perspectiva comprime a profundidade. O cone representa o frustum — o volume que a câmera realmente “enxerga”."
  },
  {
    id: "luz",
    topic: "luz",
    title: "Iluminação",
    text: "Sem luz, a malha é só geometria. Uma fonte pontual percorre a cena para mostrar como o brilho e a sombra mudam com a posição da luz. Materiais reagem a isso: rugosidade, metalicidade e cor determinam o aspecto da superfície."
  },
  {
    id: "rasterizacao",
    topic: "rasterizacao",
    title: "Rasterização",
    text: "A GPU projeta triângulos no plano da tela e preenche os pixels cobertos por cada face. A grade lembra esse passo: o contínuo 3D vira uma imagem discreta. É o caminho rápido usado na maioria dos jogos e interfaces em tempo real."
  },
  {
    id: "raytracing",
    topic: "raytracing",
    title: "Ray Tracing",
    text: "Em vez de projetar triângulos, o Ray Tracing dispara raios ópticos a partir da câmera pelo espaço da cena. Ao colidirem com os objetos, esses raios rebatem e calculam reflexos fotorrealistas, refrações e sombras físicas precisas."
  },
  {
    id: "shaders",
    topic: "shaders",
    title: "Shaders",
    text: "Programas executados diretamente nos núcleos da GPU. O Vertex Shader deforma e calcula a posição de cada vértice no espaço, enquanto o Fragment Shader calcula a cor e brilho de cada pixel individual."
  },
  {
    id: "textura",
    topic: "textura",
    title: "Mapeamento de Textura",
    text: "Imagens 2D são aplicadas sobre superfícies 3D através de coordenadas normalizadas (U, V). A animação demonstra a projeção da malha UV e o deslocamento de amostragem na superfície do modelo."
  },
  {
    id: "pbr",
    topic: "pbr",
    title: "Materiais PBR",
    text: "Physically Based Rendering simula a resposta óptica de materiais reais. Ajustando propriedades como Metalicidade e Rugosidade (Roughness), o material reage à luz variando de fosco a um espelho perfeito."
  },
  {
    id: "render",
    topic: "render",
    title: "Renderização",
    text: "Renderizar é juntar geometria, transformações, câmera, materiais e luz numa imagem final. O sombreamento contínuo desta cena é o resultado visível desse processo — o quadro que chega ao monitor."
  }
];
</script>

# Conceitos de Computação Gráfica

Dez ideias fundamentais que se repetem em modelagem, jogos, filmes e APIs como OpenGL, Vulkan e DirectX. Use as setas, os pontos, o teclado (`←` `→`) ou o gesto de arrastar para folhear. Cada slide traz um texto explicativo e uma animação interativa Three.js.

<ConceptCarousel :concepts="concepts" />

---


### Fundamentos Matemáticos

**Álgebra Linear:**
- [3Blue1Brown Essence of Linear Algebra](https://www.youtube.com/watch?v=fNk_zzaMoSs) — / [YouTube](https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab) / [Site](https://www.3blue1brown.com/topics/linear-algebra/) / [Patreon](https://www.patreon.com/3blue1brown)
- [Freya Holmer Math](https://www.youtube.com/@Acegikmo) — / [YouTube](https://www.youtube.com/@Acegikmo) / [Site](https://freya.dev/)
- [Math for Game Developers](https://www.youtube.com/@gamedev) — / [YouTube](https://www.youtube.com/@gamedev)
- [Essential Mathematics for Games](https://www.amazon.com/) — / [Amazon](https://www.amazon.com/Essential-Mathematics-Games-Interactive-Applications/dp/1482250926) / [Site](https://www.essentialmath.com/) / [Código](https://www.essentialmath.com/)
- [Mathematics for 3D Game Programming](https://www.amazon.com/) — / [Amazon](https://www.amazon.com/Mathematics-3D-Game-Programming-Computer/dp/1435458869) / [GitHub](https://github.com/jpvanoosten) / [Código](https://github.com/jpvanoosten)
- [Khan Academy Linear Algebra](https://www.khanacademy.org/math/linear-algebra) — / [Curso](https://www.khanacademy.org/math/linear-algebra) / [Matrizes](https://www.khanacademy.org/math/linear-algebra/matrix-transformations) / [Vetores](https://www.khanacademy.org/math/linear-algebra/vectors-and-spaces) / [YouTube](https://www.youtube.com/@khanacademy)
- [MIT OpenCourseWare Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/) — / [Curso](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/) / [Aulas](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/video-lectures/) / [Exercícios](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/assignments/) / [Avaliações](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/exams/)

**Geometria:**
- [Geometry for Computer Graphics](https://www.amazon.com/) — / [Amazon](https://www.amazon.com/Geometry-Computer-Graphics-David-Salomon/dp/1846281165) / [Site](https://www.springer.com/) / [Código](https://github.com/)
- [Computational Geometry](https://www.amazon.com/) — / [Amazon](https://www.amazon.com/Computational-Geometry-Algorithms-Applications-3rd/dp/3540777036) / [Site](https://www.springer.com/) / [Código](https://github.com/)
- [Polygon Mesh Processing](https://www.amazon.com/) — / [Amazon](https://www.amazon.com/Polygon-Mesh-Processing-Botsch/dp/3642307357) / [Site](https://www.inf.tu-dresden.de/) / [Código](https://github.com/pmp-library)
- [Geometric Tools for Computer Graphics](https://www.amazon.com/) — / [Amazon](https://www.amazon.com/Geometric-Tools-Computer-Graphics-Philip-Schneider/dp/1558605940) / [Site](https://www.geometrictools.com/) / [Código](https://www.geometrictools.com/)

**Cálculo:**
- [Calculus Made Easy](https://www.amazon.com/) — / [Amazon](https://www.amazon.com/Calculus-Made-Easy-Silvanus-Thompson/dp/0312185480) / [PDF](https://www.gutenberg.org/files/33283/33283-pdf.pdf) / [Grátis](https://www.gutenberg.org/)
- [3Blue1Brown Calculus](https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr) — / [YouTube](https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr) / [Site](https://www.3blue1brown.com/topics/calculus/) / [Patreon](https://www.patreon.com/3blue1brown)
- [Khan Academy Calculus](https://www.khanacademy.org/math/calculus-1) — / [Curso](https://www.khanacademy.org/math/calculus-1) / [Derivatives](https://www.khanacademy.org/math/calculus-1) / [Integrals](https://www.khanacademy.org/math/calculus-1) / [YouTube](https://www.youtube.com/@khanacademy)
- [MIT OpenCourseWare Calculus](https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/) — / [Curso](https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/) / [Aulas](https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/video-lectures/) / [Exercícios](https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/assignments/) / [Avaliações](https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/exams/)

### Pipeline de Renderização

**Rasterização:**
- [Rasterization](https://www.khronos.org/opengl/wiki/Rasterization) — / [Documentação](https://www.khronos.org/opengl/wiki/Rasterization) / [OpenGL](https://www.khronos.org/opengl/) / [Comunidade](https://www.khronos.org/opengl/wiki/) / [GitHub](https://github.com/KhronosGroup/OpenGL-Registry)
- [Rasterization Algorithms](https://www.cs.helsinki.fi/group/goa/) — / [Documentação](https://www.cs.helsinki.fi/group/goa/) / [Algoritmos](https://www.cs.helsinki.fi/group/goa/) / [Pesquisa](https://www.cs.helsinki.fi/group/goa/) / [GitHub](https://github.com/)
- 🌐 [Scanline Algorithm](https://en.wikipedia.org/wiki/Scanline_rendering) — / [Wikipedia](https://en.wikipedia.org/wiki/Scanline_rendering) / [Algoritmo](https://en.wikipedia.org/wiki/Scanline_rendering) / [Código](https://github.com/) / [Comunidade](https://en.wikipedia.org/wiki/Scanline_rendering)
- 🌐 [Bresenham's Line Algorithm](https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm) — / [Wikipedia](https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm) / [Algoritmo](https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm) / [Código](https://github.com/) / [Comunidade](https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm)
- 🌐 [Polygon Filling](https://en.wikipedia.org/wiki/Polygon_filling) — / [Wikipedia](https://en.wikipedia.org/wiki/Polygon_filling) / [Algoritmo](https://en.wikipedia.org/wiki/Polygon_filling) / [Código](https://github.com/) / [Comunidade](https://en.wikipedia.org/wiki/Polygon_filling)

**Ray Tracing:**
- [Ray Tracing in One Weekend](https://raytracing.github.io/) — / [Livro](https://raytracing.github.io/books/RayTracingInOneWeekend.html) / [GitHub](https://github.com/RayTracing/raytracing.github.io) / [Grátis](https://raytracing.github.io/books/RayTracingInOneWeekend.html)
- [PBRT](https://pbr-book.org/) — / [Livro](https://pbr-book.org/) / [GitHub](https://github.com/mmp/pbrt-v4) / [PDF](https://pbr-book.org/3ed-2018/PBR_TOC.pdf) / [Código](https://github.com/mmp/pbrt-v4)
- [SmallPT](https://www.kevinbeason.com/smallpt/) — / [Site](https://www.kevinbeason.com/smallpt/) / [Código](https://www.kevinbeason.com/smallpt.html) / [Artigo](https://www.kevinbeason.com/smallpt.html) / [GitHub](https://github.com/)
- [NVIDIA Ray Tracing Gems](https://www.realtimerendering.com/raytracinggems/) — / [Livro](https://www.realtimerendering.com/raytracinggems/) / [GitHub](https://github.com/Apress/ray-tracing-gems) / [Exemplos](https://www.realtimerendering.com/raytracinggems/) / [Comunidade](https://www.realtimerendering.com/raytracinggems/)
- [Intel Embree](https://www.embree.org/) — / [Site](https://www.embree.org/) / [GitHub](https://github.com/embree/embree) / [Documentação](https://www.embree.org/documentation.html) / [Exemplos](https://www.embree.org/examples.html)

**PBR (Physically Based Rendering):**
- [PBRT](https://pbr-book.org/) — / [Livro](https://pbr-book.org/) / [GitHub](https://github.com/mmp/pbrt-v4) / [PDF](https://pbr-book.org/3ed-2018/PBR_TOC.pdf) / [Código](https://github.com/mmp/pbrt-v4)
- [Disney BRDF Notes](https://disneyanimation.com/) — / [Artigo](https://disneyanimation.com/publications/) / [BRDF](https://disneyanimation.com/publications/2012/08/physically-based-principles/) / [Pesquisa](https://disneyanimation.com/publications/) / [GitHub](https://github.com/)
- [Filament Documentation](https://google.github.io/filament/) — / [Documentação](https://google.github.io/filament/) / [GitHub](https://github.com/google/filament) / [Comunidade](https://github.com/google/filament)
- [LearnOpenGL PBR](https://learnopengl.com/PBR) — / [Tutorial](https://learnopengl.com/PBR) / [Código](https://learnopengl.com/PBR) / [Exemplos](https://learnopengl.com/PBR) / [Comunidade](https://learnopengl.com/)
- [Marmoset PBR Guide](https://marmoset.co/posts/basic-theory-of-physically-based-rendering/) — / [Artigo](https://marmoset.co/posts/basic-theory-of-physically-based-rendering/) / [Tutorial](https://marmoset.co/posts/) / [Exemplos](https://marmoset.co/posts/) / [Comunidade](https://marmoset.co/)

### Shaders e Materiais

**Shading Languages:**
- [GLSL](https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language) — / [Referência](https://www.khronos.org/registry/OpenGL/specs/gl/GLSLangSpec.4.60.pdf) / [OpenGL](https://www.khronos.org/opengl/wiki/) / [Comunidade](https://www.khronos.org/opengl/wiki/) / [GitHub](https://github.com/KhronosGroup/GLSL)
- [HLSL](https://docs.microsoft.com/windows/win32/direct3dhlsl/dx-graphics-hlsl) — / [Documentação](https://docs.microsoft.com/windows/win32/direct3dhlsl/dx-graphics-hlsl) / [Compilador](https://github.com/microsoft/DirectXShaderCompiler) / [Exemplos](https://docs.microsoft.com/windows/win32/direct3dhlsl/dx-graphics-hlsl) / [Comunidade](https://docs.microsoft.com/windows/win32/direct3dhlsl)
- [WGSL](https://www.w3.org/TR/WGSL/) — / [Especificação](https://www.w3.org/TR/WGSL/) / [Guia](https://www.w3.org/TR/WGSL/) / [Exemplos](https://www.w3.org/TR/WGSL/) / [Comunidade](https://www.w3.org/community/gpu/)
- [MSL](https://developer.apple.com/metal/Metal-Shading-Language-Specification.pdf) — / [Documentação](https://developer.apple.com/documentation/metal) / [Especificação](https://developer.apple.com/metal/Metal-Shading-Language-Specification.pdf) / [Exemplos](https://developer.apple.com/metal/sample-code/) / [Comunidade](https://developer.apple.com/forums/)
- [SPIR-V](https://www.khronos.org/registry/SPIR-V/) — / [Especificação](https://www.khronos.org/registry/SPIR-V/specs/1.0/SPIRV.html) / [Ferramentas](https://www.khronos.org/registry/SPIR-V/) / [GitHub](https://github.com/KhronosGroup/SPIRV-Tools) / [Comunidade](https://www.khronos.org/registry/SPIR-V/)

**Recursos de Shaders:**
- [ShaderToy](https://www.shadertoy.com/) — / [Não-oficial](https://shadertoyunofficial.wordpress.com/) / [API](https://www.shadertoy.com/api) / [Galeria](https://www.shadertoy.com/) / [Comunidade](https://www.shadertoy.com/)
- [The Book of Shaders](https://thebookofshaders.com/) — / [Livro](https://thebookofshaders.com/) / [GitHub](https://github.com/patriciogonzalezvivo/thebookofshaders) / [Editor](https://editor.thebookofshaders.com/) / [Comunidade](https://thebookofshaders.com/)
- [Shader-Learn](https://shader-learn.com/) — / [Tutoriais](https://shader-learn.com/tutorials) / [Exemplos](https://shader-learn.com/) / [Comunidade](https://shader-learn.com/) / [GitHub](https://github.com/)
- [GLSL Sandbox](https://glslsandbox.com/) — / [Site](https://glslsandbox.com/) / [GitHub](https://github.com/mrdoob/three.js) / [Exemplos](https://glslsandbox.com/) / [Comunidade](https://glslsandbox.com/)
- [Vertex Shader Art](https://www.vertexshaderart.com/) — / [Galeria](https://www.vertexshaderart.com/gallery) / [Exemplos](https://www.vertexshaderart.com/) / [Comunidade](https://www.vertexshaderart.com/) / [GitHub](https://github.com/)
- [Pixel Shader Art](https://www.shadertoy.com/) — / [Galeria](https://www.shadertoy.com/) / [Exemplos](https://www.shadertoy.com/) / [Comunidade](https://www.shadertoy.com/) / [GitHub](https://github.com/)

### Geometria e Topologia

**Mesh Topology:**
- [Mesh Topology](https://docs.blender.org/manual/en/latest/modeling/meshes/structure.html) — / [Documentação](https://docs.blender.org/manual/en/latest/modeling/meshes/structure.html) / [Blender](https://www.blender.org/) / [Tutorial](https://docs.blender.org/manual/en/latest/modeling/meshes/structure.html) / [Comunidade](https://blender.stackexchange.com/)
- [Quad vs Tri](https://polycount.com/) — / [Fórum](https://polycount.com/discussion/) / [Artigo](https://polycount.com/discussion/) / [Comunidade](https://polycount.com/) / [YouTube](https://www.youtube.com/results?search_query=quad+vs+tri)
- [Edge Loops](https://docs.blender.org/manual/en/latest/modeling/meshes/) — / [Documentação](https://docs.blender.org/manual/en/latest/modeling/meshes/) / [Blender](https://www.blender.org/) / [Tutorial](https://docs.blender.org/manual/en/latest/modeling/meshes/) / [Comunidade](https://blender.stackexchange.com/)
- [Pole Flow](https://polycount.com/) — / [Fórum](https://polycount.com/discussion/) / [Artigo](https://polycount.com/discussion/) / [Comunidade](https://polycount.com/) / [YouTube](https://www.youtube.com/results?search_query=pole+flow)
- [Subdivision Surfaces](https://docs.blender.org/manual/en/latest/modeling/modifiers/generate/subdivision_surface.html) — / [Documentação](https://docs.blender.org/manual/en/latest/modeling/modifiers/generate/subdivision_surface.html) / [Blender](https://www.blender.org/) / [Tutorial](https://docs.blender.org/manual/en/latest/modeling/modifiers/generate/subdivision_surface.html) / [Comunidade](https://blender.stackexchange.com/)

**Modelagem:**
- [Modelagem](https://docs.blender.org/manual/en/latest/modeling/) — / [Documentação](https://docs.blender.org/manual/en/latest/modeling/) / [Blender](https://www.blender.org/) / [Tutorial](https://docs.blender.org/manual/en/latest/modeling/) / [Comunidade](https://blender.stackexchange.com/)
- [Hard Surface](https://polycount.com/) — / [Fórum](https://polycount.com/forumdisplay.php?f=23) / [Artigo](https://polycount.com/) / [Comunidade](https://polycount.com/) / [YouTube](https://www.youtube.com/results?search_query=hard+surface)
- [Organic Modeling](https://polycount.com/) — / [Fórum](https://polycount.com/forumdisplay.php?f=23) / [Artigo](https://polycount.com/) / [Comunidade](https://polycount.com/) / [YouTube](https://www.youtube.com/results?search_query=organic+modeling)
- [Sculpting](https://docs.blender.org/manual/en/latest/sculpt_paint/sculpting/) — / [Documentação](https://docs.blender.org/manual/en/latest/sculpt_paint/sculpting/) / [Blender](https://www.blender.org/) / [Tutorial](https://docs.blender.org/manual/en/latest/sculpt_paint/sculpting/) / [Comunidade](https://blender.stackexchange.com/)
- [Retopology](https://docs.blender.org/manual/en/latest/modeling/meshes/retopology.html) — / [Documentação](https://docs.blender.org/manual/en/latest/modeling/meshes/retopology.html) / [Blender](https://www.blender.org/) / [Tutorial](https://docs.blender.org/manual/en/latest/modeling/meshes/retopology.html) / [Comunidade](https://blender.stackexchange.com/)

### Iluminação e Sombreamento

**Modelos de Iluminação:**
- 🌐 [Phong Shading](https://en.wikipedia.org/wiki/Phong_shading) — / [Wikipedia](https://en.wikipedia.org/wiki/Phong_shading) / [Algoritmo](https://en.wikipedia.org/wiki/Phong_shading) / [Código](https://github.com/) / [Comunidade](https://en.wikipedia.org/wiki/Phong_shading)
- 🌐 [Blinn-Phong](https://en.wikipedia.org/wiki/Blinn%E2%80%93Phong_reflection_model) — / [Wikipedia](https://en.wikipedia.org/wiki/Blinn%E2%80%93Phong_reflection_model) / [Algoritmo](https://en.wikipedia.org/wiki/Blinn%E2%80%93Phong_reflection_model) / [Código](https://github.com/) / [Comunidade](https://en.wikipedia.org/wiki/Blinn%E2%80%93Phong_reflection_model)
- 🌐 [Cook-Torrance](https://en.wikipedia.org/wiki/Cook%E2%80%93Torrance_reflection_model) — / [Wikipedia](https://en.wikipedia.org/wiki/Cook%E2%80%93Torrance_reflection_model) / [Algoritmo](https://en.wikipedia.org/wiki/Cook%E2%80%93Torrance_reflection_model) / [Código](https://github.com/) / [Comunidade](https://en.wikipedia.org/wiki/Cook%E2%80%93Torrance_reflection_model)
- 🌐 [Fresnel Effect](https://en.wikipedia.org/wiki/Schlick%27s_approximation) — / [Wikipedia](https://en.wikipedia.org/wiki/Schlick%27s_approximation) / [Algoritmo](https://en.wikipedia.org/wiki/Schlick%27s_approximation) / [Código](https://github.com/) / [Comunidade](https://en.wikipedia.org/wiki/Schlick%27s_approximation)
- 🌐 [Shadow Mapping](https://en.wikipedia.org/wiki/Shadow_mapping) — / [Wikipedia](https://en.wikipedia.org/wiki/Shadow_mapping) / [Algoritmo](https://en.wikipedia.org/wiki/Shadow_mapping) / [Código](https://github.com/) / [Comunidade](https://en.wikipedia.org/wiki/Shadow_mapping)

**Técnicas de Iluminação:**
- 🌐 [Global Illumination](https://en.wikipedia.org/wiki/Global_illumination) — / [Wikipedia](https://en.wikipedia.org/wiki/Global_illumination) / [Algoritmo](https://en.wikipedia.org/wiki/Global_illumination) / [Código](https://github.com/) / [Comunidade](https://en.wikipedia.org/wiki/Global_illumination)
- 🌐 [Ambient Occlusion](https://en.wikipedia.org/wiki/Ambient_occlusion) — / [Wikipedia](https://en.wikipedia.org/wiki/Ambient_occlusion) / [Algoritmo](https://en.wikipedia.org/wiki/Ambient_occlusion) / [Código](https://github.com/) / [Comunidade](https://en.wikipedia.org/wiki/Ambient_occlusion)
- 🌐 [Screen Space Ambient Occlusion](https://en.wikipedia.org/wiki/Screen_space_ambient_occlusion) — / [Wikipedia](https://en.wikipedia.org/wiki/Screen_space_ambient_occlusion) / [Algoritmo](https://en.wikipedia.org/wiki/Screen_space_ambient_occlusion) / [Código](https://github.com/) / [Comunidade](https://en.wikipedia.org/wiki/Screen_space_ambient_occlusion)
- 🌐 [Bloom](https://en.wikipedia.org/wiki/Bloom_(shader_effect)) — / [Wikipedia](https://en.wikipedia.org/wiki/Bloom_(shader_effect)) / [Algoritmo](https://en.wikipedia.org/wiki/Bloom_(shader_effect)) / [Código](https://github.com/) / [Comunidade](https://en.wikipedia.org/wiki/Bloom_(shader_effect))
- 🌐 [Tone Mapping](https://en.wikipedia.org/wiki/Tone_mapping) — / [Wikipedia](https://en.wikipedia.org/wiki/Tone_mapping) / [Algoritmo](https://en.wikipedia.org/wiki/Tone_mapping) / [Código](https://github.com/) / [Comunidade](https://en.wikipedia.org/wiki/Tone_mapping)

### Animação e Rigging

**Princípios de Animação:**
- 🌐 [12 Principles of Animation](https://en.wikipedia.org/wiki/12_basic_principles_of_animation) — / [Wikipedia](https://en.wikipedia.org/wiki/12_basic_principles_of_animation) / [Artigo](https://en.wikipedia.org/wiki/12_basic_principles_of_animation) / [Comunidade](https://en.wikipedia.org/wiki/12_basic_principles_of_animation) / [YouTube](https://www.youtube.com/results?search_query=12+principles+of+animation)
- 🌐 [Keyframing](https://en.wikipedia.org/wiki/Key_frame) — / [Wikipedia](https://en.wikipedia.org/wiki/Key_frame) / [Artigo](https://en.wikipedia.org/wiki/Key_frame) / [Comunidade](https://en.wikipedia.org/wiki/Key_frame) / [YouTube](https://www.youtube.com/results?search_query=keyframing)
- 🌐 [Interpolation](https://en.wikipedia.org/wiki/Interpolation) — / [Wikipedia](https://en.wikipedia.org/wiki/Interpolation) / [Artigo](https://en.wikipedia.org/wiki/Interpolation) / [Comunidade](https://en.wikipedia.org/wiki/Interpolation) / [YouTube](https://www.youtube.com/results?search_query=interpolation)
- 🌐 [Spline Animation](https://en.wikipedia.org/wiki/Spline_(mathematics)) — / [Wikipedia](https://en.wikipedia.org/wiki/Spline_(mathematics)) / [Artigo](https://en.wikipedia.org/wiki/Spline_(mathematics)) / [Comunidade](https://en.wikipedia.org/wiki/Spline_(mathematics)) / [YouTube](https://www.youtube.com/results?search_query=spline+animation)
- 🌐 [Motion Graphs](https://en.wikipedia.org/wiki/Motion_graph) — / [Wikipedia](https://en.wikipedia.org/wiki/Motion_graph) / [Artigo](https://en.wikipedia.org/wiki/Motion_graph) / [Comunidade](https://en.wikipedia.org/wiki/Motion_graph) / [YouTube](https://www.youtube.com/results?search_query=motion+graphs)

**Rigging:**
- [Blender Rigging](https://docs.blender.org/manual/en/latest/animation/armatures/) — / [Documentação](https://docs.blender.org/manual/en/latest/animation/armatures/) / [Blender](https://www.blender.org/) / [Tutorial](https://docs.blender.org/manual/en/latest/animation/armatures/) / [Comunidade](https://blender.stackexchange.com/)
- [Maya Rigging](https://help.autodesk.com/view/MAYAUL/2023/ENU/?guid=GUID-6A4E2753-A684-44F5-8558-CC3465F5C719) — / [Documentação](https://help.autodesk.com/view/MAYAUL/2023/ENU/?guid=GUID-6A4E2753-A684-44F5-8558-CC3465F5C719) / [Maya](https://www.autodesk.com/products/maya/overview) / [Tutorial](https://help.autodesk.com/view/MAYAUL/2023/ENU/?guid=GUID-6A4E2753-A684-44F5-8558-CC3465F5C719) / [Comunidade](https://forums.autodesk.com/t5/maya/ct-p/90)
- [Advanced Skeleton](https://www.advancedskeleton.com/) — / [Site](https://www.advancedskeleton.com/) / [Rigging](https://www.advancedskeleton.com/) / [Rig Automático](https://www.advancedskeleton.com/) / [YouTube](https://www.youtube.com/results?search_query=advanced+skeleton)
- [Mixamo](https://www.mixamo.com/) — / [Rigging Automático](https://www.mixamo.com/) / [Animações](https://www.mixamo.com/user) / [Documentação](https://www.mixamo.com/) / [Comunidade](https://forums.autodesk.com/t5/maya/ct-p/90)

### Física e Simulação

**Motores de Física:**
- [Bullet](https://pybullet.org/) — / [GitHub](https://github.com/bulletphysics/bullet3) / [Documentação](https://docs.google.com/document/d/1K8g7B1VNBZJW7B0e9sRJgqBfJvB8LQZ/edit) / [Exemplos](https://pybullet.org/) / [Comunidade](https://pybullet.org/)
- [Box2D](https://box2d.org/) — / [GitHub](https://github.com/erincatto/Box2D) / [Documentação](https://box2d.org/documentation/) / [Exemplos](https://box2d.org/) / [Comunidade](https://box2d.org/)
- [PhysX](https://developer.nvidia.com/physx-sdk) — / [GitHub](https://github.com/NVIDIA-Omniverse/PhysX) / [Documentação](https://developer.nvidia.com/physx-sdk) / [Exemplos](https://developer.nvidia.com/physx-sdk) / [Comunidade](https://developer.nvidia.com/physx-sdk)
- [Havok](https://www.havok.com/) — / [Documentação](https://documentation.help/Havok/Havok_Physics.htm) / [SDK](https://www.havok.com/) / [Exemplos](https://www.havok.com/) / [Comunidade](https://www.havok.com/)
- [Jolt](https://github.com/jrouwe/JoltPhysics) — / [GitHub](https://github.com/jrouwe/JoltPhysics) / [Documentação](https://jrouwe.github.io/JoltPhysics/) / [Exemplos](https://jrouwe.github.io/JoltPhysics/) / [Comunidade](https://github.com/jrouwe/JoltPhysics)

**Simulation:**
- 🌐 [Fluid Simulation](https://en.wikipedia.org/wiki/Fluid_simulation) — / [Wikipedia](https://en.wikipedia.org/wiki/Fluid_simulation) / [Artigo](https://en.wikipedia.org/wiki/Fluid_simulation) / [Comunidade](https://en.wikipedia.org/wiki/Fluid_simulation) / [YouTube](https://www.youtube.com/results?search_query=fluid+simulation)
- 🌐 [Cloth Simulation](https://en.wikipedia.org/wiki/Cloth_simulation) — / [Wikipedia](https://en.wikipedia.org/wiki/Cloth_simulation) / [Artigo](https://en.wikipedia.org/wiki/Cloth_simulation) / [Comunidade](https://en.wikipedia.org/wiki/Cloth_simulation) / [YouTube](https://www.youtube.com/results?search_query=cloth+simulation)
- 🌐 [Hair Simulation](https://en.wikipedia.org/wiki/Hair_simulation) — / [Wikipedia](https://en.wikipedia.org/wiki/Hair_simulation) / [Artigo](https://en.wikipedia.org/wiki/Hair_simulation) / [Comunidade](https://en.wikipedia.org/wiki/Hair_simulation) / [YouTube](https://www.youtube.com/results?search_query=hair+simulation)
- 🌐 [Particle Systems](https://en.wikipedia.org/wiki/Particle_system) — / [Wikipedia](https://en.wikipedia.org/wiki/Particle_system) / [Artigo](https://en.wikipedia.org/wiki/Particle_system) / [Comunidade](https://en.wikipedia.org/wiki/Particle_system) / [YouTube](https://www.youtube.com/results?search_query=particle+systems)
- 🌐 [Soft Body Physics](https://en.wikipedia.org/wiki/Soft_body_dynamics) — / [Wikipedia](https://en.wikipedia.org/wiki/Soft_body_dynamics) / [Artigo](https://en.wikipedia.org/wiki/Soft_body_dynamics) / [Comunidade](https://en.wikipedia.org/wiki/Soft_body_dynamics) / [YouTube](https://www.youtube.com/results?search_query=soft+body+physics)

### Projeções e Transformações

**Projections:**
- 🌐 [Perspective Projection](https://en.wikipedia.org/wiki/3D_projection) — / [Wikipedia](https://en.wikipedia.org/wiki/3D_projection) / [Artigo](https://en.wikipedia.org/wiki/3D_projection) / [Comunidade](https://en.wikipedia.org/wiki/3D_projection) / [YouTube](https://www.youtube.com/results?search_query=perspective+projection)
- 🌐 [Orthographic Projection](https://en.wikipedia.org/wiki/Orthographic_projection) — / [Wikipedia](https://en.wikipedia.org/wiki/Orthographic_projection) / [Artigo](https://en.wikipedia.org/wiki/Orthographic_projection) / [Comunidade](https://en.wikipedia.org/wiki/Orthographic_projection) / [YouTube](https://www.youtube.com/results?search_query=orthographic+projection)
- 🌐 [Camera Transform](https://en.wikipedia.org/wiki/Camera_matrix) — / [Wikipedia](https://en.wikipedia.org/wiki/Camera_matrix) / [Artigo](https://en.wikipedia.org/wiki/Camera_matrix) / [Comunidade](https://en.wikipedia.org/wiki/Camera_matrix) / [YouTube](https://www.youtube.com/results?search_query=camera+transform)
- [View Matrix](https://www.khronos.org/opengl/wiki/View_Matrix) — / [Documentação](https://www.khronos.org/opengl/wiki/View_Matrix) / [OpenGL](https://www.khronos.org/opengl/) / [Comunidade](https://www.khronos.org/opengl/wiki/) / [GitHub](https://github.com/KhronosGroup/OpenGL-Registry)
- [Projection Matrix](https://www.khronos.org/opengl/wiki/Projection_Matrix) — / [Documentação](https://www.khronos.org/opengl/wiki/Projection_Matrix) / [OpenGL](https://www.khronos.org/opengl/) / [Comunidade](https://www.khronos.org/opengl/wiki/) / [GitHub](https://github.com/KhronosGroup/OpenGL-Registry)

**Transformations:**
- [Matrix Transformations](https://www.khronos.org/opengl/wiki/Vertex_Transformation) — / [Documentação](https://www.khronos.org/opengl/wiki/Vertex_Transformation) / [OpenGL](https://www.khronos.org/opengl/) / [Comunidade](https://www.khronos.org/opengl/wiki/) / [GitHub](https://github.com/KhronosGroup/OpenGL-Registry)
- 🌐 [Translation](https://en.wikipedia.org/wiki/Translation_(geometry)) — / [Wikipedia](https://en.wikipedia.org/wiki/Translation_(geometry)) / [Artigo](https://en.wikipedia.org/wiki/Translation_(geometry)) / [Comunidade](https://en.wikipedia.org/wiki/Translation_(geometry)) / [YouTube](https://www.youtube.com/results?search_query=translation+matrix)
- 🌐 [Rotation](https://en.wikipedia.org/wiki/Rotation_(mathematics)) — / [Wikipedia](https://en.wikipedia.org/wiki/Rotation_(mathematics)) / [Artigo](https://en.wikipedia.org/wiki/Rotation_(mathematics)) / [Comunidade](https://en.wikipedia.org/wiki/Rotation_(mathematics)) / [YouTube](https://www.youtube.com/results?search_query=rotation+matrix)
- 🌐 [Scaling](https://en.wikipedia.org/wiki/Scaling_(geometry)) — / [Wikipedia](https://en.wikipedia.org/wiki/Scaling_(geometry)) / [Artigo](https://en.wikipedia.org/wiki/Scaling_(geometry)) / [Comunidade](https://en.wikipedia.org/wiki/Scaling_(geometry)) / [YouTube](https://www.youtube.com/results?search_query=scaling+matrix)
- 🌐 [Quaternion](https://en.wikipedia.org/wiki/Quaternion) — / [Wikipedia](https://en.wikipedia.org/wiki/Quaternion) / [Artigo](https://en.wikipedia.org/wiki/Quaternion) / [Comunidade](https://en.wikipedia.org/wiki/Quaternion) / [YouTube](https://www.youtube.com/results?search_query=quaternion)

### Compressão e Otimização

**Texture Compression:**
- [Texture Compression](https://www.khronos.org/opengl/wiki/Texture_Compression) — / [Documentação](https://www.khronos.org/opengl/wiki/Texture_Compression) / [OpenGL](https://www.khronos.org/opengl/) / [Comunidade](https://www.khronos.org/opengl/wiki/) / [GitHub](https://github.com/KhronosGroup/OpenGL-Registry)
- [BCn Compression](https://www.khronos.org/opengl/wiki/BCn_Texture_Compression) — / [Documentação](https://www.khronos.org/opengl/wiki/BCn_Texture_Compression) / [OpenGL](https://www.khronos.org/opengl/) / [Comunidade](https://www.khronos.org/opengl/wiki/) / [GitHub](https://github.com/KhronosGroup/OpenGL-Registry)
- [ETC Compression](https://www.khronos.org/opengl/wiki/ETC_Texture_Compression) — / [Documentação](https://www.khronos.org/opengl/wiki/ETC_Texture_Compression) / [OpenGL](https://www.khronos.org/opengl/) / [Comunidade](https://www.khronos.org/opengl/wiki/) / [GitHub](https://github.com/KhronosGroup/OpenGL-Registry)
- [ASTC Compression](https://www.khronos.org/opengl/wiki/ASTC_Texture_Compression) — / [Documentação](https://www.khronos.org/opengl/wiki/ASTC_Texture_Compression) / [OpenGL](https://www.khronos.org/opengl/) / [Comunidade](https://www.khronos.org/opengl/wiki/) / [GitHub](https://github.com/KhronosGroup/OpenGL-Registry)
- [KTX2 Compression](https://www.khronos.org/ktx/) — / [Documentação](https://www.khronos.org/ktx/) / [Especificação](https://registry.khronos.org/KTX/specs/2.0/ktxspec2.0.html) / [Ferramentas](https://github.com/KhronosGroup/KTX-Software) / [Comunidade](https://www.khronos.org/ktx/)

**Geometry Compression:**
- 🌐 [Mesh Compression](https://en.wikipedia.org/wiki/Mesh_compression) — / [Wikipedia](https://en.wikipedia.org/wiki/Mesh_compression) / [Artigo](https://en.wikipedia.org/wiki/Mesh_compression) / [Comunidade](https://en.wikipedia.org/wiki/Mesh_compression) / [YouTube](https://www.youtube.com/results?search_query=mesh+compression)
- [Draco Compression](https://google.github.io/draco/) — / [GitHub](https://github.com/google/draco) / [Documentação](https://google.github.io/draco/) / [Exemplos](https://google.github.io/draco/) / [Comunidade](https://github.com/google/draco)
- [glTF Compression](https://www.khronos.org/gltf/) — / [Especificação](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html) / [Draco](https://google.github.io/draco/) / [Meshopt](https://github.com/zeux/meshoptimizer) / [Comunidade](https://www.khronos.org/gltf/)
- [Basis Universal](https://github.com/BinomialLLC/basis_universal) — / [GitHub](https://github.com/BinomialLLC/basis_universal) / [Documentação](https://github.com/BinomialLLC/basis_universal) / [Exemplos](https://github.com/BinomialLLC/basis_universal) / [Comunidade](https://github.com/BinomialLLC/basis_universal)

### Renderização de Terrenos

**Terrain Generation:**
- 🌐 [Procedural Terrain](https://en.wikipedia.org/wiki/Procedural_generation) — / [Wikipedia](https://en.wikipedia.org/wiki/Procedural_generation) / [Artigo](https://en.wikipedia.org/wiki/Procedural_generation) / [Comunidade](https://en.wikipedia.org/wiki/Procedural_generation) / [YouTube](https://www.youtube.com/results?search_query=procedural+terrain)
- 🌐 [Perlin Noise](https://en.wikipedia.org/wiki/Perlin_noise) — / [Wikipedia](https://en.wikipedia.org/wiki/Perlin_noise) / [Artigo](https://en.wikipedia.org/wiki/Perlin_noise) / [Comunidade](https://en.wikipedia.org/wiki/Perlin_noise) / [YouTube](https://www.youtube.com/results?search_query=perlin+noise)
- 🌐 [Simplex Noise](https://en.wikipedia.org/wiki/Simplex_noise) — / [Wikipedia](https://en.wikipedia.org/wiki/Simplex_noise) / [Artigo](https://en.wikipedia.org/wiki/Simplex_noise) / [Comunidade](https://en.wikipedia.org/wiki/Simplex_noise) / [YouTube](https://www.youtube.com/results?search_query=simplex+noise)
- 🌐 [Voronoi Diagram](https://en.wikipedia.org/wiki/Voronoi_diagram) — / [Wikipedia](https://en.wikipedia.org/wiki/Voronoi_diagram) / [Artigo](https://en.wikipedia.org/wiki/Voronoi_diagram) / [Comunidade](https://en.wikipedia.org/wiki/Voronoi_diagram) / [YouTube](https://www.youtube.com/results?search_query=voronoi+diagram)
- 🌐 [Heightmap](https://en.wikipedia.org/wiki/Heightmap) — / [Wikipedia](https://en.wikipedia.org/wiki/Heightmap) / [Artigo](https://en.wikipedia.org/wiki/Heightmap) / [Comunidade](https://en.wikipedia.org/wiki/Heightmap) / [YouTube](https://www.youtube.com/results?search_query=heightmap)

**Ferramentas de Terreno:**
- [Gaea](https://quadspinner.com/) — / [Download](https://quadspinner.com/download/) / [Documentação](https://quadspinner.com/documentation/) / [Aprender](https://quadspinner.com/learn/) / [Comunidade](https://quadspinner.com/forum/) / [YouTube](https://www.youtube.com/@QuadSpinner)
- [World Creator](https://www.world-creator.com/) — / [Download](https://www.world-creator.com/download/) / [Documentação](https://world-creator.com/docs) / [Aprender](https://world-creator.com/) / [YouTube](https://www.youtube.com/@WorldCreator3D)
- [World Machine](https://www.world-machine.com/) — / [Download](https://www.world-machine.com/download.php) / [Documentação](https://www.world-machine.com/) / [YouTube](https://www.youtube.com/@WorldMachineSoftware)
- [SpeedTree](https://store.speedtree.com/) — / [Download](https://store.speedtree.com/) / [Documentação](https://docs.speedtree.com/) / [Comunidade](https://forum.speedtree.com/) / [YouTube](https://www.youtube.com/@SpeedTree)

### Performance e Otimização

**Optimization Techniques:**
- 🌐 [Culling](https://en.wikipedia.org/wiki/Hidden_surface_determination) — / [Wikipedia](https://en.wikipedia.org/wiki/Hidden_surface_determination) / [Artigo](https://en.wikipedia.org/wiki/Hidden_surface_determination) / [Comunidade](https://en.wikipedia.org/wiki/Hidden_surface_determination) / [YouTube](https://www.youtube.com/results?search_query=culling)
- 🌐 [Frustum Culling](https://en.wikipedia.org/wiki/Frustum_culling) — / [Wikipedia](https://en.wikipedia.org/wiki/Frustum_culling) / [Artigo](https://en.wikipedia.org/wiki/Frustum_culling) / [Comunidade](https://en.wikipedia.org/wiki/Frustum_culling) / [YouTube](https://www.youtube.com/results?search_query=frustum+culling)
- 🌐 [Occlusion Culling](https://en.wikipedia.org/wiki/Occlusion_culling) — / [Wikipedia](https://en.wikipedia.org/wiki/Occlusion_culling) / [Artigo](https://en.wikipedia.org/wiki/Occlusion_culling) / [Comunidade](https://en.wikipedia.org/wiki/Occlusion_culling) / [YouTube](https://www.youtube.com/results?search_query=occlusion+culling)
- 🌐 [LOD (Level of Detail)](https://en.wikipedia.org/wiki/Level_of_detail) — / [Wikipedia](https://en.wikipedia.org/wiki/Level_of_detail) / [Artigo](https://en.wikipedia.org/wiki/Level_of_detail) / [Comunidade](https://en.wikipedia.org/wiki/Level_of_detail) / [YouTube](https://www.youtube.com/results?search_query=level+of+detail)
- [Instancing](https://www.khronos.org/opengl/wiki/Vertex_Rendering#Instancing) — / [Documentação](https://www.khronos.org/opengl/wiki/Vertex_Rendering#Instancing) / [OpenGL](https://www.khronos.org/opengl/) / [Comunidade](https://www.khronos.org/opengl/wiki/) / [GitHub](https://github.com/KhronosGroup/OpenGL-Registry)

**Performance Profiling:**
- [RenderDoc](https://renderdoc.org/) — / [GitHub](https://github.com/baldurk/renderdoc) / [Documentação](https://renderdoc.org/docs/) / [Download](https://renderdoc.org/) / [Comunidade](https://renderdoc.org/) / [YouTube](https://www.youtube.com/results?search_query=renderdoc)
- [NVIDIA Nsight](https://developer.nvidia.com/nsight-graphics/) — / [Download](https://developer.nvidia.com/nsight-graphics/) / [Documentação](https://developer.nvidia.com/nsight-graphics/) / [Exemplos](https://developer.nvidia.com/nsight-graphics/) / [Comunidade](https://developer.nvidia.com/nsight-graphics/)
- [AMD Radeon GPU Profiler](https://gpuopen.com/rgp/) — / [Download](https://gpuopen.com/rgp/) / [Documentação](https://gpuopen.com/rgp/) / [Exemplos](https://gpuopen.com/rgp/) / [Comunidade](https://gpuopen.com/rgp/)
- [Intel GPA](https://www.intel.com/content/www/us/en/developer/tools/graphics-performance-analyzers/overview.html) — / [Download](https://www.intel.com/content/www/us/en/developer/tools/graphics-performance-analyzers/overview.html) / [Documentação](https://www.intel.com/content/www/us/en/developer/tools/graphics-performance-analyzers/overview.html) / [Exemplos](https://www.intel.com/content/www/us/en/developer/tools/graphics-performance-analyzers/overview.html) / [Comunidade](https://www.intel.com/content/www/us/en/developer/tools/graphics-performance-analyzers/overview.html)
- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/) — / [Performance](https://developers.google.com/web/tools/chrome-devtools/performance) / [WebGL](https://developers.google.com/web/tools/chrome-devtools/javascript/webgl-inspector) / [Memória](https://developers.google.com/web/tools/chrome-devtools/memory-problems) / [Comunidade](https://developers.google.com/web/tools/chrome-devtools/)

---

*Última atualização: 2026-08-31*  
*Este índice curado segue o modelo FMHY para organizar recursos de referência sobre conceitos de computação gráfica.*
