---
title: Bibliotecas de Renderização
sidebar_label: Bibliotecas
description: Bibliotecas e motores gráficos para renderização em tempo real, ray tracing e pesquisa.
---

<script setup>
import CanvasPanel from "./.vitepress/components/CanvasPanel.vue";
import ThreePanel from "./.vitepress/components/ThreePanel.vue";
import sketchThreejsScene from "./.vitepress/components/animations/canvas_threejs_scene.js";
import sketchOpenglPipeline from "./.vitepress/components/animations/canvas_opengl_pipeline.js";
import sketchR3f from "./.vitepress/components/animations/canvas_r3f.js";
</script>

# Bibliotecas

:::tip Curadoria & Filtro Rápido
Itens marcados com ⭐ representam bibliotecas recomendadas e motores de referência. Use o botão **"Filtrar Recomendados"** na barra lateral para focar diretamente nas melhores opções de cada área.
:::

Three.js, usada neste site nas visualizações, é uma biblioteca de rasterização em tempo real no navegador. A cena abaixo é o mesmo tipo de objeto que engines como OGRE ou bgfx montam no desktop.

### 1. Three.js: Visualização e Scenegraph

<ThreePanel
  topic="threejs"
  title="Cena Three.js Interativa em Tempo Real"
  subtitle="Torus knot com satélites poliédricos orbitais e campo de partículas estelares."
/>

<CanvasPanel
  :sketch="sketchThreejsScene"
  title="Diagrama Didático 2D: Scenegraph"
  subtitle="Hierarquia Scenegraph com câmeras, luzes e malhas poligonais."
/>

### 2. Pipeline e Fluxo de Execução

<ThreePanel
  topic="pipeline"
  title="Pipeline Gráfico de Hardware 3D"
  subtitle="Nós de processamento de hardware transitando primitivas até a composição do framebuffer."
/>

<CanvasPanel
  :sketch="sketchOpenglPipeline"
  title="Diagrama Didático 2D: Pipeline Gráfico das Bibliotecas"
  subtitle="Da CPU/VBO aos Shaders e Framebuffers: como os frameworks gerenciam o fluxo gráfico."
/>

### 3. Frameworks Reativos

<ThreePanel
  topic="r3f"
  title="Átomo Declarativo R3F 3D"
  subtitle="Grafo de componentes reativos conectando hooks de estado ao runtime Three.js."
/>

<CanvasPanel
  :sketch="sketchR3f"
  title="Diagrama Didático 2D: Ecossistemas Declarativos Modernos (R3F)"
  subtitle="Arquitetura de componentes reativos e controle de estado em tempo real no espaço 3D."
/>

## Rasterização em tempo real

