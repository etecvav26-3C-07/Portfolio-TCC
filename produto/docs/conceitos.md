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

## 🚀 MEGA LINK DUMP - Conceitos de Computação Gráfica

### 📐 Fundamentos Matemáticos

**Álgebra Linear:**
- [3Blue1Brown Essence of Linear Algebra](https://www.youtube.com/watch?v=fNk_zzaMoSs) — / [YouTube](https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab) / [Website](https://www.3blue1brown.com/topics/linear-algebra/) / [Twitter](https://twitter.com/3Blue1Brown) / [Patreon](https://www.patreon.com/3blue1brown)
- [Freya Holmer Math](https://www.youtube.com/@Acegikmo) — / [YouTube](https://www.youtube.com/c/Acegikmo) / [Twitter](https://twitter.com/FreyaHolmer) / [Patreon](https://www.patreon.com/FreyaHolmer) / [Website](https://freya.dev/)
- [Math for Game Developers](https://www.youtube.com/@gamedev) — / [YouTube](https://www.youtube.com/c/gamedev) / [Twitter](https://twitter.com/gamedev) / [Website](https://www.youtube.com/@gamedev)
- [Essential Mathematics for Games](https://www.amazon.com/) — / [Amazon](https://www.amazon.com/Essential-Mathematics-Games-Interactive-Applications/dp/1482250926) / [Website](https://www.essentialmath.com/) / [Code](https://github.com/EssentialMath/EssentialMath)
- [Mathematics for 3D Game Programming](https://www.amazon.com/) — / [Amazon](https://www.amazon.com/Mathematics-3D-Game-Programming-Computer/dp/1435458869) / [GitHub](https://github.com/3dgep3d) / [Code](https://github.com/3dgep3d)
- [Khan Academy Linear Algebra](https://www.khanacademy.org/math/linear-algebra) — / [Course](https://www.khanacademy.org/math/linear-algebra) / [Matrices](https://www.khanacademy.org/math/linear-algebra/matrix-transformations) / [Vectors](https://www.khanacademy.org/math/linear-algebra/vectors-and-spaces) / [YouTube](https://www.youtube.com/c/khanacademy)
- [MIT OpenCourseWare Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/) — / [Course](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/) / [Lectures](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/video-lectures/) / [Assignments](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/assignments/) / [Exams](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/exams/)

**Geometria:**
- [Geometry for Computer Graphics](https://www.amazon.com/) — / [Amazon](https://www.amazon.com/Geometry-Computer-Graphics-David-Salomon/dp/1846281165) / [Website](https://www.springer.com/) / [Code](https://github.com/)
- [Computational Geometry](https://www.amazon.com/) — / [Amazon](https://www.amazon.com/Computational-Geometry-Algorithms-Applications-3rd/dp/3540777036) / [Website](https://www.springer.com/) / [Code](https://github.com/)
- [Polygon Mesh Processing](https://www.amazon.com/) — / [Amazon](https://www.amazon.com/Polygon-Mesh-Processing-Botsch/dp/3642307357) / [Website](https://www.inf.tu-dresden.de/) / [Code](https://github.com/pmp-library)
- [Geometric Tools for Computer Graphics](https://www.amazon.com/) — / [Amazon](https://www.amazon.com/Geometric-Tools-Computer-Graphics-Philip-Schneider/dp/1558605940) / [Website](https://www.geometrictools.com/) / [Code](https://www.geometrictools.com/)

**Cálculo:**
- [Calculus Made Easy](https://www.amazon.com/) — / [Amazon](https://www.amazon.com/Calculus-Made-Easy-Silvanus-Thompson/dp/0312185480) / [PDF](https://www.gutenberg.org/files/33283/33283-pdf.pdf) / [Free](https://www.gutenberg.org/)
- [3Blue1Brown Calculus](https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr) — / [YouTube](https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr) / [Website](https://www.3blue1brown.com/topics/calculus/) / [Twitter](https://twitter.com/3Blue1Brown) / [Patreon](https://www.patreon.com/3blue1brown)
- [Khan Academy Calculus](https://www.khanacademy.org/math/calculus-1) — / [Course](https://www.khanacademy.org/math/calculus-1) / [Derivatives](https://www.khanacademy.org/math/calculus-1) / [Integrals](https://www.khanacademy.org/math/calculus-1) / [YouTube](https://www.youtube.com/c/khanacademy)
- [MIT OpenCourseWare Calculus](https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/) — / [Course](https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/) / [Lectures](https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/video-lectures/) / [Assignments](https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/assignments/) / [Exams](https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/exams/)

### 🎨 Pipeline de Renderização

**Rasterização:**
- [Rasterization](https://www.khronos.org/opengl/wiki/Rasterization) — / [Docs](https://www.khronos.org/opengl/wiki/Rasterization) / [OpenGL](https://www.khronos.org/opengl/) / [Community](https://www.khronos.org/opengl/wiki/) / [GitHub](https://github.com/KhronosGroup/OpenGL-Registry)
- [Rasterization Algorithms](https://www.cs.helsinki.fi/group/goa/) — / [Docs](https://www.cs.helsinki.fi/group/goa/) / [Algorithms](https://www.cs.helsinki.fi/group/goa/) / [Research](https://www.cs.helsinki.fi/group/goa/) / [GitHub](https://github.com/)
- [Scanline Algorithm](https://en.wikipedia.org/wiki/Scanline_rendering) — / [Wikipedia](https://en.wikipedia.org/wiki/Scanline_rendering) / [Algorithm](https://en.wikipedia.org/wiki/Scanline_rendering) / [Code](https://github.com/) / [Community](https://en.wikipedia.org/wiki/Scanline_rendering)
- [Bresenham's Line Algorithm](https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm) — / [Wikipedia](https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm) / [Algorithm](https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm) / [Code](https://github.com/) / [Community](https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm)
- [Polygon Filling](https://en.wikipedia.org/wiki/Polygon_filling) — / [Wikipedia](https://en.wikipedia.org/wiki/Polygon_filling) / [Algorithm](https://en.wikipedia.org/wiki/Polygon_filling) / [Code](https://github.com/) / [Community](https://en.wikipedia.org/wiki/Polygon_filling)

**Ray Tracing:**
- [Ray Tracing in One Weekend](https://raytracing.github.io/) — / [Book](https://raytracing.github.io/books/RayTracingInOneWeekend.html) / [GitHub](https://github.com/RayTracing/raytracing.github.io) / [Free](https://raytracing.github.io/books/RayTracingInOneWeekend.html)
- [PBRT](https://pbr-book.org/) — / [Book](https://pbr-book.org/) / [GitHub](https://github.com/mmp/pbr-book-v3) / [PDF](https://pbr-book.org/3ed-2018/PBR_TOC.pdf) / [Code](https://github.com/mmp/pbr-book-v3)
- [SmallPT](https://www.kevinbeason.com/smallpt/) — / [Website](https://www.kevinbeason.com/smallpt/) / [Code](https://www.kevinbeason.com/smallpt.html) / [Article](https://www.kevinbeason.com/smallpt.html) / [GitHub](https://github.com/)
- [NVIDIA Ray Tracing Gems](https://developer.nvidia.com/ray-tracing-gems) — / [Book](https://developer.nvidia.com/ray-tracing-gems) / [GitHub](https://github.com/NVIDIA-RAYTRACING-GEMS/RayTracingGems) / [Examples](https://developer.nvidia.com/ray-tracing-gems) / [Community](https://developer.nvidia.com/ray-tracing-gems)
- [Intel Embree](https://www.embree.org/) — / [Website](https://www.embree.org/) / [GitHub](https://github.com/embree/embree) / [Docs](https://www.embree.org/documentation.html) / [Examples](https://www.embree.org/examples.html)

**PBR (Physically Based Rendering):**
- [PBRT](https://pbr-book.org/) — / [Book](https://pbr-book.org/) / [GitHub](https://github.com/mmp/pbr-book-v3) / [PDF](https://pbr-book.org/3ed-2018/PBR_TOC.pdf) / [Code](https://github.com/mmp/pbr-book-v3)
- [Disney BRDF Notes](https://disneyanimation.com/) — / [Article](https://disneyanimation.com/publications/) / [BRDF](https://disneyanimation.com/publications/2012/08/physically-based-principles/) / [Research](https://disneyanimation.com/publications/) / [GitHub](https://github.com/)
- [Filament Documentation](https://google.github.io/filament/) — / [Docs](https://google.github.io/filament/) / [GitHub](https://github.com/google/filament) / [Examples](https://google.github.io/filament/examples.html) / [Community](https://github.com/google/filament)
- [LearnOpenGL PBR](https://learnopengl.com/PBR) — / [Tutorial](https://learnopengl.com/PBR) / [Code](https://learnopengl.com/PBR) / [Examples](https://learnopengl.com/PBR) / [Community](https://learnopengl.com/)
- [Marmoset PBR Guide](https://marmoset.co/posts/basic-theory-of-physically-based-rendering/) — / [Article](https://marmoset.co/posts/basic-theory-of-physically-based-rendering/) / [Tutorial](https://marmoset.co/posts/) / [Examples](https://marmoset.co/posts/) / [Community](https://marmoset.co/)

### 🌊 Shaders e Materiais

**Shading Languages:**
- [GLSL](https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language) — / [Reference](https://www.khronos.org/registry/OpenGL/specs/gl/GLSLangSpec.4.60.pdf) / [OpenGL](https://www.khronos.org/opengl/wiki/) / [Community](https://www.khronos.org/opengl/wiki/) / [GitHub](https://github.com/KhronosGroup/GLSL)
- [HLSL](https://docs.microsoft.com/windows/win32/direct3dhlsl/dx-graphics-hlsl) — / [Docs](https://docs.microsoft.com/windows/win32/direct3dhlsl/dx-graphics-hlsl) / [Compiler](https://github.com/microsoft/DirectXShaderCompiler) / [Examples](https://docs.microsoft.com/windows/win32/direct3dhlsl/dx-graphics-hlsl) / [Community](https://docs.microsoft.com/windows/win32/direct3dhlsl)
- [WGSL](https://www.w3.org/TR/WGSL/) — / [Spec](https://www.w3.org/TR/WGSL/) / [Guide](https://gpuweb.github.io/wgsl/) / [Examples](https://www.w3.org/TR/WGSL/) / [Community](https://www.w3.org/community/groups/wgpu/)
- [MSL](https://developer.apple.com/metal/Metal-Shading-Language-Specification.pdf) — / [Docs](https://developer.apple.com/documentation/metal) / [Spec](https://developer.apple.com/metal/Metal-Shading-Language-Specification.pdf) / [Examples](https://developer.apple.com/metal/sample-code/) / [Community](https://developer.apple.com/forums/)
- [SPIR-V](https://www.khronos.org/registry/SPIR-V/) — / [Spec](https://www.khronos.org/registry/SPIR-V/specs/1.0/SPIRV.html) / [Tools](https://www.khronos.org/registry/SPIR-V/) / [GitHub](https://github.com/KhronosGroup/SPIRV-Tools) / [Community](https://www.khronos.org/registry/SPIR-V/)

**Shader Resources:**
- [ShaderToy](https://www.shadertoy.com/) — / [Unofficial](https://www.shadertoyunofficial.com/) / [API](https://www.shadertoy.com/api) / [Gallery](https://www.shadertoy.com/) / [Community](https://www.shadertoy.com/)
- [The Book of Shaders](https://thebookofshaders.com/) — / [Book](https://thebookofshaders.com/) / [GitHub](https://github.com/Book-of-Shaders-Examples) / [Editor](https://editor.thebookofshaders.com/) / [Community](https://thebookofshaders.com/)
- [Shader-Learn](https://shader-learn.com/) — / [Tutorials](https://shader-learn.com/tutorials) / [Examples](https://shader-learn.com/) / [Community](https://shader-learn.com/) / [GitHub](https://github.com/)
- [GLSL Sandbox](https://glslsandbox.com/) — / [Website](https://glslsandbox.com/) / [GitHub](https://github.com/mrdoob/three.js) / [Examples](https://glslsandbox.com/) / [Community](https://glslsandbox.com/)
- [Vertex Shader Art](https://www.vertexshaderart.com/) — / [Gallery](https://www.vertexshaderart.com/gallery) / [Examples](https://www.vertexshaderart.com/) / [Community](https://www.vertexshaderart.com/) / [GitHub](https://github.com/)
- [Pixel Shader Art](https://www.pixelshaderart.com/) — / [Gallery](https://www.pixelshaderart.com/examples) / [Examples](https://www.pixelshaderart.com/examples) / [Community](https://www.pixelshaderart.com/) / [GitHub](https://github.com/)

### 🧮 Geometria e Topologia

**Mesh Topology:**
- [Mesh Topology](https://docs.blender.org/manual/en/latest/modeling/meshes/editing/mesh_topology.html) — / [Docs](https://docs.blender.org/manual/en/latest/modeling/meshes/editing/mesh_topology.html) / [Blender](https://www.blender.org/) / [Tutorial](https://docs.blender.org/manual/en/latest/modeling/meshes/editing/mesh_topology.html) / [Community](https://blender.stackexchange.com/)
- [Quad vs Tri](https://polycount.com/) — / [Forum](https://polycount.com/discussion/) / [Article](https://polycount.com/discussion/) / [Community](https://polycount.com/) / [YouTube](https://www.youtube.com/results?search_query=quad+vs+tri)
- [Edge Loops](https://docs.blender.org/manual/en/latest/modeling/meshes/editing/edge.html) — / [Docs](https://docs.blender.org/manual/en/latest/modeling/meshes/editing/edge.html) / [Blender](https://www.blender.org/) / [Tutorial](https://docs.blender.org/manual/en/latest/modeling/meshes/editing/edge.html) / [Community](https://blender.stackexchange.com/)
- [Pole Flow](https://polycount.com/) — / [Forum](https://polycount.com/discussion/) / [Article](https://polycount.com/discussion/) / [Community](https://polycount.com/) / [YouTube](https://www.youtube.com/results?search_query=pole+flow)
- [Subdivision Surfaces](https://docs.blender.org/manual/en/latest/modeling/modifiers/generators/subdivision_surface.html) — / [Docs](https://docs.blender.org/manual/en/latest/modeling/modifiers/generators/subdivision_surface.html) / [Blender](https://www.blender.org/) / [Tutorial](https://docs.blender.org/manual/en/latest/modeling/modifiers/generators/subdivision_surface.html) / [Community](https://blender.stackexchange.com/)

**Modelagem:**
- [Modelagem](https://docs.blender.org/manual/en/latest/modeling/) — / [Docs](https://docs.blender.org/manual/en/latest/modeling/) / [Blender](https://www.blender.org/) / [Tutorial](https://docs.blender.org/manual/en/latest/modeling/) / [Community](https://blender.stackexchange.com/)
- [Hard Surface](https://polycount.com/) — / [Forum](https://polycount.com/forumdisplay.php?f=23) / [Article](https://polycount.com/) / [Community](https://polycount.com/) / [YouTube](https://www.youtube.com/results?search_query=hard+surface)
- [Organic Modeling](https://polycount.com/) — / [Forum](https://polycount.com/forumdisplay.php?f=23) / [Article](https://polycount.com/) / [Community](https://polycount.com/) / [YouTube](https://www.youtube.com/results?search_query=organic+modeling)
- [Sculpting](https://docs.blender.org/manual/en/latest/sculpt_paint/sculpting/) — / [Docs](https://docs.blender.org/manual/en/latest/sculpt_paint/sculpting/) / [Blender](https://www.blender.org/) / [Tutorial](https://docs.blender.org/manual/en/latest/sculpt_paint/sculpting/) / [Community](https://blender.stackexchange.com/)
- [Retopology](https://docs.blender.org/manual/en/latest/modeling/meshes/editing/retopology.html) — / [Docs](https://docs.blender.org/manual/en/latest/modeling/meshes/editing/retopology.html) / [Blender](https://www.blender.org/) / [Tutorial](https://docs.blender.org/manual/en/latest/modeling/meshes/editing/retopology.html) / [Community](https://blender.stackexchange.com/)

### 💡 Iluminação e Sombreamento

**Lighting Models:**
- [Phong Shading](https://en.wikipedia.org/wiki/Phong_shading) — / [Wikipedia](https://en.wikipedia.org/wiki/Phong_shading) / [Algorithm](https://en.wikipedia.org/wiki/Phong_shading) / [Code](https://github.com/) / [Community](https://en.wikipedia.org/wiki/Phong_shading)
- [Blinn-Phong](https://en.wikipedia.org/wiki/Blinn%E2%80%93Phong_reflection_model) — / [Wikipedia](https://en.wikipedia.org/wiki/Blinn%E2%80%93Phong_reflection_model) / [Algorithm](https://en.wikipedia.org/wiki/Blinn%E2%80%93Phong_reflection_model) / [Code](https://github.com/) / [Community](https://en.wikipedia.org/wiki/Blinn%E2%80%93Phong_reflection_model)
- [Cook-Torrance](https://en.wikipedia.org/wiki/Cook%E2%80%93Torrance_reflection_model) — / [Wikipedia](https://en.wikipedia.org/wiki/Cook%E2%80%93Torrance_reflection_model) / [Algorithm](https://en.wikipedia.org/wiki/Cook%E2%80%93Torrance_reflection_model) / [Code](https://github.com/) / [Community](https://en.wikipedia.org/wiki/Cook%E2%80%93Torrance_reflection_model)
- [Fresnel Effect](https://en.wikipedia.org/wiki/Schlick%27s_approximation) — / [Wikipedia](https://en.wikipedia.org/wiki/Schlick%27s_approximation) / [Algorithm](https://en.wikipedia.org/wiki/Schlick%27s_approximation) / [Code](https://github.com/) / [Community](https://en.wikipedia.org/wiki/Schlick%27s_approximation)
- [Shadow Mapping](https://en.wikipedia.org/wiki/Shadow_mapping) — / [Wikipedia](https://en.wikipedia.org/wiki/Shadow_mapping) / [Algorithm](https://en.wikipedia.org/wiki/Shadow_mapping) / [Code](https://github.com/) / [Community](https://en.wikipedia.org/wiki/Shadow_mapping)

**Lighting Techniques:**
- [Global Illumination](https://en.wikipedia.org/wiki/Global_illumination) — / [Wikipedia](https://en.wikipedia.org/wiki/Global_illumination) / [Algorithm](https://en.wikipedia.org/wiki/Global_illumination) / [Code](https://github.com/) / [Community](https://en.wikipedia.org/wiki/Global_illumination)
- [Ambient Occlusion](https://en.wikipedia.org/wiki/Ambient_occlusion) — / [Wikipedia](https://en.wikipedia.org/wiki/Ambient_occlusion) / [Algorithm](https://en.wikipedia.org/wiki/Ambient_occlusion) / [Code](https://github.com/) / [Community](https://en.wikipedia.org/wiki/Ambient_occlusion)
- [Screen Space Ambient Occlusion](https://en.wikipedia.org/wiki/Screen_space_ambient_occlusion) — / [Wikipedia](https://en.wikipedia.org/wiki/Screen_space_ambient_occlusion) / [Algorithm](https://en.wikipedia.org/wiki/Screen_space_ambient_occlusion) / [Code](https://github.com/) / [Community](https://en.wikipedia.org/wiki/Screen_space_ambient_occlusion)
- [Bloom](https://en.wikipedia.org/wiki/Bloom_(shader_effect)) — / [Wikipedia](https://en.wikipedia.org/wiki/Bloom_(shader_effect)) / [Algorithm](https://en.wikipedia.org/wiki/Bloom_(shader_effect)) / [Code](https://github.com/) / [Community](https://en.wikipedia.org/wiki/Bloom_(shader_effect))
- [Tone Mapping](https://en.wikipedia.org/wiki/Tone_mapping) — / [Wikipedia](https://en.wikipedia.org/wiki/Tone_mapping) / [Algorithm](https://en.wikipedia.org/wiki/Tone_mapping) / [Code](https://github.com/) / [Community](https://en.wikipedia.org/wiki/Tone_mapping)

### 🎬 Animação e Rigging

**Animation Principles:**
- [12 Principles of Animation](https://en.wikipedia.org/wiki/12_basic_principles_of_animation) — / [Wikipedia](https://en.wikipedia.org/wiki/12_basic_principles_of_animation) / [Article](https://en.wikipedia.org/wiki/12_basic_principles_of_animation) / [Community](https://en.wikipedia.org/wiki/12_basic_principles_of_animation) / [YouTube](https://www.youtube.com/results?search_query=12+principles+of+animation)
- [Keyframing](https://en.wikipedia.org/wiki/Key_frame) — / [Wikipedia](https://en.wikipedia.org/wiki/Key_frame) / [Article](https://en.wikipedia.org/wiki/Key_frame) / [Community](https://en.wikipedia.org/wiki/Key_frame) / [YouTube](https://www.youtube.com/results?search_query=keyframing)
- [Interpolation](https://en.wikipedia.org/wiki/Interpolation) — / [Wikipedia](https://en.wikipedia.org/wiki/Interpolation) / [Article](https://en.wikipedia.org/wiki/Interpolation) / [Community](https://en.wikipedia.org/wiki/Interpolation) / [YouTube](https://www.youtube.com/results?search_query=interpolation)
- [Spline Animation](https://en.wikipedia.org/wiki/Spline_(mathematics)) — / [Wikipedia](https://en.wikipedia.org/wiki/Spline_(mathematics)) / [Article](https://en.wikipedia.org/wiki/Spline_(mathematics)) / [Community](https://en.wikipedia.org/wiki/Spline_(mathematics)) / [YouTube](https://www.youtube.com/results?search_query=spline+animation)
- [Motion Graphs](https://en.wikipedia.org/wiki/Motion_graph) — / [Wikipedia](https://en.wikipedia.org/wiki/Motion_graph) / [Article](https://en.wikipedia.org/wiki/Motion_graph) / [Community](https://en.wikipedia.org/wiki/Motion_graph) / [YouTube](https://www.youtube.com/results?search_query=motion+graphs)

**Rigging:**
- [Blender Rigging](https://docs.blender.org/manual/en/latest/animation/armatures/) — / [Docs](https://docs.blender.org/manual/en/latest/animation/armatures/) / [Blender](https://www.blender.org/) / [Tutorial](https://docs.blender.org/manual/en/latest/animation/armatures/) / [Community](https://blender.stackexchange.com/)
- [Maya Rigging](https://help.autodesk.com/view/MAYAUL/2023/ENU/?guid=GUID-6A4E2753-A684-44F5-8558-CC3465F5C719) — / [Docs](https://help.autodesk.com/view/MAYAUL/2023/ENU/?guid=GUID-6A4E2753-A684-44F5-8558-CC3465F5C719) / [Maya](https://www.autodesk.com/products/maya) / [Tutorial](https://help.autodesk.com/view/MAYAUL/2023/ENU/?guid=GUID-6A4E2753-A684-44F5-8558-CC3465F5C719) / [Community](https://forums.autodesk.com/t5/maya/ct-p/90)
- [Advanced Skeleton](https://www.advancedskeleton.com/) — / [Website](https://www.advancedskeleton.com/) / [Rigging](https://www.advancedskeleton.com/) / [Auto Rig](https://www.advancedskeleton.com/) / [YouTube](https://www.youtube.com/results?search_query=advanced+skeleton)
- [Mixamo](https://www.mixamo.com/) — / [Auto Rigger](https://www.mixamo.com/) / [Animations](https://www.mixamo.com/user) / [Docs](https://www.mixamo.com/) / [Community](https://forums.autodesk.com/t5/maya/ct-p/90)

### 🌊 Física e Simulação

**Physics Engines:**
- [Bullet](https://pybullet.org/) — / [GitHub](https://github.com/bulletphysics/bullet3) / [Docs](https://docs.google.com/document/d/1K8g7B1VNBZJW7B0e9sRJgqBfJvB8LQZ/edit) / [Examples](https://pybullet.org/) / [Community](https://pybullet.org/)
- [Box2D](https://box2d.org/) — / [GitHub](https://github.com/erincatto/Box2D) / [Docs](https://box2d.org/documentation/) / [Examples](https://box2d.org/) / [Community](https://box2d.org/)
- [PhysX](https://developer.nvidia.com/physx-sdk) — / [GitHub](https://github.com/NVIDIA/PhysX) / [Docs](https://developer.nvidia.com/physx-sdk) / [Examples](https://developer.nvidia.com/physx-sdk) / [Community](https://developer.nvidia.com/physx-sdk)
- [Havok](https://www.havok.com/) — / [Docs](https://documentation.help/Havok/Havok_Physics.htm) / [SDK](https://www.havok.com/) / [Examples](https://www.havok.com/) / [Community](https://www.havok.com/)
- [Jolt](https://github.com/jrouwe/JoltPhysics) — / [GitHub](https://github.com/jrouwe/JoltPhysics) / [Docs](https://jrouwe.github.io/JoltPhysics/) / [Examples](https://jrouwe.github.io/JoltPhysics/) / [Community](https://github.com/jrouwe/JoltPhysics)

**Simulation:**
- [Fluid Simulation](https://en.wikipedia.org/wiki/Fluid_simulation) — / [Wikipedia](https://en.wikipedia.org/wiki/Fluid_simulation) / [Article](https://en.wikipedia.org/wiki/Fluid_simulation) / [Community](https://en.wikipedia.org/wiki/Fluid_simulation) / [YouTube](https://www.youtube.com/results?search_query=fluid+simulation)
- [Cloth Simulation](https://en.wikipedia.org/wiki/Cloth_simulation) — / [Wikipedia](https://en.wikipedia.org/wiki/Cloth_simulation) / [Article](https://en.wikipedia.org/wiki/Cloth_simulation) / [Community](https://en.wikipedia.org/wiki/Cloth_simulation) / [YouTube](https://www.youtube.com/results?search_query=cloth+simulation)
- [Hair Simulation](https://en.wikipedia.org/wiki/Hair_simulation) — / [Wikipedia](https://en.wikipedia.org/wiki/Hair_simulation) / [Article](https://en.wikipedia.org/wiki/Hair_simulation) / [Community](https://en.wikipedia.org/wiki/Hair_simulation) / [YouTube](https://www.youtube.com/results?search_query=hair+simulation)
- [Particle Systems](https://en.wikipedia.org/wiki/Particle_system) — / [Wikipedia](https://en.wikipedia.org/wiki/Particle_system) / [Article](https://en.wikipedia.org/wiki/Particle_system) / [Community](https://en.wikipedia.org/wiki/Particle_system) / [YouTube](https://www.youtube.com/results?search_query=particle+systems)
- [Soft Body Physics](https://en.wikipedia.org/wiki/Soft_body_dynamics) — / [Wikipedia](https://en.wikipedia.org/wiki/Soft_body_dynamics) / [Article](https://en.wikipedia.org/wiki/Soft_body_dynamics) / [Community](https://en.wikipedia.org/wiki/Soft_body_dynamics) / [YouTube](https://www.youtube.com/results?search_query=soft+body+physics)

### 📐 Projeções e Transformações

**Projections:**
- [Perspective Projection](https://en.wikipedia.org/wiki/3D_projection) — / [Wikipedia](https://en.wikipedia.org/wiki/3D_projection) / [Article](https://en.wikipedia.org/wiki/3D_projection) / [Community](https://en.wikipedia.org/wiki/3D_projection) / [YouTube](https://www.youtube.com/results?search_query=perspective+projection)
- [Orthographic Projection](https://en.wikipedia.org/wiki/Orthographic_projection) — / [Wikipedia](https://en.wikipedia.org/wiki/Orthographic_projection) / [Article](https://en.wikipedia.org/wiki/Orthographic_projection) / [Community](https://en.wikipedia.org/wiki/Orthographic_projection) / [YouTube](https://www.youtube.com/results?search_query=orthographic+projection)
- [Camera Transform](https://en.wikipedia.org/wiki/Camera_matrix) — / [Wikipedia](https://en.wikipedia.org/wiki/Camera_matrix) / [Article](https://en.wikipedia.org/wiki/Camera_matrix) / [Community](https://en.wikipedia.org/wiki/Camera_matrix) / [YouTube](https://www.youtube.com/results?search_query=camera+transform)
- [View Matrix](https://www.khronos.org/opengl/wiki/View_Matrix) — / [Docs](https://www.khronos.org/opengl/wiki/View_Matrix) / [OpenGL](https://www.khronos.org/opengl/) / [Community](https://www.khronos.org/opengl/wiki/) / [GitHub](https://github.com/KhronosGroup/OpenGL-Registry)
- [Projection Matrix](https://www.khronos.org/opengl/wiki/Projection_Matrix) — / [Docs](https://www.khronos.org/opengl/wiki/Projection_Matrix) / [OpenGL](https://www.khronos.org/opengl/) / [Community](https://www.khronos.org/opengl/wiki/) / [GitHub](https://github.com/KhronosGroup/OpenGL-Registry)

**Transformations:**
- [Matrix Transformations](https://www.khronos.org/opengl/wiki/Vertex_Transformation) — / [Docs](https://www.khronos.org/opengl/wiki/Vertex_Transformation) / [OpenGL](https://www.khronos.org/opengl/) / [Community](https://www.khronos.org/opengl/wiki/) / [GitHub](https://github.com/KhronosGroup/OpenGL-Registry)
- [Translation](https://en.wikipedia.org/wiki/Translation_(geometry)) — / [Wikipedia](https://en.wikipedia.org/wiki/Translation_(geometry)) / [Article](https://en.wikipedia.org/wiki/Translation_(geometry)) / [Community](https://en.wikipedia.org/wiki/Translation_(geometry)) / [YouTube](https://www.youtube.com/results?search_query=translation+matrix)
- [Rotation](https://en.wikipedia.org/wiki/Rotation_(mathematics)) — / [Wikipedia](https://en.wikipedia.org/wiki/Rotation_(mathematics)) / [Article](https://en.wikipedia.org/wiki/Rotation_(mathematics)) / [Community](https://en.wikipedia.org/wiki/Rotation_(mathematics)) / [YouTube](https://www.youtube.com/results?search_query=rotation+matrix)
- [Scaling](https://en.wikipedia.org/wiki/Scaling_(geometry)) — / [Wikipedia](https://en.wikipedia.org/wiki/Scaling_(geometry)) / [Article](https://en.wikipedia.org/wiki/Scaling_(geometry)) / [Community](https://en.wikipedia.org/wiki/Scaling_(geometry)) / [YouTube](https://www.youtube.com/results?search_query=scaling+matrix)
- [Quaternion](https://en.wikipedia.org/wiki/Quaternion) — / [Wikipedia](https://en.wikipedia.org/wiki/Quaternion) / [Article](https://en.wikipedia.org/wiki/Quaternion) / [Community](https://en.wikipedia.org/wiki/Quaternion) / [YouTube](https://www.youtube.com/results?search_query=quaternion)

### 🎨 Compressão e Otimização

**Texture Compression:**
- [Texture Compression](https://www.khronos.org/opengl/wiki/Texture_Compression) — / [Docs](https://www.khronos.org/opengl/wiki/Texture_Compression) / [OpenGL](https://www.khronos.org/opengl/) / [Community](https://www.khronos.org/opengl/wiki/) / [GitHub](https://github.com/KhronosGroup/OpenGL-Registry)
- [BCn Compression](https://www.khronos.org/opengl/wiki/BCn_Texture_Compression) — / [Docs](https://www.khronos.org/opengl/wiki/BCn_Texture_Compression) / [OpenGL](https://www.khronos.org/opengl/) / [Community](https://www.khronos.org/opengl/wiki/) / [GitHub](https://github.com/KhronosGroup/OpenGL-Registry)
- [ETC Compression](https://www.khronos.org/opengl/wiki/ETC_Texture_Compression) — / [Docs](https://www.khronos.org/opengl/wiki/ETC_Texture_Compression) / [OpenGL](https://www.khronos.org/opengl/) / [Community](https://www.khronos.org/opengl/wiki/) / [GitHub](https://github.com/KhronosGroup/OpenGL-Registry)
- [ASTC Compression](https://www.khronos.org/opengl/wiki/ASTC_Texture_Compression) — / [Docs](https://www.khronos.org/opengl/wiki/ASTC_Texture_Compression) / [OpenGL](https://www.khronos.org/opengl/) / [Community](https://www.khronos.org/opengl/wiki/) / [GitHub](https://github.com/KhronosGroup/OpenGL-Registry)
- [KTX2 Compression](https://www.khronos.org/ktx/) — / [Docs](https://www.khronos.org/ktx/) / [Spec](https://registry.khronos.org/KTX/specs/2.0/ktxspec2.0.html) / [Tools](https://github.com/KhronosGroup/KTX-Software) / [Community](https://www.khronos.org/ktx/)

**Geometry Compression:**
- [Mesh Compression](https://en.wikipedia.org/wiki/Mesh_compression) — / [Wikipedia](https://en.wikipedia.org/wiki/Mesh_compression) / [Article](https://en.wikipedia.org/wiki/Mesh_compression) / [Community](https://en.wikipedia.org/wiki/Mesh_compression) / [YouTube](https://www.youtube.com/results?search_query=mesh+compression)
- [Draco Compression](https://google.github.io/draco/) — / [GitHub](https://github.com/google/draco) / [Docs](https://google.github.io/draco/) / [Examples](https://google.github.io/draco/) / [Community](https://github.com/google/draco)
- [glTF Compression](https://www.khronos.org/gltf/) — / [Spec](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html) / [Draco](https://google.github.io/draco/) / [Meshopt](https://github.com/zeux/meshoptimizer) / [Community](https://www.khronos.org/gltf/)
- [Basis Universal](https://github.com/BinomialLLC/basis_universal) — / [GitHub](https://github.com/BinomialLLC/basis_universal) / [Docs](https://github.com/BinomialLLC/basis_universal) / [Examples](https://github.com/BinomialLLC/basis_universal) / [Community](https://github.com/BinomialLLC/basis_universal)

### 🌍 Renderização de Terrenos

**Terrain Generation:**
- [Procedural Terrain](https://en.wikipedia.org/wiki/Procedural_generation) — / [Wikipedia](https://en.wikipedia.org/wiki/Procedural_generation) / [Article](https://en.wikipedia.org/wiki/Procedural_generation) / [Community](https://en.wikipedia.org/wiki/Procedural_generation) / [YouTube](https://www.youtube.com/results?search_query=procedural+terrain)
- [Perlin Noise](https://en.wikipedia.org/wiki/Perlin_noise) — / [Wikipedia](https://en.wikipedia.org/wiki/Perlin_noise) / [Article](https://en.wikipedia.org/wiki/Perlin_noise) / [Community](https://en.wikipedia.org/wiki/Perlin_noise) / [YouTube](https://www.youtube.com/results?search_query=perlin+noise)
- [Simplex Noise](https://en.wikipedia.org/wiki/Simplex_noise) — / [Wikipedia](https://en.wikipedia.org/wiki/Simplex_noise) / [Article](https://en.wikipedia.org/wiki/Simplex_noise) / [Community](https://en.wikipedia.org/wiki/Simplex_noise) / [YouTube](https://www.youtube.com/results?search_query=simplex+noise)
- [Voronoi Diagram](https://en.wikipedia.org/wiki/Voronoi_diagram) — / [Wikipedia](https://en.wikipedia.org/wiki/Voronoi_diagram) / [Article](https://en.wikipedia.org/wiki/Voronoi_diagram) / [Community](https://en.wikipedia.org/wiki/Voronoi_diagram) / [YouTube](https://www.youtube.com/results?search_query=voronoi+diagram)
- [Heightmap](https://en.wikipedia.org/wiki/Heightmap) — / [Wikipedia](https://en.wikipedia.org/wiki/Heightmap) / [Article](https://en.wikipedia.org/wiki/Heightmap) / [Community](https://en.wikipedia.org/wiki/Heightmap) / [YouTube](https://www.youtube.com/results?search_query=heightmap)

**Terrain Tools:**
- [Gaea](https://quadspinner.com/) — / [Download](https://quadspinner.com/download/) / [Docs](https://quadspinner.com/documentation/) / [Learn](https://quadspinner.com/learn/) / [Community](https://quadspinner.com/forum/) / [YouTube](https://www.youtube.com/c/QuadSpinner) / [Twitter](https://twitter.com/QuadSpinner)
- [World Creator](https://www.world-creator.com/) — / [Download](https://www.world-creator.com/download/) / [Docs](https://www.world-creator.com/documentation/) / [Learn](https://www.world-creator.com/learn/) / [Community](https://www.world-creator.com/forum/) / [YouTube](https://www.youtube.com/c/WorldCreator) / [Twitter](https://twitter.com/WorldCreator)
- [World Machine](https://www.world-machine.com/) — / [Download](https://www.world-machine.com/download/) / [Docs](https://www.world-machine.com/documentation/) / [Learn](https://www.world-machine.com/learn/) / [Community](https://www.world-machine.com/forum/) / [YouTube](https://www.youtube.com/c/WorldMachine) / [Twitter](https://twitter.com/WorldMachine)
- [SpeedTree](https://store.speedtree.com/) — / [Download](https://store.speedtree.com/) / [Docs](https://docs.speedtree.com/) / [Learn](https://docs.speedtree.com/) / [Community](https://forum.speedtree.com/) / [YouTube](https://www.youtube.com/c/SpeedTree) / [Twitter](https://twitter.com/SpeedTree)

### 📊 Performance e Otimização

**Optimization Techniques:**
- [Culling](https://en.wikipedia.org/wiki/Hidden_surface_determination) — / [Wikipedia](https://en.wikipedia.org/wiki/Hidden_surface_determination) / [Article](https://en.wikipedia.org/wiki/Hidden_surface_determination) / [Community](https://en.wikipedia.org/wiki/Hidden_surface_determination) / [YouTube](https://www.youtube.com/results?search_query=culling)
- [Frustum Culling](https://en.wikipedia.org/wiki/Frustum_culling) — / [Wikipedia](https://en.wikipedia.org/wiki/Frustum_culling) / [Article](https://en.wikipedia.org/wiki/Frustum_culling) / [Community](https://en.wikipedia.org/wiki/Frustum_culling) / [YouTube](https://www.youtube.com/results?search_query=frustum+culling)
- [Occlusion Culling](https://en.wikipedia.org/wiki/Occlusion_culling) — / [Wikipedia](https://en.wikipedia.org/wiki/Occlusion_culling) / [Article](https://en.wikipedia.org/wiki/Occlusion_culling) / [Community](https://en.wikipedia.org/wiki/Occlusion_culling) / [YouTube](https://www.youtube.com/results?search_query=occlusion+culling)
- [LOD (Level of Detail)](https://en.wikipedia.org/wiki/Level_of_detail) — / [Wikipedia](https://en.wikipedia.org/wiki/Level_of_detail) / [Article](https://en.wikipedia.org/wiki/Level_of_detail) / [Community](https://en.wikipedia.org/wiki/Level_of_detail) / [YouTube](https://www.youtube.com/results?search_query=level+of+detail)
- [Instancing](https://www.khronos.org/opengl/wiki/Vertex_Rendering#Instancing) — / [Docs](https://www.khronos.org/opengl/wiki/Vertex_Rendering#Instancing) / [OpenGL](https://www.khronos.org/opengl/) / [Community](https://www.khronos.org/opengl/wiki/) / [GitHub](https://github.com/KhronosGroup/OpenGL-Registry)

**Performance Profiling:**
- [RenderDoc](https://renderdoc.org/) — / [GitHub](https://github.com/baldurk/renderdoc) / [Docs](https://renderdoc.org/docs/) / [Download](https://renderdoc.org/) / [Community](https://renderdoc.org/) / [YouTube](https://www.youtube.com/results?search_query=renderdoc)
- [NVIDIA Nsight](https://developer.nvidia.com/nsight-graphics/) — / [Download](https://developer.nvidia.com/nsight-graphics/) / [Docs](https://developer.nvidia.com/nsight-graphics/) / [Examples](https://developer.nvidia.com/nsight-graphics/) / [Community](https://developer.nvidia.com/nsight-graphics/)
- [AMD Radeon GPU Profiler](https://gpuopen.com/rgp/) — / [Download](https://gpuopen.com/rgp/) / [Docs](https://gpuopen.com/rgp/documentation) / [Examples](https://gpuopen.com/rgp/) / [Community](https://gpuopen.com/rgp/)
- [Intel GPA](https://www.intel.com/content/www/us/en/developer/tools/graphics-performance-analyzers/overview.html) — / [Download](https://www.intel.com/content/www/us/en/developer/tools/graphics-performance-analyzers/overview.html) / [Docs](https://www.intel.com/content/www/us/en/developer/tools/graphics-performance-analyzers/overview.html) / [Examples](https://www.intel.com/content/www/us/en/developer/tools/graphics-performance-analyzers/overview.html) / [Community](https://www.intel.com/content/www/us/en/developer/tools/graphics-performance-analyzers/overview.html)
- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/) — / [Performance](https://developers.google.com/web/tools/chrome-devtools/performance) / [WebGL](https://developers.google.com/web/tools/chrome-devtools/javascript/webgl-inspector) / [Memory](https://developers.google.com/web/tools/chrome-devtools/memory-problems) / [Community](https://developers.google.com/web/tools/chrome-devtools/)

---

*Última atualização: 2026-08-31*  
*Este mega link dump segue o estilo FMHY para fornecer recursos extensivos sobre conceitos de computação gráfica.*