**Frameworks Principais:**
- [bgfx](https://github.com/bkaradzic/bgfx) — Abstração multiplataforma sobre Vulkan, DX12, Metal e OpenGL
- [OGRE](https://www.ogre3d.org/) — Engine de renderização orientada a cenas
- [Irrlicht](https://irrlicht.sourceforge.io/) — Biblioteca clássica para aprendizagem
- [Urho3D](https://urho3d.io/) — Renderização em tempo real com física e cenas
- [Diligent Engine](https://github.com/DiligentGraphics/DiligentEngine) — Camada moderna para APIs gráficas
- [Falcor](https://github.com/NVIDIAGameWorks/Falcor) — Pesquisa e prototipação da NVIDIA
- [Magnum](https://magnum.graphics/) — Framework C++11 moderno e leve
- [Glad](https://github.com/Dav1dde/glad) — OpenGL loader multiplataforma
- [GLFW](https://www.glfw.org/) — Biblioteca para criar janelas com OpenGL/Vulkan
- [SDL](https://www.libsdl.org/) — Simple DirectMedia Layer para gráficos
- [SFML](https://www.sfml-dev.org/) — Simple and Fast Multimedia Library
- [Allegro](https://liballeg.org/) — Biblioteca de jogos e gráficos
- [Ogre3D](https://www.ogre3d.org/) — Engine 3D orientada a cenas
- [Panda3D](https://www.panda3d.org/) — Engine 3D em Python
- [Cocos2d-x](https://www.cocos2d-x.org/) — Engine 2D multiplataforma
- [Love2D](https://love2d.org/) — Framework 2D em Lua
- [Monogame](https://www.monogame.net/) — Framework XNA open source
- [LibGDX](https://libgdx.com/) — Framework Java para jogos
- [PlayCanvas](https://playcanvas.com/) — Engine 3D na web
- [Babylon.js](https://www.babylonjs.com/) — Engine 3D JavaScript completa
- [PixiJS](https://pixijs.com/) — Engine 2D WebGL rápida
- [Phaser](https://phaser.io/) — Framework 2D para jogos web
- [MelonJS](https://melonjs.org/) — Engine 2D HTML5
- [Konva.js](https://konvajs.org/) — Canvas 2D framework
- [Fabric.js](https://fabricjs.com/) — Canvas biblioteca interativa
- [Paper.js](https://paperjs.org/) — Scripting para vetor gráficos
- [Two.js](https://two.js.org/) — API para 2D no canvas
- [P5.js](https://p5js.org/) — Biblioteca para arte criativa
- [Processing](https://processing.org/) — Linguagem para artes visuais
- [OpenFrameworks](https://openframeworks.cc/) — C++ toolkit para arte criativa
- [Cinder](https://libcinder.org/) — C++ framework para arte criativa
- [TouchDesigner](https://derivative.ca/) — Visual development platform

## Ray tracing

**Renderizadores Físicos:**
- [PBRT](https://www.pbr-book.org/) — Referência máxima em renderização física
- [Mitsuba](https://mitsuba-renderer.org/) — Pesquisa acadêmica em iluminação
- [LuxCoreRender](https://luxcorerender.org/) — Foco em realismo físico
- [Tungsten](https://github.com/tunabrain/tungsten) — Ray tracing educacional
- [MoonRay](https://openmoonray.org/) — Renderizador de produção
- [Embree](https://www.intel.com/content/www/us/en/developer/tools/oneapi/embree-render-kernels.html) — Interseções de raios
- [Appleseed](https://appleseedhq.net/) — Renderizador open source
- [Arnold](https://www.autodesk.com/products/arnold/overview) — Renderizador de produção
- [V-Ray](https://www.chaos.com/vray) — Renderizador comercial
- [Redshift](https://www.maxon.net/redshift) — GPU renderer
- [OctaneRender](https://home.otoy.com/render/octane-render/) — GPU RTX
- [Corona Renderer](https://corona-renderer.com/) — ArchViz renderer
- [KeyShot](https://www.keyshot.com/) — Product visualization
- [FStorm](https://fstormrender.com/) — GPU render
- [Thea Render](https://www.thearender.com/) — Hybrid render
- [Cycles](https://www.blender.org/features/rendering/) — Blender path tracer
- [Eevee](https://www.blender.org/features/rendering/) — Blender real-time render
- [Grease Pencil](https://www.blender.org/features/grease-pencil/) — Blender 2D/3D hybrid
- [MaterialX](https://materialx.org/) — Shading and material system
- [OSL](https://github.com/imageworks/OpenShadingLanguage) — Open Shading Language
- [OptiX](https://developer.nvidia.com/optix) — NVIDIA ray tracing API
- [DXR](https://developer.nvidia.com/rtx/ray-tracing) — DirectX Ray Tracing
- [Vulkan Ray Tracing](https://github.com/KhronosGroup/Vulkan-Hpp) — Vulkan RT extensions
- [AMD Radeon Rays](https://github.com/GPUOpen-LibrariesAndSDKs/RadeonRays_SDK) — Open source ray tracing
- [Intel Open Image Denoise](https://www.openimagedenoise.org/) — AI denoising
- [NVIDIA OptiX Denoiser](https://developer.nvidia.com/optix) — AI denoising

## Pesquisa acadêmica

**Plataformas de Pesquisa:**
- [Nori](https://wjakob.github.io/nori/) — Renderizador educacional
- [Mitsuba 3](https://mitsuba-renderer.org/) — Plataforma de pesquisa
- [Taichi Graphics](https://github.com/taichi-dev/taichi) — Algoritmos gráficos e físicos
- [Dr.Jit](https://github.com/mitsuba-renderer/drjit) — Computação diferenciável
- [TinyRenderer](https://github.com/ssloy/tinyrenderer) — Pipeline gráfico minimalista
- [Halide](https://halide-lang.org/) — Linguagem para processamento de imagem
- [Xenko](https://github.com/xenko3d/xenko) — Engine 3D open source
- [Stride](https://www.stride3d.net/) — Engine C# open source
- [Flax Engine](https://flaxengine.com/) — Engine C++ open source
- [O3DE](https://www.o3de.org/) — Open 3D Engine da AWS
- [Lumberyard](https://aws.amazon.com/lumberyard/) — Engine anterior da AWS
- [GameWorks](https://developer.nvidia.com/gameworks) — Bibliotecas NVIDIA
- [AMD GPUOpen](https://gpuopen.com/) — Bibliotecas AMD
- [Intel oneAPI](https://www.intel.com/content/www/us/en/developer/tools/oneapi.html) — Intel toolkit
- [DirectX Tool Kit](https://github.com/Microsoft/DirectXTK) — DirectX utilities
- [Vulkan-Hpp](https://github.com/KhronosGroup/Vulkan-Hpp) — Vulkan C++ bindings
- [SPIRV-Cross](https://github.com/KhronosGroup/SPIRV-Cross) — SPIRV reflection
- [glslang](https://github.com/KhronosGroup/glslang) — GLSL/ESSL to SPIRV
- [SPIRV-Tools](https://github.com/KhronosGroup/SPIRV-Tools) — SPIRV utilities
- [Shaderc](https://github.com/google/shaderc) — Shader compiler
- [NVRHI](https://github.com/NVIDIAGameWorks/NVRHI) — NVIDIA rendering interface

## Renderização educacional

**Recursos Educacionais:**
- [Ray Tracing in One Weekend](https://raytracing.github.io/) — Série do zero
- [TinyRenderer](https://github.com/ssloy/tinyrenderer) — Pipeline gráfico em poucos passos
- [Scratchapixel](https://www.scratchapixel.com/) — Matemática e algoritmos gráficos
- [MiniEngine](https://github.com/microsoft/DirectX-Graphics-Samples/tree/master/MiniEngine) — Engine educacional
- [TheChernoHazel](https://github.com/TheCherno/Hazel) — Arquitetura de engine
- [SmallPT](https://www.kevinbeason.com/smallpt/) — Ray tracer compacto
- [Lodev Ray Tracing](https://lodev.org/cgtutor/raytracing.html) — Tutorial básico
- [Ray Tracing Academy](https://www.realtimerendering.com/raytracing/) — Recursos RT
- [GPU Open Ray Tracing](https://gpuopen.com/) — AMD RT resources
- [NVIDIA Ray Tracing Gems](https://www.realtimerendering.com/raytracinggems/) — Técnicas avançadas
- [The Book of Shaders](https://thebookofshaders.com/) — Shader programming
- [ShaderToy](https://www.shadertoy.com/) — Galeria de shaders

- [Shader-Learn](https://shader-learn.com/) — Aprendizado de shaders
- [Shadertoy Unofficial](https://shadertoyunofficial.wordpress.com/) — Recursos Shadertoy
- [3D Shaders](https://www.3dshaders.com/) — Shader techniques
- [Shader School](https://github.com/stackgl/shader-school) — Workshop shaders
- [GLSL Tutorial](https://www.lighthouse3d.com/tutorials/glsl-tutorial/) — Learn GLSL
- [Learn OpenGL](https://learnopengl.com/) — OpenGL moderno
- [OpenGL Tutorial](https://www.opengl-tutorial.org/) — Tutorial básico
- [Open.GL](https://open.gl/) — Introdução direta
- [Modern OpenGL](https://ogldev.org/) — Tutoriais avançados
- [Vulkan Tutorial](https://vulkan-tutorial.com/) — Vulkan básico
- [VkGuide](https://vkguide.dev/) — Guia didático Vulkan
- [Vulkan Guide](https://github.com/KhronosGroup/Vulkan-Guide) — Khronos guide
- [WebGL Fundamentals](https://webglfundamentals.org/) — WebGL básico
- [WebGPU Fundamentals](https://webgpufundamentals.org/) — WebGPU moderno
- [Three.js Documentation](https://threejs.org/docs/) — Three.js docs
- [Three.js Examples](https://threejs.org/examples/) — Three.js demos
- [Babylon.js Documentation](https://doc.babylonjs.com/) — Babylon docs
- [Babylon Playground](https://playground.babylonjs.com/) — Babylon demos

## Científica

**Visualização Científica:**
- [VTK](https://vtk.org/) — Visualização científica
- [ParaView](https://www.paraview.org/) — Visualização de simulações
- [OpenSceneGraph](https://www.openscenegraph.com/) — Visualização 3D em aplicações científicas
- [VisIt](https://visit.llnl.gov/) — Visualização paralela
- [Mayavi](https://docs.enthought.com/mayavi/mayavi/) — Python scientific visualization
- [Plotly](https://plotly.com/) — Interactive plotting
- [Bokeh](https://bokeh.org/) — Python visualization library
- [Matplotlib](https://matplotlib.org/) — Python plotting
- [D3.js](https://d3js.org/) — JavaScript visualization
- [Three.js](https://threejs.org/) — 3D web visualization
- [Deck.gl](https://deck.gl/) — WebGL visualization
- [Vis.gl](https://vis.gl/) — WebGL visualization suite
- [HoloViews](https://holoviews.org/) — Python visualization
- [Altair](https://altair-viz.github.io/) — Declarative visualization
- [PyVista](https://pyvista.org/) — 3D Python visualization
- [ITK](https://itk.org/) — Medical imaging
- [SimpleITK](https://simpleitk.org/) — Simplified medical imaging
- [OpenCV](https://opencv.org/) — Computer vision library
- [SciKit-Image](https://scikit-image.org/) — Image processing
- [NDArray](https://numpy.org/) — Numerical computing
- [SciPy](https://scipy.org/) — Scientific computing

## Frameworks para engines

- [bgfx](https://github.com/bkaradzic/bgfx) — Base moderna para engines
- [Magnum](https://magnum.graphics/) — Framework moderno e limpo
- [Diligent Engine](https://github.com/DiligentGraphics/DiligentEngine) — Abstração de APIs gráficas
- [OGRE](https://www.ogre3d.org/) — Base sólida para cenas 3D
- [Urho3D](https://urho3d.io/) — Estrutura completa para jogos

## Melhores referências

- ⭐ [PBRT](https://www.pbr-book.org/) — referência principal de renderização física
- ⭐ [Mitsuba](https://mitsuba-renderer.org/) — excelente para pesquisa e diferenciação
- ⭐ [bgfx](https://github.com/bkaradzic/bgfx) — poderosa abstração multiplataforma para engines
- ⭐ [OGRE](https://www.ogre3d.org/) — ótimo para aprender cenas e pipeline
- ⭐ [Ray Tracing in One Weekend](https://raytracing.github.io/) — melhor introdução prática
- ⭐ [Scratchapixel](https://www.scratchapixel.com/) — melhor para entender algoritmos matemáticos

---


### Bibliotecas e Frameworks Web

**Three.js Ecosystem:**
- [Three.js](https://threejs.org/) — / [Documentação](https://threejs.org/docs/) / [Exemplos](https://threejs.org/examples/) / [GitHub](https://github.com/mrdoob/three.js)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) — / [GitHub](https://github.com/pmndrs/react-three-fiber) / [Drei](https://github.com/pmndrs/drei)
- [Three.js Journey](https://threejs-journey.com/) — / [Bruno Simon](https://bruno-simon.com/)
- [Three.js Fundamentals](https://threejsfundamentals.org/) — / [Google](https://developers.google.com/web/fundamentals/web-gl/threejs)
- [Three.js TypeScript](https://github.com/tweenjs/tween.js) — / [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/three)
- [Three.js Postprocessing](https://github.com/pmndrs/postprocessing) — / [EffectComposer](https://threejs.org/examples/#webgl_postprocessing)
- [Three.js Loaders](https://threejs.org/docs/#examples/en/loaders) — / [GLTFLoader](https://threejs.org/examples/#webgl_loader_gltf) / [OBJLoader](https://threejs.org/examples/#webgl_loader_obj)
- [Three.js Physics](https://github.com/pmndrs/cannon-es) — / [Ammo.js](https://github.com/kripken/ammo.js) / [Física](https://threejs.org/docs/#examples/en/physics)
- [Three.js GUI](https://github.com/georgealways/lil-gui) — / [Dat.GUI](https://github.com/dataarts/dat.gui) / [ControlPanel](https://github.com/automat/control-panel)
- [Three.js Textures](https://threejs.org/docs/#api/en/textures) — / [TextureLoader](https://threejs.org/docs/#api/en/loaders/TextureLoader) / [CompressedTextures](https://threejs.org/docs/#manual/en/introduction/Texture-compression)
- [Three.js Shaders](https://threejs.org/docs/#api/en/materials/ShaderMaterial) — / [ShaderMaterial](https://threejs.org/examples/#webgl_shader) / [RawShaderMaterial](https://threejs.org/examples/#webgl_shader_lava)
- [Three.js Geometries](https://threejs.org/docs/#api/en/geometries) — / [BufferGeometry](https://threejs.org/docs/#api/en/core/BufferGeometry) / [InstancedMesh](https://threejs.org/examples/#webgl_instancing_dynamic)
- [Three.js Animation](https://threejs.org/docs/#api/en/animation) — / [AnimationMixer](https://threejs.org/docs/#api/en/animation/AnimationMixer) / [GSAP](https://greensock.com/gsap/)
- [Three.js Particles](https://threejs.org/examples/#webgl_points) — / [PointsMaterial](https://threejs.org/docs/#api/en/materials/PointsMaterial) / [BufferGeometry](https://threejs.org/examples/#webgl_buffergeometry_points)
- [Three.js VR/AR](https://threejs.org/docs/#examples/en/vr) — / [WebXR](https://threejs.org/docs/#manual/en/introduction/WebXR-vr) / [AR.js](https://github.com/AR-js-org/AR.js)
- [Three.js Utils](https://threejs.org/docs/#examples/en/utils) — / [Utils](https://threejs.org/docs/#examples/en/math/Utils) / [MathUtils](https://threejs.org/docs/#api/en/math/MathUtils)

**Babylon.js Ecosystem:**
- [Babylon.js](https://www.babylonjs.com/) — / [Documentação](https://doc.babylonjs.com/) / [Playground](https://playground.babylonjs.com/) / [GitHub](https://github.com/BabylonJS/Babylon.js)
- [Babylon.js GUI](https://doc.babylonjs.com/features/featuresDeepDive/gui) — / [AdvancedDynamicTexture](https://doc.babylonjs.com/features/featuresDeepDive/gui)
- [Babylon.js Physics](https://doc.babylonjs.com/features/featuresDeepDive/physics) — / [Havok](https://doc.babylonjs.com/features/featuresDeepDive/physics) / [Oimo](https://doc.babylonjs.com/features/featuresDeepDive/physics)
- [Babylon.js Materials](https://doc.babylonjs.com/features/featuresDeepDive/materials) — / [PBRMaterial](https://doc.babylonjs.com/features/featuresDeepDive/materials) / [NodeMaterial](https://doc.babylonjs.com/features/featuresDeepDive/materials)
- [Babylon.js PostProcess](https://doc.babylonjs.com/features/featuresDeepDive/postProcesses) — / [Pipeline](https://doc.babylonjs.com/features/featuresDeepDive/postProcesses)
- [Babylon.js GUI Editor](https://gui.babylonjs.com/) — / [Material Editor](https://nme.babylonjs.com/)
- [Babylon.js Inspector](https://doc.babylonjs.com/) — / [Camada de Depuração](https://doc.babylonjs.com/)

**WebGL/WebGPU:**
- [WebGL Fundamentals](https://webglfundamentals.org/) — / [WebGL2](https://webgl2fundamentals.org/) / [Google](https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html)
- [WebGPU Fundamentals](https://webgpufundamentals.org/) — / [WGSL](https://www.w3.org/TR/WGSL/) / [Google](https://developer.chrome.com/docs/web-platform/webgpu/)
- [WebGL Specs](https://www.khronos.org/webgl/) — / [WebGL2](https://www.khronos.org/registry/webgl/specs/latest/2.0/) / [Extensões](https://www.khronos.org/webgl/wiki/Getting_WebGL_Extensions)
- [WebGPU Specs](https://www.w3.org/TR/webgpu/) — / [WGSL](https://www.w3.org/TR/WGSL/) / [Explicativo](https://github.com/gpuweb/gpuweb)
- [glTF](https://www.khronos.org/gltf/) — / [Especificação](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html) / [Exemplos](https://github.com/KhronosGroup/glTF-Sample-Models)
- [Draco](https://google.github.io/draco/) — / [GitHub](https://github.com/google/draco) / [Basis Universal](https://github.com/BinomialLLC/basis_universal)
- [KTX2](https://www.khronos.org/ktx/) — / [Especificação](https://registry.khronos.org/KTX/specs/2.0/ktxspec2.0.html) / [Ferramentas](https://github.com/KhronosGroup/KTX-Software)

### Motores de Jogos e Frameworks

**Commercial Engines:**
- [Unreal Engine](https://www.unrealengine.com/) — / [Documentação](https://docs.unrealengine.com/) / [Loja](https://www.unrealengine.com/marketplace) / [GitHub](https://www.unrealengine.com/)
- [Unity](https://unity.com/) — / [Documentação](https://docs.unity3d.com/) / [Loja de Assets](https://assetstore.unity.com/) / [Aprender](https://learn.unity.com/)
- [CryEngine](https://www.cryengine.com/) — / [Documentação](https://docs.cryengine.com/) / [Loja](https://www.cryengine.com/marketplace)
- [Lumberyard](https://aws.amazon.com/lumberyard/) — / [Documentação](https://docs.aws.amazon.com/lumberyard/latest/userguide/welcome.html)

**Open Source Engines:**
- [Godot](https://godotengine.org/) — / [Documentação](https://docs.godotengine.org/) / [Asset Library](https://godotengine.org/asset-library) / [GitHub](https://github.com/godotengine/godot)
- [O3DE](https://www.o3de.org/) — / [Documentação](https://www.o3de.org/docs/) / [GitHub](https://github.com/o3de/o3de)
- [Stride](https://www.stride3d.net/) — / [Documentação](https://doc.stride3d.net/) / [GitHub](https://github.com/stride3d/stride)
- [Flax Engine](https://flaxengine.com/) — / [Documentação](https://docs.flaxengine.com/) / [GitHub](https://github.com/FlaxEngine/FlaxEngine)
- [Armory3D](https://armory3d.org/) — / [Documentação](https://armory3d.org/) / [GitHub](https://github.com/armory3d/armory)
- [Bevy](https://bevyengine.org/) — / [Documentação](https://bevyengine.org/learn/book/) / [GitHub](https://github.com/bevyengine/bevy)
- [Fyrox](https://fyrox.rs/) — / [Documentação](https://fyrox.rs/book/) / [GitHub](https://github.com/FyroxEngine/Fyrox)
- [Urho3D](https://urho3d.io/) — / [Documentação](https://urho3d.github.io/documentation/) / [GitHub](https://github.com/urho3d/Urho3D)
- [Panda3D](https://www.panda3d.org/) — / [Documentação](https://docs.panda3d.org/) / [GitHub](https://github.com/panda3d/panda3d)
- [Cocos2d-x](https://www.cocos2d-x.org/) — / [Documentação](https://www.cocos2d-x.org/docs/) / [GitHub](https://github.com/cocos2d/cocos2d-x)
- [Love2D](https://love2d.org/) — / [Wiki](https://love2d.org/wiki/) / [GitHub](https://github.com/love2d/love)
- [Monogame](https://www.monogame.net/) — / [Documentação](https://docs.monogame.net/) / [GitHub](https://github.com/MonoGame/MonoGame)
- [LibGDX](https://libgdx.com/) — / [Wiki](https://github.com/libgdx/libgdx/wiki) / [GitHub](https://github.com/libgdx/libgdx)
- [Phaser](https://phaser.io/) — / [Documentação](https://photonstorm.github.io/phaser3-docs/) / [GitHub](https://github.com/photonstorm/phaser)
- [PixiJS](https://pixijs.com/) — / [Documentação](https://pixijs.io/docs/) / [GitHub](https://github.com/pixijs/pixi.js)

### Desktop/Graphics APIs

**OpenGL:**
- [OpenGL](https://www.opengl.org/) — / [Registry](https://www.opengl.org/registry/) / [Wiki](https://www.khronos.org/opengl/wiki/Main_Page)
- [OpenGL ES](https://www.khronos.org/opengles/) — / [Especificações](https://www.khronos.org/opengles/specs/) / [Referência](https://www.khronos.org/opengles/sdk/tools/Reference-Manual/)
- 🌐 [LearnOpenGL](https://learnopengl.com/) — / [GitHub](https://github.com/JoeyDeVries/LearnOpenGL) / [Livro](https://learnopengl.com/About.php)
- [OpenGL Tutorial](https://www.opengl-tutorial.org/) — / [GitHub](https://github.com/opengl-tutorials/ogl)
- [Modern OpenGL](https://ogldev.org/) — / [GitHub](https://github.com/emeiri/ogldev)
- [OpenGL Commons](https://www.opengl.org/resources/) — / [Libraries](https://www.opengl.org/resources/libraries/) / [Ferramentas](https://www.opengl.org/resources/)

**Vulkan:**
- [Vulkan](https://www.vulkan.org/) — / [Especificações](https://www.khronos.org/vulkan/) / [Tutorial](https://vulkan-tutorial.com/)
- [Vulkan Tutorial](https://vulkan-tutorial.com/) — / [GitHub](https://github.com/Overv/VulkanTutorial)
- [VkGuide](https://vkguide.dev/) — / [GitHub](https://github.com/vblanco20-1/vulkan-guide)
- [Vulkan Guide](https://github.com/KhronosGroup/Vulkan-Guide) — / [Exemplos](https://github.com/KhronosGroup/Vulkan-Samples)
- [Vulkan-Hpp](https://github.com/KhronosGroup/Vulkan-Hpp) — / [Documentação](https://github.com/KhronosGroup/Vulkan-Hpp/blob/main/README.md)
- [SPIRV](https://www.khronos.org/spir/) — / [Ferramentas](https://github.com/KhronosGroup/SPIRV-Tools) / [Cross](https://github.com/KhronosGroup/SPIRV-Cross)
- [GLSL to SPIRV](https://github.com/KhronosGroup/glslang) — / [Shaderc](https://github.com/google/shaderc) / [SPIRV-V](https://github.com/KhronosGroup/SPIRV-Tools)

**DirectX:**
- [DirectX](https://docs.microsoft.com/windows/win32/directx) — / [DX12](https://docs.microsoft.com/windows/win32/direct3d12) / [DX11](https://docs.microsoft.com/windows/win32/direct3d11)
- [DirectX-Graphics-Samples](https://github.com/microsoft/DirectX-Graphics-Samples) — / [MiniEngine](https://github.com/microsoft/DirectX-Graphics-Samples/tree/master/MiniEngine)
- [DirectX Tool Kit](https://github.com/Microsoft/DirectXTK) — / [DirectXTK12](https://github.com/Microsoft/DirectXTK12)
- [HLSL](https://docs.microsoft.com/windows/win32/direct3dhlsl) — / [Compilador](https://github.com/microsoft/DirectXShaderCompiler)
- [DXR](https://developer.nvidia.com/rtx/ray-tracing) — / [Ray Tracing](https://docs.microsoft.com/windows/win32/direct3d12/ray-tracing-overview)

**Metal:**
- [Metal](https://developer.apple.com/metal/) — / [Documentação](https://developer.apple.com/documentation/metal) / [Shading Language](https://developer.apple.com/metal/Metal-Shading-Language-Specification.pdf)
- [Metal Samples](https://developer.apple.com/metal/sample-code/) — / [GPU](https://developer.apple.com/metal/GPU-Family2-Guide.pdf)

### Matemática e Física

**Math Libraries:**
- [GLM](https://github.com/g-truc/glm) — / [Documentação](https://github.com/g-truc/glm/blob/master/manual.md)
- [Eigen](https://eigen.tuxfamily.org/) — / [Documentação](https://eigen.tuxfamily.org/dox/)
- [MathGeoLib](https://github.com/juj/MathGeoLib) — / [Documentação](https://github.com/juj/MathGeoLib)
- [DirectXMath](https://docs.microsoft.com/windows/win32/dxmath/directxmath-portal) — / [GitHub](https://github.com/microsoft/DirectXMath)
- [Boost.Math](https://www.boost.org/doc/libs/release/libs/math/) — / [GitHub](https://github.com/boostorg/math)
- [CML](https://cmldev.net/) — / [GitHub](https://github.com/demoneaux/cml)
- [xsimd](https://github.com/xtensor-stack/xsimd) — / [Documentação](https://xtensor.readthedocs.io/)
- [Arithmetic](https://github.com/chromium/chromium/tree/master/base/numerics) — / [Google](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/base/numerics/)

**Physics Libraries:**
- [Bullet](https://pybullet.org/) — / [GitHub](https://github.com/bulletphysics/bullet3)
- [Box2D](https://box2d.org/) — / [GitHub](https://github.com/erincatto/Box2D)
- [PhysX](https://developer.nvidia.com/physx-sdk) — / [GitHub](https://github.com/NVIDIA-Omniverse/PhysX)
- [Havok](https://www.havok.com/) — / [Documentação](https://documentation.help/Havok/Havok_Physics.htm)
- [Jolt](https://github.com/jrouwe/JoltPhysics) — / [Documentação](https://jrouwe.github.io/JoltPhysics/)
- [ODE](https://ode.org/) — / [GitHub](https://github.com/ode/ode)
- [Chipmunk](https://chipmunk-physics.net/) — / [GitHub](https://github.com/slembcke/Chipmunk2D)
- [Newton](https://newtondynamics.com/) — / [GitHub](https://github.com/MADEAPPS/newton-dynamics)
- [ReactPhysics3D](https://www.reactphysics3d.com/) — / [GitHub](https://github.com/DanielChappuis/reactphysics3d)
- [Cannon.js](https://github.com/schteppe/cannon.js) — / [cannon-es](https://github.com/pmndrs/cannon-es)
- [Ammo.js](https://github.com/kripken/ammo.js) — / [Documentação](https://github.com/kripken/ammo.js)
- [Oimo.js](https://github.com/lo-th/Oimo.js) — / [GitHub](https://github.com/lo-th/Oimo.js)
- [Matter.js](https://github.com/liabru/matter-js) — / [Documentação](https://brm.io/matter-js/)

### Renderização e Shaders

**Shading Languages:**
- [GLSL](https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language) — / [Referência](https://www.khronos.org/registry/OpenGL/specs/gl/GLSLangSpec.4.60.pdf)
- [HLSL](https://docs.microsoft.com/windows/win32/direct3dhlsl/dx-graphics-hlsl) — / [Compilador](https://github.com/microsoft/DirectXShaderCompiler)
- [WGSL](https://www.w3.org/TR/WGSL/) — / [Especificação](https://www.w3.org/TR/WGSL/) / [Guia](https://gpuweb.github.io/wgsl/)
- [MSL](https://developer.apple.com/metal/Metal-Shading-Language-Specification.pdf) — / [Documentação](https://developer.apple.com/documentation/metal)
- [SPIR-V](https://www.khronos.org/registry/SPIR-V/) — / [Especificação](https://www.khronos.org/registry/SPIR-V/specs/1.0/SPIRV.html)

**Recursos de Shaders:**
- [ShaderToy](https://www.shadertoy.com/) — / [Não-oficial](https://shadertoyunofficial.wordpress.com/) / [API](https://www.shadertoy.com/api)
- [The Book of Shaders](https://thebookofshaders.com/) — / [GitHub](https://github.com/patriciogonzalezvivo/thebookofshaders) / [Editor](https://editor.thebookofshaders.com/)
- [Shader-Learn](https://shader-learn.com/) — / [Tutoriais](https://shader-learn.com/tutorials)

- [Vertex Shader Art](https://www.vertexshaderart.com/) — / [Galeria](https://www.vertexshaderart.com/gallery)
- [Pixel Shader Art](https://www.shadertoy.com/) — / [Exemplos](https://www.shadertoy.com/)
- [Shdr](https://shdr.bkcore.com/) — / [GitHub](https://github.com/bkcore/shdr)
- [Shader Park](https://shaderpark.com/) — / [Documentação](https://shaderpark.com/docs)
- [ShaderFrog](https://shaderfrog.com/) — / [Editor](https://shaderfrog.com/app)

### Modelagem e Assets

**3D Models:**
- [Sketchfab](https://sketchfab.com/) — / [Grátis](https://sketchfab.com/models?features=downloadable&sort_by=-likeCount) / [Modelos](https://sketchfab.com/models)
- [TurboSquid](https://www.turbosquid.com/) — / [Grátis](https://www.turbosquid.com/Search/3D-Models/Free) / [Premium](https://www.turbosquid.com/Search/3D-Models)
- [CGTrader](https://www.cgtrader.com/) — / [Grátis](https://www.cgtrader.com/free-3d-models) / [Premium](https://www.cgtrader.com/3d-models)
- [Unity Asset Store](https://assetstore.unity.com/) — / [Grátis](https://assetstore.unity.com/top/price) / [3D](https://assetstore.unity.com/lists/top-assets/3d-models)
- [Unreal Marketplace](https://www.unrealengine.com/marketplace/en-US/) — / [Grátis](https://www.unrealengine.com/marketplace/en-US/content?price=free) / [Assets](https://www.unrealengine.com/marketplace/en-US/assets)
- [Kenney Assets](https://kenney.nl/assets) — / [3D](https://kenney.nl/assets/category:3D) / [2D](https://kenney.nl/assets/category:2D)
- [Poly Pizza](https://poly.pizza/) — / [Grátis](https://poly.pizza/) / [Modelos](https://poly.pizza/)
- [Clara.io](https://clara.io/) — / [Biblioteca](https://clara.io/library) / [Visualizador](https://clara.io/viewer)
- [3D Warehouse](https://3dwarehouse.sketchup.com/) — / [SketchUp](https://www.sketchup.com/)
- [Models Resource](https://www.models-resource.com/) — / [Game Models](https://www.models-resource.com/)

**Textures:**
- [Poly Haven](https://polyhaven.com/) — / [HDRIs](https://polyhaven.com/hdris) / [Texturas](https://polyhaven.com/textures)
- [HDRI Haven](https://hdrihaven.com/) — / [Free HDRIs](https://hdrihaven.com/hdris)
- [Texturify](https://www.texturify.com/) — / [Grátis](https://www.texturify.com/free) / [Premium](https://www.texturify.com/)
- [Textures.com](https://www.textures.com/) — / [Grátis](https://www.textures.com/library/free) / [Biblioteca](https://www.textures.com/library)
- [Megascans](https://quixel.com/) — / [Grátis](https://quixel.com/megascans) / [Bridge](https://quixel.com/bridge)
- [AmbientCG](https://ambientcg.com/) — / [Grátis](https://ambientcg.com/) / [Assets](https://ambientcg.com/)
- [CC0 Textures](https://cc0textures.com/) — / [Grátis](https://cc0textures.com/) / [Biblioteca](https://cc0textures.com/all)
- [Pexels](https://www.pexels.com/) — / [3D](https://www.pexels.com/3d-render/) / [Texturas](https://www.pexels.com/textures/)
- [Unsplash](https://unsplash.com/) — / [3D Renders](https://unsplash.com/s/photos/3d-render) / [Texturas](https://unsplash.com/s/photos/texture)

**Materials:**
- [Substance 3D Assets](https://substance3d.adobe.com/assets) — / [Grátis](https://substance3d.adobe.com/assets/free) / [Premium](https://substance3d.adobe.com/assets/all)
- [Marmoset](https://marmoset.co/) — / [Toolbag](https://marmoset.co/toolbag) / [Visualizador](https://marmoset.co/viewer)
- [Material Maker](https://www.materialmaker.org/) — / [GitHub](https://github.com/RodZill4/material-maker)
- [ArmorPaint](https://armorpaint.org/) — / [GitHub](https://github.com/armory3d/armorpaint)
- [AmbientCG](https://ambientcg.com/) — / [Materials](https://ambientcg.com/materials)

### Animação e Rigging

**Ferramentas de Animação:**
- [Mixamo](https://www.mixamo.com/) — / [Rigging Automático](https://www.mixamo.com/) / [Animações](https://www.mixamo.com/user)
- [Cascadeur](https://cascadeur.com/) — / [Física](https://cascadeur.com/) / [AI](https://cascadeur.com/ai-assistant)
- [Rokoko](https://www.rokoko.com/) — / [Motion Capture](https://www.rokoko.com/motion-capture) / [Studio](https://www.rokoko.com/studio)
- [Perception Neuron](https://www.noitom.com/) — / [Mocap](https://www.noitom.com/perception-neuron) / [Studio](https://www.noitom.com/neuron-studio)
- [Vizard](https://www.worldviz.com/) — / [VR](https://www.worldviz.com/) / [Motion](https://www.worldviz.com/products)

**Rigging:**
- [Blender Rigging](https://www.blender.org/features/modeling/) — / [Armature](https://docs.blender.org/manual/en/latest/animation/armatures/) / [Skinning](https://docs.blender.org/manual/en/latest/animation/armatures/skinning/)
- [Maya Rigging](https://www.autodesk.com/products/maya/overview) — / [HumanIK](https://help.autodesk.com/view/MAYAUL/2022/ENU/?guid=GUID-6A4E2753-A684-44F5-8558-CC3465F5C719)
- [Advanced Skeleton](https://www.advancedskeleton.com/) — / [Rigging](https://www.advancedskeleton.com/) / [Rig Automático](https://www.advancedskeleton.com/)

### Computação Gráfica Web

**Bibliotecas WebGL:**
- [Twgl.js](https://twgljs.org/) — / [GitHub](https://github.com/greggman/twgl.js)
- [Pixi.js](https://pixijs.com/) — / [GitHub](https://github.com/pixijs/pixi.js)
- [PlayCanvas](https://playcanvas.com/) — / [GitHub](https://github.com/playcanvas/engine)
- [Babylon.js](https://www.babylonjs.com/) — / [GitHub](https://github.com/BabylonJS/Babylon.js)
- [Three.js](https://threejs.org/) — / [GitHub](https://github.com/mrdoob/three.js)
- [A-Frame](https://aframe.io/) — / [GitHub](https://github.com/aframevr/aframe)
- [X3DOM](https://www.x3dom.org/) — / [GitHub](https://github.com/x3dom/x3dom)
- [Cesium.js](https://cesium.com/) — / [GitHub](https://github.com/CesiumGS/cesium)
- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/) — / [GitHub](https://github.com/mapbox/mapbox-gl-js)
- [Deck.gl](https://deck.gl/) — / [GitHub](https://github.com/visgl/deck.gl)
- [Luma.gl](https://luma.gl/) — / [GitHub](https://github.com/visgl/luma.gl)
- [React VR](https://facebook.github.io/react-vr/) — / [GitHub](https://github.com/facebook/react-vr)

### Ferramentas e Utilitários

**Ferramentas de Textura:**
- [Compressonator](https://gpuopen.com/compressonator/) — / [GitHub](https://github.com/GPUOpen-Tools/compressonator)
- [TexturePacker](https://www.codeandweb.com/texturepacker) — / [Grátis](https://www.codeandweb.com/texturepacker/download)
- [ShaderMap](https://shadermap.com/) — / [Ferramentas](https://shadermap.com/tools)
- [Materialize](https://boundingboxsoftware.com/materialize/) — / [GitHub](https://github.com/BoundingboxSoftware/Materialize)
- [NormalMap-Online](https://cpetry.github.io/NormalMap-Online/) — / [GitHub](https://github.com/cpetry/NormalMap-Online)

**Ferramentas de Modelo:**
- [MeshLab](https://www.meshlab.net/) — / [GitHub](https://github.com/cnr-isti-vclab/meshlab)
- [Blender](https://www.blender.org/) — / [GitHub](https://github.com/blender/blender)
- [Meshroom](https://alicevision.org/) — / [GitHub](https://github.com/alicevision/Meshroom)
- [Instant Meshes](https://github.com/wjakob/instant-meshes) — / [Download](https://github.com/wjakob/instant-meshes/releases)
- [ZRemesher](https://www.maxon.net/en/zremesher) — / [Documentação](https://docs.maxon.net/)

**Ferramentas de Baking:**
- [Knald](https://knaldtech.com/) — / [Baking](https://knaldtech.com/knald)
- [xNormal](https://www.xnormal.net/) — / [Download](https://www.xnormal.net/Downloads.php)
- [Handplane Baker](https://renderhjs.net/) — / [Ferramentas](https://renderhjs.net/tools/baker/)
- [Texture Baking](https://www.polycount.com/) — / [Tutoriais](https://www.polycount.com/)

### Recursos de Aprendizado

**Cursos:**
- [Udemy Computer Graphics](https://www.udemy.com/topic/computer-graphics/) — / [3D](https://www.udemy.com/topic/3d-modeling/) / [Game Dev](https://www.udemy.com/topic/game-development/)
- [Coursera Computer Graphics](https://www.coursera.org/browse/computer-science/computer-graphics) — / [Grátis](https://www.coursera.org/browse/free/computer-science) / [Pago](https://www.coursera.org/browse/computer-science/computer-graphics)
- [edX Computer Graphics](https://www.edx.org/learn/computer-graphics) — / [Grátis](https://www.edx.org/course/subject-computer-science) / [MIT](https://www.edx.org/school/mitx)
- [Pluralsight Graphics](https://www.pluralsight.com/browse/software-development/graphics) — / [3D](https://www.pluralsight.com/browse/software-development/graphics-3d)
- [LinkedIn Learning Graphics](https://www.linkedin.com/learning/topics/computer-graphics) — / [3D](https://www.linkedin.com/learning/topics/3d-animation)
- [Udacity Graphics](https://www.udacity.com/course/computer-graphics--cs291) — / [Grátis](https://www.udacity.com/course)
- [YouTube Graphics](https://www.youtube.com/results?search_query=computer+graphics) — / [OpenGL](https://www.youtube.com/results?search_query=opengl) / [Vulkan](https://www.youtube.com/results?search_query=vulkan)

**Books:**
- [Amazon Graphics Books](https://www.amazon.com/s?k=computer+graphics) — / [Kindle](https://www.amazon.com/s?k=computer+graphics&i=digital-text) / [Hardcover](https://www.amazon.com/s?k=computer+graphics&i=stripbooks)
- [CRC Press Graphics](https://www.routledge.com/computer-science/computer-graphics/) — / [Textbooks](https://www.routledge.com/search?search=computer+graphics)
- [Morgan Kaufmann Graphics](https://www.elsevier.com/books-and-journals/books-and-book-series/morgan-kaufmann) — / [Series](https://www.elsevier.com/books-and-journals/books-and-book-series)
- [Springer Graphics](https://link.springer.com/search?query=computer+graphics) — / [EBooks](https://link.springer.com/search?query=computer+graphics&facet-content-type=%22Book%22)

### Recursos da Indústria

**Standards Bodies:**
- 🌐 [Khronos Group](https://www.khronos.org/) — / [OpenGL](https://www.khronos.org/opengl/) / [Vulkan](https://www.khronos.org/vulkan/) / [WebGL](https://www.khronos.org/webgl/)
- 🌐 [W3C WebGPU](https://www.w3.org/TR/webgpu/) — / [WGSL](https://www.w3.org/TR/WGSL/) / [Comunidade](https://www.w3.org/community/groups/wgpu/)
- [Microsoft DirectX](https://docs.microsoft.com/windows/win32/directx) — / [Documentação](https://docs.microsoft.com/windows/win32/directx) / [GitHub](https://github.com/microsoft/DirectX-Graphics-Samples)
- [Apple Metal](https://developer.apple.com/metal/) — / [Documentação](https://developer.apple.com/documentation/metal) / [Exemplos](https://developer.apple.com/metal/sample-code/)

**Research:**
- [SIGGRAPH](https://www.siggraph.org/) — / [Artigos](https://dl.acm.org/conference/siggraph) / [Cursos](https://www.siggraph.org/learn/)
- [Eurographics](https://www.eg.org/) — / [Pesquisa](https://www.eg.org/) / [Eventos](https://www.eg.org/events)
- [arXiv Graphics](https://arxiv.org/list/cs.GR/recent) — / [Artigos](https://arxiv.org/archive/cs.GR) / [Recent](https://arxiv.org/list/cs.GR/recent)
- [NVIDIA Research](https://research.nvidia.com/) — / [Publicações](https://research.nvidia.com/publications) / [Projects](https://research.nvidia.com/)
- [Google Research](https://research.google/) — / [Gráficos](https://research.google/pubs/ComputerGraphics37.html) / [Vision](https://research.google/pubs/ComputerVision46.html)
- [Adobe Research](https://www.adobe.com/research.html) — / [Gráficos](https://www.adobe.com/research/areas/graphics.html) / [Imaging](https://www.adobe.com/research/areas/imaging.html)
- [Disney Research](https://www.disneyresearch.com/) — / [Gráficos](https://www.disneyresearch.com/publication) / [Animation](https://www.disneyresearch.com/publication)

### Specialized Topics

**Ray Tracing:**
- [Ray Tracing in One Weekend](https://raytracing.github.io/) — / [Livro](https://raytracing.github.io/books/RayTracingInOneWeekend.html) / [Código](https://github.com/RayTracing/raytracing.github.io)
- [NVIDIA RTX](https://www.nvidia.com/pt-br/geforce/technologies/ray-tracing/) — / [SDK](https://developer.nvidia.com/rtx/ray-tracing) / [Exemplos](https://developer.nvidia.com/rtx/ray-tracing)
- [AMD Ray Tracing](https://gpuopen.com/) — / [Documentação](https://gpuopen.com/) / [Exemplos](https://github.com/GPUOpen-LibrariesAndSDKs/RadeonRays_SDK)
- [Intel Embree](https://www.embree.org/) — / [GitHub](https://github.com/embree/embree) / [Documentação](https://www.embree.org/documentation.html)

**Machine Learning em Computação Gráfica:**
- [NVIDIA AI](https://www.nvidia.com/ai/) — / [DLSS](https://www.nvidia.com/pt-br/geforce/technologies/dlss/) / [Reflex](https://www.nvidia.com/pt-br/geforce/technologies/nvidia-reflex/)
- [TensorFlow Graphics](https://www.tensorflow.org/guide/graphic_compilation) — / [GitHub](https://github.com/tensorflow/graphics)
- [PyTorch3D](https://pytorch3d.org/) — / [GitHub](https://github.com/facebookresearch/pytorch3d) / [Documentação](https://pytorch3d.readthedocs.io/)
- [Kaolin](https://kaolin.ai/) — / [GitHub](https://github.com/NVIDIAGameWorks/kaolin) / [Documentação](https://kaolin.readthedocs.io/)

**VR/AR:**
- [OpenXR](https://www.khronos.org/openxr/) — / [Especificação](https://www.khronos.org/registry/OpenXR/specs/1.0/html/) / [SDK](https://github.com/KhronosGroup/OpenXR-SDK)
- [WebXR](https://immersiveweb.dev/) — / [API](https://www.w3.org/TR/webxr/) / [Exemplos](https://immersive-web.github.io/webxr-samples/)
- [SteamVR](https://store.steampowered.com/steamvr) — / [Documentação](https://github.com/ValveSoftware/openvr) / [GitHub](https://github.com/ValveSoftware/openvr)
- [Oculus SDK](https://developer.oculus.com/) — / [Native](https://developer.oculus.com/native/) / [Web](https://developer.oculus.com/web/)
- [AR Foundation](https://docs.unity3d.com/Packages/com.unity.xr.arfoundation@latest) — / [Unity](https://docs.unity3d.com/Packages/com.unity.xr.arfoundation@latest)
- [ARCore](https://developers.google.com/ar) — / [Android](https://developers.google.com/ar) / [Unity](https://developers.google.com/ar/unity)
- [ARKit](https://developer.apple.com/augmented-reality/) — / [iOS](https://developer.apple.com/augmented-reality/arkit/) / [RealityKit](https://developer.apple.com/documentation/realitykit)

### Search & Discovery

**Search Engines:**
- [Google Scholar](https://scholar.google.com/) — / [Gráficos](https://scholar.google.com/scholar?q=computer+graphics)
- [arXiv](https://arxiv.org/) — / [Gráficos](https://arxiv.org/list/cs.GR/recent) / [Vision](https://arxiv.org/list/cs.CV/recent)
- [Semantic Scholar](https://www.semanticscholar.org/) — / [Gráficos](https://www.semanticscholar.org/search?q=computer+graphics)
- [ResearchGate](https://www.researchgate.net/) — / [Gráficos](https://www.researchgate.net/search?q=computer+graphics)
- [DBLP](https://dblp.org/) — / [Gráficos](https://dblp.org/search?q=computer+graphics)

**Fóruns e Comunidades:**
- [Reddit r/ComputerGraphics](https://www.reddit.com/r/computergraphics/) — / [OpenGL](https://www.reddit.com/r/opengl/) / [Vulkan](https://www.reddit.com/r/vulkan/)
- [Stack Overflow Graphics](https://stackoverflow.com/questions/tagged/computer-graphics) — / [OpenGL](https://stackoverflow.com/questions/tagged/opengl) / [Three.js](https://stackoverflow.com/questions/tagged/three.js)
- [GameDev.net](https://www.gamedev.net/) — / [Fóruns](https://www.gamedev.net/forums/) / [Artigos](https://www.gamedev.net/articles/)
- [Polycount](https://polycount.com/) — / [Fórum](https://polycount.com/forum/) / [Tutoriais](https://polycount.com/tutorials)
- [Blender Artists](https://blenderartists.org/) — / [Fórum](https://blenderartists.org/forum/) / [Recursos](https://blenderartists.org/resources/)
- [CGSociety](https://forums.cgsociety.org/) — / [Galeria](https://forums.cgsociety.org/) / [Jobs](https://forums.cgsociety.org/forumdisplay.php?f=231)

### News & Updates

**News Sites:**
- [Gamasutra](https://www.gamasutra.com/) — / [Notícias](https://www.gamasutra.com/news/) / [Blogs](https://www.gamasutra.com/blogs/)
- [Game Developer](https://www.gamedeveloper.com/) — / [Gráficos](https://www.gamedeveloper.com/graphics) / [Tech](https://www.gamedeveloper.com/technology)
- [GPU Open](https://gpuopen.com/) — / [Blog](https://gpuopen.com/news/) / [Notícias](https://gpuopen.com/news/)
- [NVIDIA Developer](https://developer.nvidia.com/) — / [Blog](https://developer.nvidia.com/blog/) / [Notícias](https://developer.nvidia.com/blog/)
- [Intel Graphics](https://www.intel.com/content/www/us/en/docs/) — / [Dev](https://www.intel.com/content/www/us/en/developer/topic-technology.html)
- [Khronos News](https://www.khronos.org/news/) — / [Press](https://www.khronos.org/news/press-releases) / [Eventos](https://www.khronos.org/news/events)

**Blogs:**
- [NVIDIA Blog](https://developer.nvidia.com/blog/) — / [Gráficos](https://developer.nvidia.com/blog/) / [RTX](https://developer.nvidia.com/blog/tag/rtx/)
- [AMD GPUOpen](https://gpuopen.com/news/) — / [Gráficos](https://gpuopen.com/news/) / [Open Source](https://gpuopen.com/news/)
- [Intel Graphics](https://www.intel.com/content/www/us/en/developer/articles/) — / [Gráficos](https://www.intel.com/content/www/us/en/developer/articles/graphics.html)
- [Google Graphics](https://research.google/pubs/ComputerGraphics37.html) — / [Publicações](https://research.google/pubs/ComputerGraphics37.html)
- [Three.js Blog](https://threejs.org/) — / [Notícias](https://threejs.org/) / [Releases](https://threejs.org/)

### Ferramentas de Desenvolvimento

**IDEs & Editors:**
- [Visual Studio](https://visualstudio.microsoft.com/) — / [Código](https://code.visualstudio.com/) / [Comunidade](https://visualstudio.microsoft.com/vs/community/)
- [CLion](https://www.jetbrains.com/clion/) — / [C++](https://www.jetbrains.com/clion/) / [CMake](https://www.jetbrains.com/clion/cmake/)
- [Qt Creator](https://www.qt.io/product/development-tools) — / [Qt](https://www.qt.io/) / [Designer](https://www.qt.io/qt-5/qtdesigner-manual.html)
- [Xcode](https://developer.apple.com/xcode/) — / [Metal](https://developer.apple.com/metal/) / [Swift](https://developer.apple.com/swift/)
- [VS Code](https://code.visualstudio.com/) — / [C++](https://code.visualstudio.com/docs/languages/cpp) / [Extensões](https://marketplace.visualstudio.com/)

**Debugging:**
- [RenderDoc](https://renderdoc.org/) — / [GitHub](https://github.com/baldurk/renderdoc) / [Documentação](https://renderdoc.org/docs/)
- [NVIDIA Nsight](https://developer.nvidia.com/nsight-graphics/) — / [Download](https://developer.nvidia.com/nsight-graphics/) / [Documentação](https://developer.nvidia.com/nsight-graphics)
- [AMD Radeon GPU Profiler](https://gpuopen.com/rgp/) — / [Download](https://gpuopen.com/rgp/) / [Documentação](https://gpuopen.com/rgp/)
- [Intel Graphics Performance Analyzers](https://www.intel.com/content/www/us/en/developer/tools/graphics-performance-analyzers/overview.html) — / [GPA](https://www.intel.com/content/www/us/en/developer/tools/graphics-performance-analyzers/overview.html)
- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/) — / [Performance](https://developers.google.com/web/tools/chrome-devtools/performance) / [WebGL](https://developers.google.com/web/tools/chrome-devtools/javascript/webgl-inspector)

**Build Systems:**
- [CMake](https://cmake.org/) — / [Documentação](https://cmake.org/documentation/) / [GitHub](https://github.com/Kitware/CMake)
- [Premake](https://premake.github.io/) — / [Documentação](https://premake.github.io/docs/) / [GitHub](https://github.com/premake/premake-core)
- [Meson](https://mesonbuild.com/) — / [Documentação](https://mesonbuild.com/Tutorial.html) / [GitHub](https://github.com/mesonbuild/meson)
- [Bazel](https://bazel.build/) — / [Documentação](https://bazel.build/concepts) / [GitHub](https://github.com/bazelbuild/bazel)
- [Make](https://www.gnu.org/software/make/) — / [Documentação](https://www.gnu.org/software/make/manual/) / [Tutorial](https://www.gnu.org/software/make/manual/)

### Recursos Acadêmicos

**Universities:**
- [MIT Computer Graphics](https://groups.csail.mit.edu/graphics/) — / [Cursos](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/) / [Pesquisa](https://groups.csail.mit.edu/graphics/)
- [Stanford Graphics](https://graphics.stanford.edu/) — / [Cursos](https://graphics.stanford.edu/courses/) / [Publicações](https://graphics.stanford.edu/pubs/)
- [UC Berkeley Graphics](https://graphics.berkeley.edu/) — / [Cursos](https://graphics.berkeley.edu/courses/) / [Pesquisa](https://graphics.berkeley.edu/publications/)
- [Cornell Graphics](https://www.graphics.cornell.edu/) — / [Cursos](https://www.graphics.cornell.edu/courses/) / [Pesquisa](https://www.graphics.cornell.edu/research/)
- [ETH Zurich Graphics](https://graphics.ethz.ch/) — / [Cursos](https://graphics.ethz.ch/education/) / [Pesquisa](https://graphics.ethz.ch/research/)
- [UNC Graphics](https://cs.unc.edu/research/graphics/) — / [Cursos](https://cs.unc.edu/academics/) / [Pesquisa](https://cs.unc.edu/research/graphics/)

**Cursos Online:**
- [edX Graphics](https://www.edx.org/learn/computer-graphics) — / [MIT](https://www.edx.org/school/mitx) / [Harvard](https://www.edx.org/school/harvardx)
- [Coursera Graphics](https://www.coursera.org/browse/computer-science/computer-graphics) — / [Grátis](https://www.coursera.org/browse/free/computer-science) / [Certificates](https://www.coursera.org/browse/computer-science/computer-graphics)
- [Udacity Graphics](https://www.udacity.com/course/computer-graphics--cs291) — / [Grátis](https://www.udacity.com/course) / [Pago](https://www.udacity.com/course)
- [Khan Academy Linear Algebra](https://www.khanacademy.org/math/linear-algebra) — / [Matrizes](https://www.khanacademy.org/math/linear-algebra/matrix-transformations) / [Vetores](https://www.khanacademy.org/math/linear-algebra/vectors-and-spaces)

### Computação Gráfica Mobile

**Mobile APIs:**
- [OpenGL ES](https://www.khronos.org/opengles/) — / [Especificações](https://www.khronos.org/opengles/specs/) / [Referência](https://www.khronos.org/opengles/sdk/tools/Reference-Manual/)
- [Vulkan Mobile](https://www.khronos.org/vulkan/) — / [Guia](https://github.com/KhronosGroup/Vulkan-Guide) / [Exemplos](https://github.com/KhronosGroup/Vulkan-Samples)
- [Metal iOS](https://developer.apple.com/metal/) — / [iOS](https://developer.apple.com/documentation/metal) / [Documentação](https://developer.apple.com/documentation/metal)
- [Direct3D Mobile](https://docs.microsoft.com/windows/win32/direct3d12) — / [UWP](https://docs.microsoft.com/windows/uwp/) / [Xbox](https://docs.microsoft.com/windows/win32/direct3d12)

**Motores para Mobile:**
- [Unity Mobile](https://unity.com/mobile) — / [iOS](https://unity.com/unity/mobile/ios) / [Android](https://unity.com/unity/mobile/android)
- [Unreal Mobile](https://www.unrealengine.com/mobile-game-development) — / [iOS](https://www.unrealengine.com/mobile-game-development/ios) / [Android](https://www.unrealengine.com/mobile-game-development/android)
- [Godot Mobile](https://docs.godotengine.org/3.x/tutorials/export/exporting_for_android.html) — / [Android](https://docs.godotengine.org/3.x/tutorials/export/exporting_for_android.html) / [iOS](https://docs.godotengine.org/3.x/tutorials/export/exporting_for_ios.html)
- [Cocos2d-x Mobile](https://www.cocos2d-x.org/) — / [iOS](https://www.cocos2d-x.org/docs/sdk/en/edit-cocos2d-x.html) / [Android](https://www.cocos2d-x.org/docs/sdk/en/edit-cocos2d-x.html)

### Localization & I18n

**Recursos Internacionais:**
- [LearnOpenGL 简体中文](https://learnopengl-cn.github.io/) — / [GitHub](https://github.com/LearnOpenGL-CN/LearnOpenGL-CN)
- [LearnOpenGL 繁體中文](https://learnopengl-cn.github.io/) — / [GitHub](https://github.com/JoeyDeVries/LearnOpenGL)
- [Vulkan Tutorial 中文](https://vulkan-tutorial.com/) — / [GitHub](https://github.com/Overv/VulkanTutorial)
- [Three.js 中文](https://threejs.org.cn/) — / [Documentação](https://threejs.org.cn/docs/) / [Exemplos](https://threejs.org.cn/examples/)
- [Blender 中文](https://docs.blender.org.cn/) — / [Documentação](https://docs.blender.org.cn/manual/) / [Tutoriais](https://docs.blender.org.cn/tutorials/)

### Security & Optimization

**Security:**
- [Vulkan Security](https://github.com/KhronosGroup/Vulkan-Guide) — / [Boas Práticas](https://github.com/KhronosGroup/Vulkan-Guide)
- [WebGL Security](https://www.khronos.org/webgl/wiki/) — / [Segurança](https://www.khronos.org/webgl/wiki/Security)
- [OpenGL Security](https://www.khronos.org/opengl/wiki/) — / [Segurança](https://www.khronos.org/opengl/wiki/OpenGL_Context)

**Optimization:**
- [NVIDIA GPU Gems](https://developer.nvidia.com/gpugems/) — / [GPU Pro](https://www.realtimerendering.com/) / [Livros](https://developer.nvidia.com/gpugems/gpugems/part-i-natural-effects/chapter-1-effective-water-simulation-physical-models)
- [AMD GPUOpen](https://gpuopen.com/) — / [Optimization](https://gpuopen.com/learn/) / [Ferramentas](https://gpuopen.com/tools/)
- [Intel Optimization](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-graphics-performance-analyzers.html) — / [GPA](https://www.intel.com/content/www/us/en/developer/tools/graphics-performance-analyzers/overview.html) / [Documentação](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-graphics-performance-analyzers.html)

---

*Última atualização: 2026-08-31*  
*Este índice curado segue o modelo FMHY para organizar recursos de referência sobre computação gráfica e renderização.*