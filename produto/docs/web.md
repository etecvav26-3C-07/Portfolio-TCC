---
title: Web e Computação Gráfica
sidebar_label: Web
description: Gráficos na web com WebGL, WebGPU, Three.js e Babylon.js — demos ao vivo.
---

<script setup>
import CanvasPanel from "./.vitepress/components/CanvasPanel.vue";
import ThreePanel from "./.vitepress/components/ThreePanel.vue";
import WebGLPanel from "./.vitepress/components/WebGLPanel.vue";
import WebGPUPanel from "./.vitepress/components/WebGPUPanel.vue";
import BabylonPanel from "./.vitepress/components/BabylonPanel.vue";
import sketchWebgpuPipeline from "./.vitepress/components/animations/canvas_webgpu_pipeline.js";
import sketchThreejsScene from "./.vitepress/components/animations/canvas_threejs_scene.js";
import sketchR3f from "./.vitepress/components/animations/canvas_r3f.js";
import sketchAframe from "./.vitepress/components/animations/canvas_aframe.js";
import sketchPlaycanvas from "./.vitepress/components/animations/canvas_playcanvas.js";
import sketchMapbox from "./.vitepress/components/animations/canvas_mapbox.js";
import sketchPixijs from "./.vitepress/components/animations/canvas_pixijs.js";
import sketchPhaser from "./.vitepress/components/animations/canvas_phaser.js";
import sketchP5js from "./.vitepress/components/animations/canvas_p5js.js";
import sketchD3Graph from "./.vitepress/components/animations/canvas_d3_graph.js";
import sketchDeckgl from "./.vitepress/components/animations/canvas_deckgl.js";
import sketchChartjs from "./.vitepress/components/animations/canvas_chartjs.js";
</script>

# Web

Na web você escolhe o nível da pilha: **WebGL** e **WebGPU** falam com a GPU; **Three.js** e **Babylon.js** montam cena, câmera, luz e materiais por cima.

## WebGL

WebGL 2 expõe OpenGL ES 3 no canvas. O exemplo usa shaders GLSL, buffers e uma matriz MVP — o mesmo modelo da página de OpenGL.

<WebGLPanel
  title="WebGL 2"
  subtitle="API nativa do canvas: programa GLSL, atributos e drawElements."
/>

- ⭐ [WebGL Fundamentals](https://webglfundamentals.org/) — guia completo da API WebGL do zero — / [Documentação](https://webglfundamentals.org/) / [GitHub](https://github.com/greggman/webgl-fundamentals)
- 🌐 [MDN WebGL](https://developer.mozilla.org/pt-BR/docs/Web/API/WebGL_API) — documentação oficial — / [WebGL](https://developer.mozilla.org/pt-BR/docs/Web/API/WebGL_API) / [WebGL2](https://developer.mozilla.org/pt-BR/docs/Web/API/WebGL2_API)

## WebGPU

WebGPU é a API moderna (filas, pipelines, WGSL). Mais próxima do Vulkan/D3D12/Metal do que do OpenGL.

<WebGPUPanel
  title="WebGPU + WGSL"
  subtitle="Device, render pipeline e command encoder. Se o cubo não aparecer, o navegador ainda não expõe navigator.gpu."
/>

<CanvasPanel
  :sketch="sketchWebgpuPipeline"
  title="WebGPU: Pipeline e Arquitetura"
  subtitle="Ponto de entrada navigator.gpu, adapter, device lógico, command encoder e submissão na queue."
/>

- ⭐ [WebGPU Fundamentals](https://webgpufundamentals.org/) — guia moderno da API WebGPU — / [Documentação](https://webgpufundamentals.org/) / [GitHub](https://github.com/gfxfundamentals/webgpufundamentals)
- 🌐 [W3C WGSL Spec](https://www.w3.org/TR/WGSL/) — especificação oficial da linguagem de shader — / [Especificação](https://www.w3.org/TR/WGSL/)
- [WebGPU Samples](https://webgpu.github.io/webgpu-samples/) — exemplos interativos oficiais — / [GitHub](https://github.com/webgpu/webgpu-samples) / [Demos](https://webgpu.github.io/webgpu-samples/)

## Three.js

Three.js é a biblioteca 3D mais usada na web. A cena abaixo combina o canvas tridimensional interativo (com nó central, satélites em órbita, wireframe comutável e campo de estrelas) com o diagrama didático 2D da árvore Scenegraph.

<ThreePanel
  topic="threejs"
  title="Cena Three.js Interativa em Tempo Real"
  subtitle="Torus knot com satélites poliédricos em órbita, rotação com inércia e wireframe dinâmico."
/>

<CanvasPanel
  :sketch="sketchThreejsScene"
  title="Diagrama Didático 2D: Scenegraph e Hierarquia"
  subtitle="Hierarquia em árvore contendo Camera, DirectionalLight e Mesh (composta por Geometry e Material)."
/>

- ⭐ [Three.js](https://threejs.org/) — a biblioteca 3D mais usada na web — / [Documentação](https://threejs.org/docs/) / [Exemplos](https://threejs.org/examples/) / [GitHub](https://github.com/mrdoob/three.js) / [Editor](https://threejs.org/editor/)
- ⭐ [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) — Three.js com componentes React — / [Documentação](https://docs.pmnd.rs/react-three-fiber) / [GitHub](https://github.com/pmndrs/react-three-fiber) / [Ejemplos](https://docs.pmnd.rs/react-three-fiber/getting-started/examples)

## Babylon.js

Babylon.js é uma engine completa (cena, câmera, materiais, loop de render). O knot abaixo é o runtime oficial, carregado no cliente.

<BabylonPanel
  title="Babylon.js (WebGL)"
  subtitle="Torus knot, luz pontual em órbita e câmera girando."
/>

<BabylonPanel
  title="Babylon.js + WebGPU"
  subtitle="Mesma cena com WebGPUEngine quando o navegador expõe navigator.gpu."
  :preferWebGPU="true"
/>

- ⭐ [Babylon.js](https://www.babylonjs.com/) — engine 3D web completa da Microsoft — / [Documentação](https://doc.babylonjs.com/) / [Playground](https://playground.babylonjs.com/) / [GitHub](https://github.com/BabylonJS/Babylon.js) / [Fórum](https://forum.babylonjs.com/)
- [Babylon Playground](https://playground.babylonjs.com/) — ambiente de experimentos online — / [Playground](https://playground.babylonjs.com/) / [Snippets](https://playground.babylonjs.com/#)


## Bibliotecas e Frameworks com Demos

### Frameworks Web 3D

#### React Three Fiber (R3F)
> Ecossistema declarativo que traz o Three.js para o paradigma de componentes e hooks do React (`@react-three/fiber`, `@react-three/drei`).

<ThreePanel
  topic="r3f"
  title="Átomo Declarativo R3F 3D"
  subtitle="Grafo de componentes reativos conectando hooks de estado ao runtime Three.js."
/>

<CanvasPanel
  :sketch="sketchR3f"
  title="Diagrama Didático 2D: Reconciliação JSX do R3F"
  subtitle="Nós reativos declarativos via JSX reconciliados diretamente para instâncias Three.js."
/>

- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) — / [Documentação](https://docs.pmnd.rs/react-three-fiber) / [GitHub](https://github.com/pmndrs/react-three-fiber) / [Drei](https://github.com/pmndrs/drei) / [Tutoriais](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) / [Comunidade](https://discord.gg/pmndrs)

#### A-Frame (WebXR & VR)
> Framework baseado em Entity-Component-System (ECS) para construção de experiências de Realidade Virtual e Aumentada no navegador.

<CanvasPanel
  :sketch="sketchAframe"
  title="A-Frame (WebXR / Realidade Virtual)"
  subtitle="Arquitetura desacoplada de Entidades, Componentes e Sistemas (ECS) para experiências espaciais."
/>

- [A-Frame](https://aframe.io/) — / [Documentação](https://aframe.io/docs/) / [GitHub](https://github.com/aframevr/aframe) / [Exemplos](https://aframe.io/examples/) / [Comunidade](https://aframe.io/community/)

#### PlayCanvas
> Engine de jogos WebGL/WebGPU completa na nuvem, com física rígida em tempo real, editor colaborativo e suporte mobile de alto desempenho.

<CanvasPanel
  :sketch="sketchPlaycanvas"
  title="PlayCanvas (Web Game Engine)"
  subtitle="Loop de jogo contínuo: Entrada → Simulação Física (Ammo.js) → Renderizador WebGL/WebGPU."
/>

- [PlayCanvas](https://playcanvas.com/) — / [Documentação](https://developer.playcanvas.com/) / [GitHub](https://github.com/playcanvas/engine) / [Editor](https://playcanvas.com/editor) / [Comunidade](https://forum.playcanvas.com/) / [YouTube](https://www.youtube.com/@PlayCanvas)

#### Mapbox GL JS
> Renderizador de mapas geoespaciais vetoriais com extrusão 3D de edifícios urbanos, camadas de tráfego e visualização de terreno.

<CanvasPanel
  :sketch="sketchMapbox"
  title="Mapbox GL JS (3D Geospatial)"
  subtitle="Particionamento de dados geoespaciais em quadtrees e projeção Web Mercator."
/>

- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/) — / [Documentação](https://docs.mapbox.com/mapbox-gl-js/) / [GitHub](https://github.com/mapbox/mapbox-gl-js) / [Exemplos](https://docs.mapbox.com/mapbox-gl-js/examples/) / [Comunidade](https://www.mapbox.com/community/)

---

### Frameworks Web 2D

#### PixiJS
> O motor de renderização 2D mais rápido da web, utilizando lote de sprites (*Sprite Batching*) com aceleração direta por hardware WebGL.

<CanvasPanel
  :sketch="sketchPixijs"
  title="PixiJS (Sprite Batching 2D)"
  subtitle="Mais de 100 sprites agrupados na mesma textura e renderizados em 1 única Draw Call."
/>

- [PixiJS](https://pixijs.com/) — / [Documentação](https://pixijs.io/docs/) / [GitHub](https://github.com/pixijs/pixi.js) / [Exemplos](https://pixijs.io/examples/) / [Comunidade](https://discord.gg/pixijs)

#### Phaser
> Framework completo para desenvolvimento de jogos 2D no navegador com gerenciador de física (Arcade/Matter), áudio, spritesheets e mapas de azulejos (Tilemaps).

<CanvasPanel
  :sketch="sketchPhaser"
  title="Phaser (2D Game Framework)"
  subtitle="Física Arcade 2D com vetores de gravidade e teste de colisão por AABB."
/>

- [Phaser](https://phaser.io/) — / [Documentação](https://newdocs.phaser.io/docs/3.87.0) / [GitHub](https://github.com/photonstorm/phaser) / [Exemplos](https://phaser.io/examples) / [Comunidade](https://phaser.io/community)
- [MelonJS](https://melonjs.org/) — / [Documentação](https://melonjs.org/docs/) / [GitHub](https://github.com/melonjs/melonJS) / [Exemplos](https://melonjs.org/examples/)
- [Konva.js](https://konvajs.org/) — / [Documentação](https://konvajs.org/docs) / [GitHub](https://github.com/konvajs/konva) / [Exemplos](https://konvajs.org/docs/sandbox/)
- [Fabric.js](https://fabricjs.com/) — / [Documentação](https://fabricjs.com/docs/) / [GitHub](https://github.com/fabricjs/fabric.js) / [Exemplos](https://fabricjs.com/kitchensink/)
- [Paper.js](https://paperjs.org/) — / [Documentação](https://paperjs.org/) / [GitHub](https://github.com/paperjs/paper.js) / [Exemplos](http://paperjs.org/)
- [Two.js](https://two.js.org/) — / [Documentação](https://two.js.org/) / [GitHub](https://github.com/jonobr1/two.js) / [Exemplos](https://two.js.org/examples/)

#### P5.js (Creative Coding)
> Biblioteca voltada para arte generativa, design de interação e educação artística, inspirada na filosofia do Processing.

<CanvasPanel
  :sketch="sketchP5js"
  title="P5.js (Creative Coding & Generative Art)"
  subtitle="Curvas matemáticas paramétricas de Lissajous geradas no ciclo setup() e draw()."
/>

- [P5.js](https://p5js.org/) — / [Documentação](https://p5js.org/) / [GitHub](https://github.com/processing/p5.js) / [Exemplos](https://p5js.org/examples/) / [Comunidade](https://p5js.org/community/) / [YouTube](https://www.youtube.com/@TheCodingTrain)

---

### Bibliotecas de Visualização de Dados (Data Viz)

#### D3.js (Data-Driven Documents)
> A biblioteca padrão da indústria para manipulação do DOM e geração de gráficos vetoriais impulsionados por dados, grafos de força e mapas.

<CanvasPanel
  :sketch="sketchD3Graph"
  title="D3.js (Force-Directed Graph 3D)"
  subtitle="Equilíbrio dinâmico entre atração de elos e repulsão de cargas em simulação física."
/>

- [D3.js](https://d3js.org/) — / [Documentação](https://d3js.org/what-is-d3) / [GitHub](https://github.com/d3/d3) / [Exemplos](https://observablehq.com/@d3/gallery) / [Comunidade](https://d3js.org/) / [YouTube](https://www.youtube.com/results?search_query=d3js)

#### Deck.gl (Uber Open Source)
> Framework de visualização em grande escala construído sobre WebGL/WebGPU para análise espacial de milhões de pontos e dados geoespaciais em tempo real.

<CanvasPanel
  :sketch="sketchDeckgl"
  title="Deck.gl (HexagonLayer & ArcLayer 3D)"
  subtitle="Camadas de agregação hexagonal e arcos de fluxo de dados acelerados por GPU."
/>

- [Deck.gl](https://deck.gl/) — / [Documentação](https://deck.gl/) / [GitHub](https://github.com/visgl/deck.gl) / [Exemplos](https://deck.gl/examples) / [Comunidade](https://github.com/visgl/deck.gl) / [YouTube](https://www.youtube.com/results?search_query=deckgl)
- [Luma.gl](https://luma.gl/) — / [Documentação](https://luma.gl/) / [GitHub](https://github.com/visgl/luma.gl) / [Exemplos](https://luma.gl/examples)
- [Vis.gl](https://vis.gl/) — / [Documentação](https://vis.gl/) / [GitHub](https://github.com/visgl) / [Exemplos](https://vis.gl/examples)
- [Plotly](https://plotly.com/) — / [Documentação](https://plotly.com/) / [GitHub](https://github.com/plotly/plotly.js) / [Exemplos](https://plotly.com/)
- [Bokeh](https://bokeh.org/) — / [Documentação](https://docs.bokeh.org/) / [GitHub](https://github.com/bokeh/bokeh) / [Exemplos](https://bokeh.org/)

#### Chart.js
> Biblioteca amigável e amplamente adotada para criação de painéis e dashboards gráficos modernos.

<CanvasPanel
  :sketch="sketchChartjs"
  title="Chart.js (Dashboard & Gráficos 2D)"
  subtitle="Barras métricas animadas com interpolação contínua em Canvas 2D."
/>

- [Chart.js](https://www.chartjs.org/) — / [Documentação](https://www.chartjs.org/docs/) / [GitHub](https://github.com/chartjs/Chart.js) / [Exemplos](https://www.chartjs.org/docs/latest/samples/) / [Comunidade](https://www.chartjs.org/docs/latest/) / [YouTube](https://www.youtube.com/results?search_query=chartjs)

## Principais Recomendações

- ⭐ [Three.js](https://threejs.org/) — melhor para começar em 3D web — / [Documentação](https://threejs.org/docs/) / [Exemplos](https://threejs.org/examples/) / [GitHub](https://github.com/mrdoob/three.js) / [Tutoriais](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) / [Comunidade](https://threejs.org/) / [YouTube](https://www.youtube.com/@threejs)
- ⭐ [WebGPU Fundamentals](https://webgpufundamentals.org/) — melhor referência moderna — / [Documentação](https://webgpufundamentals.org/) / [GitHub](https://github.com/gfxfundamentals/webgpufundamentals) / [WGSL](https://www.w3.org/TR/WGSL/) / [Exemplos](https://webgpufundamentals.org/webgpu-lessons.html)
- ⭐ [Babylon.js](https://www.babylonjs.com/) — ótimo para projetos maiores — / [Documentação](https://doc.babylonjs.com/) / [Playground](https://playground.babylonjs.com/) / [GitHub](https://github.com/BabylonJS/Babylon.js) / [Tutoriais](https://doc.babylonjs.com/journey/) / [Comunidade](https://forum.babylonjs.com/) / [YouTube](https://www.youtube.com/@babylonjs)
- ⭐ [WebGL Fundamentals](https://webglfundamentals.org/) — base essencial — / [Documentação](https://webglfundamentals.org/) / [GitHub](https://github.com/greggman/webgl-fundamentals) / [Tutoriais](https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html) / [Exemplos](https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html)

---


### WebGL & WebGPU

**Recursos de WebGL:**
- [WebGL Fundamentals](https://webglfundamentals.org/) — / [WebGL](https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html) / [WebGL2](https://webgl2fundamentals.org/) / [GitHub](https://github.com/greggman/webgl-fundamentals) / [Tutoriais](https://webglfundamentals.org/webgl/lessons/)
- [WebGL2 Fundamentals](https://webgl2fundamentals.org/) — / [Documentação](https://webgl2fundamentals.org/) / [GitHub](https://github.com/greggman/webgl2-fundamentals) / [Tutoriais](https://webgl2fundamentals.org/) / [Exemplos](https://webgl2fundamentals.org/)
- 🌐 [MDN WebGL](https://developer.mozilla.org/pt-BR/docs/Web/API/WebGL_API) — / [WebGL](https://developer.mozilla.org/pt-BR/docs/Web/API/WebGL_API) / [WebGL2](https://developer.mozilla.org/pt-BR/docs/Web/API/WebGL2_API) / [Tutoriais](https://developer.mozilla.org/pt-BR/docs/Web/API/WebGL_API/Tutorial) / [Comunidade](https://developer.mozilla.org/pt-BR/docs/Web/API/WebGL_API)
- [WebGL Spec](https://www.khronos.org/webgl/) — / [Especificação](https://registry.khronos.org/webgl/specs/latest/2.0/) / [Extensões](https://www.khronos.org/webgl/wiki/Getting_WebGL_Extensions) / [Comunidade](https://www.khronos.org/webgl/) / [GitHub](https://github.com/KhronosGroup/WebGL)
- [WebGL Wiki](https://www.khronos.org/opengl/wiki/Main_Page) — / [OpenGL](https://www.khronos.org/opengl/wiki/Main_Page) / [WebGL](https://www.khronos.org/webgl/) / [Common Mistakes](https://www.khronos.org/opengl/wiki/Common_Mistakes) / [API](https://www.khronos.org/opengl/wiki/OpenGL_API)

**Recursos de WebGPU:**
- [WebGPU Fundamentals](https://webgpufundamentals.org/) — / [Documentação](https://webgpufundamentals.org/) / [GitHub](https://github.com/gfxfundamentals/webgpufundamentals) / [WGSL](https://www.w3.org/TR/WGSL/) / [Exemplos](https://webgpufundamentals.org/webgpu-lessons.html)
- [WebGPU Spec](https://www.w3.org/TR/webgpu/) — / [Especificação](https://www.w3.org/TR/webgpu/) / [WGSL](https://www.w3.org/TR/WGSL/) / [Explicativo](https://github.com/gpuweb/gpuweb) / [Comunidade](https://www.w3.org/community/gpu/)
- [WGSL Spec](https://www.w3.org/TR/WGSL/) — / [Especificação](https://www.w3.org/TR/WGSL/) / [Guia](https://www.w3.org/TR/WGSL/) / [Exemplos](https://www.w3.org/TR/WGSL/) / [Comunidade](https://www.w3.org/community/gpu/)
- [WebGPU Samples](https://github.com/webgpu/webgpu-samples) — / [GitHub](https://github.com/webgpu/webgpu-samples) / [Ao Vivo](https://webgpu.github.io/webgpu-samples/) / [Documentação](https://github.com/webgpu/webgpu-samples) / [Contribuir](https://github.com/webgpu/webgpu-samples)
- [WebGPU GitHub](https://github.com/gpuweb/gpuweb) — / [GitHub](https://github.com/gpuweb/gpuweb) / [Design](https://github.com/gpuweb/gpuweb/blob/main/design/) / [Explicativo](https://github.com/gpuweb/gpuweb) / [Comunidade](https://github.com/gpuweb/gpuweb)

### Ecossistema Three.js

**Three.js Essencial:**
- [Three.js](https://threejs.org/) — / [Documentação](https://threejs.org/docs/) / [Exemplos](https://threejs.org/examples/) / [GitHub](https://github.com/mrdoob/three.js) / [Tutoriais](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) / [Comunidade](https://threejs.org/) / [YouTube](https://www.youtube.com/@threejs)
- [Three.js Examples](https://threejs.org/examples/) — / [Exemplos](https://threejs.org/examples/) / [Documentação](https://threejs.org/docs/#examples/en/) / [GitHub](https://github.com/mrdoob/three.js) / [Contribuir](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene)
- [Three.js Documentation](https://threejs.org/docs/) — / [Documentação](https://threejs.org/docs/) / [API](https://threejs.org/docs/#api/en/) / [Manual](https://threejs.org/docs/#manual/en/introduction/) / [Exemplos](https://threejs.org/docs/#examples/en/)

**Bibliotecas Three.js:**
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) — / [Documentação](https://docs.pmnd.rs/react-three-fiber) / [GitHub](https://github.com/pmndrs/react-three-fiber) / [Drei](https://github.com/pmndrs/drei) / [Tutoriais](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) / [Comunidade](https://discord.gg/pmndrs)
- [Drei](https://github.com/pmndrs/drei) — / [GitHub](https://github.com/pmndrs/drei) / [Documentação](https://drei.pmnd.rs/) / [Exemplos](https://drei.pmnd.rs/) / [Comunidade](https://discord.gg/pmndrs)
- [React Three Postprocessing](https://github.com/pmndrs/postprocessing) — / [GitHub](https://github.com/pmndrs/postprocessing) / [Documentação](https://github.com/pmndrs/postprocessing) / [Exemplos](https://github.com/pmndrs/postprocessing) / [Comunidade](https://discord.gg/pmndrs)
- [Cannon-es](https://github.com/pmndrs/cannon-es) — / [GitHub](https://github.com/pmndrs/cannon-es) / [Documentação](https://github.com/pmndrs/cannon-es) / [Exemplos](https://github.com/pmndrs/cannon-es) / [Comunidade](https://github.com/pmndrs/cannon-es)
- [Leva](https://github.com/pmndrs/leva) — / [GitHub](https://github.com/pmndrs/leva) / [Documentação](https://github.com/pmndrs/leva) / [Exemplos](https://github.com/pmndrs/leva) / [Comunidade](https://github.com/pmndrs/leva)
- [Zustand](https://github.com/pmndrs/zustand) — / [GitHub](https://github.com/pmndrs/zustand) / [Documentação](https://github.com/pmndrs/zustand) / [Exemplos](https://github.com/pmndrs/zustand) / [Comunidade](https://github.com/pmndrs/zustand)

**Carregadores (Loaders) Three.js:**
- [GLTFLoader](https://threejs.org/examples/#webgl_loader_gltf) — / [Exemplo](https://threejs.org/examples/#webgl_loader_gltf) / [Documentação](https://threejs.org/docs/#examples/en/loaders/GLTFLoader) / [Formato](https://www.khronos.org/gltf/) / [Comunidade](https://www.khronos.org/gltf/)
- [OBJLoader](https://threejs.org/examples/#webgl_loader_obj) — / [Exemplo](https://threejs.org/examples/#webgl_loader_obj) / [Documentação](https://threejs.org/docs/#examples/en/loaders/OBJLoader) / [Formato](https://en.wikipedia.org/wiki/Wavefront_.obj_file) / [Comunidade](https://en.wikipedia.org/wiki/Wavefront_.obj_file)
- [FBXLoader](https://threejs.org/examples/#webgl_loader_fbx) — / [Exemplo](https://threejs.org/examples/#webgl_loader_fbx) / [Documentação](https://threejs.org/docs/#examples/en/loaders/FBXLoader) / [Formato](https://en.wikipedia.org/wiki/FBX) / [Comunidade](https://en.wikipedia.org/wiki/FBX)
- [STLLoader](https://threejs.org/examples/#webgl_loader_stl) — / [Exemplo](https://threejs.org/examples/#webgl_loader_stl) / [Documentação](https://threejs.org/docs/#examples/en/loaders/STLLoader) / [Formato](https://en.wikipedia.org/wiki/STL_(file_format)) / [Comunidade](https://en.wikipedia.org/wiki/STL_(file_format))
- [ColladaLoader](https://threejs.org/examples/#webgl_loader_collada) — / [Exemplo](https://threejs.org/examples/#webgl_loader_collada) / [Documentação](https://threejs.org/docs/#examples/en/loaders/ColladaLoader) / [Formato](https://en.wikipedia.org/wiki/COLLADA) / [Comunidade](https://en.wikipedia.org/wiki/COLLADA)

### Ecossistema Babylon.js

**Babylon.js Essencial:**
- [Babylon.js](https://www.babylonjs.com/) — / [Documentação](https://doc.babylonjs.com/) / [Playground](https://playground.babylonjs.com/) / [GitHub](https://github.com/BabylonJS/Babylon.js) / [Tutoriais](https://doc.babylonjs.com/journey/) / [Comunidade](https://forum.babylonjs.com/) / [YouTube](https://www.youtube.com/@babylonjs)
- [Babylon Playground](https://playground.babylonjs.com/) — / [Playground](https://playground.babylonjs.com/) / [Documentação](https://doc.babylonjs.com/) / [Exemplos](https://doc.babylonjs.com/examples/) / [Comunidade](https://forum.babylonjs.com/) / [GitHub](https://github.com/BabylonJS/Babylon.js)
- [Babylon Documentation](https://doc.babylonjs.com/) — / [Documentação](https://doc.babylonjs.com/) / [API](https://doc.babylonjs.com/) / [Tutoriais](https://doc.babylonjs.com/journey/) / [Exemplos](https://doc.babylonjs.com/examples/)

**Extensões Babylon.js:**
- [Babylon GUI](https://doc.babylonjs.com/features/featuresDeepDive/gui) — / [Documentação](https://doc.babylonjs.com/features/featuresDeepDive/gui) / [AdvancedDynamicTexture](https://doc.babylonjs.com/features/featuresDeepDive/gui) / [Exemplos](https://doc.babylonjs.com/features/featuresDeepDive/gui) / [Comunidade](https://forum.babylonjs.com/)
- [Babylon Physics](https://doc.babylonjs.com/features/featuresDeepDive/physics) — / [Documentação](https://doc.babylonjs.com/features/featuresDeepDive/physics) / [Havok](https://doc.babylonjs.com/features/featuresDeepDive/physics) / [Oimo](https://doc.babylonjs.com/features/featuresDeepDive/physics) / [Comunidade](https://forum.babylonjs.com/)
- [Babylon Materials](https://doc.babylonjs.com/features/featuresDeepDive/materials) — / [Documentação](https://doc.babylonjs.com/features/featuresDeepDive/materials) / [PBRMaterial](https://doc.babylonjs.com/features/featuresDeepDive/materials) / [NodeMaterial](https://doc.babylonjs.com/features/featuresDeepDive/materials) / [Comunidade](https://forum.babylonjs.com/)
- [Babylon PostProcess](https://doc.babylonjs.com/features/featuresDeepDive/postProcesses) — / [Documentação](https://doc.babylonjs.com/features/featuresDeepDive/postProcesses) / [Pipeline](https://doc.babylonjs.com/features/featuresDeepDive/postProcesses) / [Comunidade](https://forum.babylonjs.com/)
- [Babylon Inspector](https://doc.babylonjs.com/) — / [Documentação](https://doc.babylonjs.com/) / [Camada de Depuração](https://doc.babylonjs.com/) / [Comunidade](https://forum.babylonjs.com/)

### Realidade Virtual e Aumentada na Web (VR/AR)

**Frameworks de Realidade Virtual (VR):**
- [A-Frame](https://aframe.io/) — / [Documentação](https://aframe.io/docs/) / [GitHub](https://github.com/aframevr/aframe) / [Exemplos](https://aframe.io/examples/) / [Comunidade](https://aframe.io/community/)
- [React 360 (Legado)](https://github.com/facebookarchive/react-360) — / [GitHub](https://github.com/facebookarchive/react-360)
- [WebXR](https://immersiveweb.dev/) — / [API](https://www.w3.org/TR/webxr/) / [Exemplos](https://immersive-web.github.io/webxr-samples/) / [Documentação](https://immersiveweb.dev/) / [Comunidade](https://immersiveweb.dev/) / [GitHub](https://github.com/immersive-web/webxr)
- [Cardboard](https://developers.google.com/cardboard/) — / [Documentação](https://developers.google.com/cardboard/) / [API](https://developers.google.com/cardboard/) / [Exemplos](https://developers.google.com/cardboard/) / [Comunidade](https://developers.google.com/cardboard/) / [YouTube](https://www.youtube.com/results?search_query=cardboard)

**Frameworks de Realidade Aumentada (AR):**
- [AR.js](https://github.com/AR-js-org/AR.js) — / [GitHub](https://github.com/AR-js-org/AR.js) / [Documentação](https://ar-js-org.github.io/AR.js/) / [Exemplos](https://ar-js-org.github.io/AR.js/) / [Comunidade](https://github.com/AR-js-org/AR.js) / [YouTube](https://www.youtube.com/results?search_query=arjs)
- [MindAR](https://github.com/hiukim/mind-ar-js) — / [GitHub](https://github.com/hiukim/mind-ar-js) / [Documentação](https://hiukim.github.io/mind-ar-js/) / [Exemplos](https://hiukim.github.io/mind-ar-js/) / [Comunidade](https://github.com/hiukim/mind-ar-js) / [YouTube](https://www.youtube.com/results?search_query=mindar)
- [8th Wall](https://www.8thwall.com/) — / [Documentação](https://www.8thwall.com/docs) / [SDK](https://www.8thwall.com/) / [Exemplos](https://www.8thwall.com/examples) / [Comunidade](https://www.8thwall.com/community) / [YouTube](https://www.youtube.com/@8thwall)
- [Zappar](https://www.zappar.com/) — / [Documentação](https://docs.zap.works/) / [SDK](https://www.zappar.com/) / [Exemplos](https://www.zappar.com/examples) / [Comunidade](https://zappar.com/community) / [YouTube](https://www.youtube.com/@Zappar)

### Visualização e Dados

**Visualização de Dados:**
- [D3.js](https://d3js.org/) — / [Documentação](https://d3js.org/what-is-d3) / [GitHub](https://github.com/d3/d3) / [Exemplos](https://observablehq.com/@d3/gallery) / [Comunidade](https://d3js.org/) / [YouTube](https://www.youtube.com/results?search_query=d3js)
- [Deck.gl](https://deck.gl/) — / [Documentação](https://deck.gl/) / [GitHub](https://github.com/visgl/deck.gl) / [Exemplos](https://deck.gl/examples) / [Comunidade](https://github.com/visgl/deck.gl) / [YouTube](https://www.youtube.com/results?search_query=deckgl)
- [Luma.gl](https://luma.gl/) — / [Documentação](https://luma.gl/) / [GitHub](https://github.com/visgl/luma.gl) / [Exemplos](https://luma.gl/examples) / [Comunidade](https://github.com/visgl/luma.gl) / [YouTube](https://www.youtube.com/results?search_query=lumagl)
- [Vis.gl](https://vis.gl/) — / [Documentação](https://vis.gl/) / [GitHub](https://github.com/visgl) / [Exemplos](https://vis.gl/examples) / [Comunidade](https://github.com/visgl) / [YouTube](https://www.youtube.com/results?search_query=visgl)
- [Plotly](https://plotly.com/) — / [Documentação](https://plotly.com/) / [GitHub](https://github.com/plotly/plotly.js) / [Exemplos](https://plotly.com/) / [Comunidade](https://community.plotly.com/) / [YouTube](https://www.youtube.com/@Plotly)
- [Bokeh](https://bokeh.org/) — / [Documentação](https://docs.bokeh.org/) / [GitHub](https://github.com/bokeh/bokeh) / [Exemplos](https://bokeh.org/) / [Comunidade](https://discourse.bokeh.org/) / [YouTube](https://www.youtube.com/results?search_query=bokeh)
- [Chart.js](https://www.chartjs.org/) — / [Documentação](https://www.chartjs.org/docs/) / [GitHub](https://github.com/chartjs/Chart.js) / [Exemplos](https://www.chartjs.org/docs/latest/samples/) / [Comunidade](https://www.chartjs.org/docs/latest/) / [YouTube](https://www.youtube.com/results?search_query=chartjs)

**Mapas e Dados Geoespaciais:**
- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/) — / [Documentação](https://docs.mapbox.com/mapbox-gl-js/) / [GitHub](https://github.com/mapbox/mapbox-gl-js) / [Exemplos](https://docs.mapbox.com/mapbox-gl-js/examples/) / [Comunidade](https://www.mapbox.com/community/)
- [Leaflet](https://leafletjs.com/) — / [Documentação](https://leafletjs.com/) / [GitHub](https://github.com/Leaflet/Leaflet) / [Exemplos](https://leafletjs.com/examples.html) / [Comunidade](https://leafletjs.com/) / [YouTube](https://www.youtube.com/results?search_query=leaflet)
- [Cesium.js](https://cesium.com/) — / [Documentação](https://cesium.com/) / [GitHub](https://github.com/CesiumGS/cesium) / [Exemplos](https://cesium.com/) / [Comunidade](https://community.cesium.com/) / [YouTube](https://www.youtube.com/@CesiumGS)
- [OpenLayers](https://openlayers.org/) — / [Documentação](https://openlayers.org/) / [GitHub](https://github.com/openlayers/openlayers) / [Exemplos](https://openlayers.org/en/latest/examples/) / [Comunidade](https://openlayers.org/) / [YouTube](https://www.youtube.com/results?search_query=openlayers)

### Programação Criativa

**Bibliotecas Criativas:**
- [p5.js](https://p5js.org/) — / [Documentação](https://p5js.org/) / [GitHub](https://github.com/processing/p5.js) / [Exemplos](https://p5js.org/examples/) / [Comunidade](https://p5js.org/community/) / [YouTube](https://www.youtube.com/@TheCodingTrain)
- [Processing](https://processing.org/) — / [Documentação](https://processing.org/) / [GitHub](https://github.com/processing/processing) / [Exemplos](https://processing.org/examples/) / [Comunidade](https://processing.org/community/) / [YouTube](https://www.youtube.com/@ProcessingFoundation)
- [OpenFrameworks](https://openframeworks.cc/) — / [Documentação](https://openframeworks.cc/) / [GitHub](https://github.com/openframeworks/openFrameworks) / [Exemplos](https://openframeworks.cc/) / [Comunidade](https://openframeworks.cc/) / [YouTube](https://www.youtube.com/results?search_query=openframeworks)
- [Cinder](https://libcinder.org/) — / [Documentação](https://libcinder.org/) / [GitHub](https://github.com/cinder/Cinder) / [Exemplos](https://libcinder.org/) / [Comunidade](https://libcinder.org/) / [YouTube](https://www.youtube.com/results?search_query=cinder)
- [TouchDesigner](https://derivative.ca/) — / [Documentação](https://docs.derivative.ca/) / [GitHub](https://github.com/derivative) / [Exemplos](https://docs.derivative.ca/) / [Comunidade](https://forum.derivative.ca/) / [YouTube](https://www.youtube.com/results?search_query=touchdesigner)

### Ferramentas de Desenvolvimento

**Ferramentas WebGL/WebGPU:**
- [WebGL Report](https://webglreport.com/) — / [WebGL](https://webglreport.com/) / [WebGL2](https://webglreport.com/?v=2) / [WebGPU](https://webglreport.com/?v=webgpu) / [Comunidade](https://webglreport.com/)
- [Spector.js](https://spector.babylonjs.com/) — / [Chrome](https://chrome.google.com/webstore/detail/spectorjs/denbgaamihkadbilfifdlfdpghfikcjpo) / [Firefox](https://addons.mozilla.org/en-US/firefox/addon/spectorjs/) / [Documentação](https://spector.babylonjs.com/) / [GitHub](https://github.com/BabylonJS/Spector.js) / [YouTube](https://www.youtube.com/results?search_query=spectorjs)
- [WebGL Inspector](https://github.com/benvanik/webgl-inspector) — / [GitHub](https://github.com/benvanik/webgl-inspector) / [Chrome](https://chrome.google.com/webstore/detail/webgl-inspector/ogkcjfnlncljdnepjmljhlbnkffimhnf) / [Documentação](https://github.com/benvanik/webgl-inspector) / [YouTube](https://www.youtube.com/results?search_query=webgl+inspector)
- [Bones](https://github.com/sketchfab/bones) — / [GitHub](https://github.com/sketchfab/bones) / [Documentação](https://github.com/sketchfab/bones) / [YouTube](https://www.youtube.com/results?search_query=bones+gl)

**Ferramentas de Performance:**
- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/) — / [Performance](https://developers.google.com/web/tools/chrome-devtools/performance) / [WebGL](https://developers.google.com/web/tools/chrome-devtools/javascript/webgl-inspector) / [Memória](https://developers.google.com/web/tools/chrome-devtools/memory-problems) / [Comunidade](https://developers.google.com/web/tools/chrome-devtools/)
- [Firefox DevTools](https://developer.mozilla.org/pt-BR/docs/Tools) — / [Performance](https://developer.mozilla.org/pt-BR/docs/Tools/Performance) / [WebGL](https://developer.mozilla.org/pt-BR/docs/Tools/Web_Console) / [Memória](https://developer.mozilla.org/pt-BR/docs/Tools/Memory) / [Comunidade](https://developer.mozilla.org/pt-BR/docs/Tools)
- [Safari Web Inspector](https://developer.apple.com/safari/tools/) — / [Performance](https://developer.apple.com/safari/tools/) / [WebGL](https://developer.apple.com/safari/tools/) / [Memória](https://developer.apple.com/safari/tools/) / [Comunidade](https://developer.apple.com/safari/tools/)
- [Edge DevTools](https://docs.microsoft.com/microsoft-edge/devtools-guide) — / [Performance](https://docs.microsoft.com/microsoft-edge/devtools-guide/performance) / [WebGL](https://docs.microsoft.com/microsoft-edge/devtools-guide/console) / [Memória](https://docs.microsoft.com/microsoft-edge/devtools-guide/memory) / [Comunidade](https://docs.microsoft.com/microsoft-edge/devtools-guide)

### Recursos de Aprendizado

**Cursos de WebGL:**
- [WebGL Fundamentals](https://webglfundamentals.org/) — / [Documentação](https://webglfundamentals.org/) / [GitHub](https://github.com/greggman/webgl-fundamentals) / [Tutoriais](https://webglfundamentals.org/webgl/lessons/) / [Comunidade](https://webglfundamentals.org/)
- [WebGL2 Fundamentals](https://webgl2fundamentals.org/) — / [Documentação](https://webgl2fundamentals.org/) / [GitHub](https://github.com/greggman/webgl2-fundamentals) / [Tutoriais](https://webgl2fundamentals.org/) / [Comunidade](https://webgl2fundamentals.org/)
- 🌐 [MDN WebGL Tutorial](https://developer.mozilla.org/pt-BR/docs/Web/API/WebGL_API/Tutorial) — / [Documentação](https://developer.mozilla.org/pt-BR/docs/Web/API/WebGL_API/Tutorial) / [Exemplos](https://developer.mozilla.org/pt-BR/docs/Web/API/WebGL_API/Tutorial) / [Comunidade](https://developer.mozilla.org/pt-BR/docs/Web/API/WebGL_API/Tutorial)

**Cursos de WebGPU:**
- [WebGPU Fundamentals](https://webgpufundamentals.org/) — / [Documentação](https://webgpufundamentals.org/) / [GitHub](https://github.com/gfxfundamentals/webgpufundamentals) / [WGSL](https://www.w3.org/TR/WGSL/) / [Exemplos](https://webgpufundamentals.org/webgpu-lessons.html)
- [WebGPU GitHub](https://github.com/gpuweb/gpuweb) — / [GitHub](https://github.com/gpuweb/gpuweb) / [Design](https://github.com/gpuweb/gpuweb/blob/main/design/) / [Explicativo](https://github.com/gpuweb/gpuweb) / [Comunidade](https://github.com/gpuweb/gpuweb)
- [WebGPU Samples](https://github.com/webgpu/webgpu-samples) — / [GitHub](https://github.com/webgpu/webgpu-samples) / [Ao Vivo](https://webgpu.github.io/webgpu-samples/) / [Documentação](https://github.com/webgpu/webgpu-samples) / [Contribuir](https://github.com/webgpu/webgpu-samples)

**Cursos de Three.js:**
- [Three.js Journey](https://threejs-journey.com/) — / [Curso](https://threejs-journey.com/) / [Instructor](https://bruno-simon.com/) / [Discount](https://threejs-journey.com/) / [Comunidade](https://threejs-journey.com/)
- [Three.js Fundamentals](https://threejsfundamentals.org/) — / [Documentação](https://threejsfundamentals.org/) / [GitHub](https://github.com/greggman/threejsfundamentals) / [Tutoriais](https://threejsfundamentals.org/) / [Comunidade](https://threejsfundamentals.org/)
- [Three.js TypeScript](https://github.com/tweenjs/tween.js) — / [GitHub](https://github.com/tweenjs/tween.js) / [Documentação](https://github.com/tweenjs/tween.js) / [Exemplos](https://github.com/tweenjs/tween.js)

**Cursos de Babylon.js:**
- [Babylon.js Tutorials](https://doc.babylonjs.com/journey/) — / [Documentação](https://doc.babylonjs.com/journey/) / [GitHub](https://github.com/BabylonJS/Babylon.js) / [Exemplos](https://doc.babylonjs.com/examples/) / [Comunidade](https://forum.babylonjs.com/)
- [Babylon.js GitHub](https://github.com/BabylonJS/Babylon.js) — / [GitHub](https://github.com/BabylonJS/Babylon.js) / [Contribuir](https://github.com/BabylonJS/Babylon.js) / [Issues](https://github.com/BabylonJS/Babylon.js/issues) / [Comunidade](https://github.com/BabylonJS/Babylon.js)

### Comunidade e Fóruns

**Comunidade WebGL:**
- [Reddit r/webgl](https://www.reddit.com/r/webgl/) — / [Novos](https://www.reddit.com/r/webgl/new/) / [Populares](https://www.reddit.com/r/webgl/hot/) / [Principais](https://www.reddit.com/r/webgl/top/)
- [Stack Overflow WebGL](https://stackoverflow.com/questions/tagged/webgl) — / [Tag](https://stackoverflow.com/questions/tagged/webgl) / [Mais Recentes](https://stackoverflow.com/questions/tagged/webgl?tab=newest) / [Frequentes](https://stackoverflow.com/questions/tagged/webgl?tab=frequent)
- [WebGL Forum](https://community.khronos.org/t/) — / [Principal](https://community.khronos.org/t/) / [WebGL](https://community.khronos.org/t/webgl/) / [GLSL](https://community.khronos.org/t/glsl/) / [WGL](https://community.khronos.org/t/wgl/)
- [WebGL Discord](https://discord.gg/webgl) — / [Entrar](https://discord.gg/webgl) / [Canais](https://discord.gg/webgl) / [Membros](https://discord.gg/webgl)

**Comunidade WebGPU:**
- [Reddit r/webgpu](https://www.reddit.com/r/webgpu/) — / [Novos](https://www.reddit.com/r/webgpu/new/) / [Populares](https://www.reddit.com/r/webgpu/hot/) / [Principais](https://www.reddit.com/r/webgpu/top/)
- [Stack Overflow WebGPU](https://stackoverflow.com/questions/tagged/webgpu) — / [Tag](https://stackoverflow.com/questions/tagged/webgpu) / [Mais Recentes](https://stackoverflow.com/questions/tagged/webgpu?tab=newest) / [Frequentes](https://stackoverflow.com/questions/tagged/webgpu?tab=frequent)
- [WebGPU Forum](https://community.khronos.org/t/) — / [Principal](https://community.khronos.org/t/) / [WebGPU](https://community.khronos.org/t/webgpu/) / [WGSL](https://community.khronos.org/t/wgsl/) / [SPIRV](https://community.khronos.org/t/spirv/)
- [WebGPU Discord](https://discord.gg/webgpu) — / [Entrar](https://discord.gg/webgpu) / [Canais](https://discord.gg/webgpu) / [Membros](https://discord.gg/webgpu)

**Comunidade Three.js:**
- [Reddit r/threejs](https://www.reddit.com/r/threejs/) — / [Novos](https://www.reddit.com/r/threejs/new/) / [Populares](https://www.reddit.com/r/threejs/hot/) / [Principais](https://www.reddit.com/r/threejs/top/)
- [Stack Overflow Three.js](https://stackoverflow.com/questions/tagged/three.js) — / [Tag](https://stackoverflow.com/questions/tagged/three.js) / [Mais Recentes](https://stackoverflow.com/questions/tagged/three.js?tab=newest) / [Frequentes](https://stackoverflow.com/questions/tagged/three.js?tab=frequent)
- [Three.js Discord](https://discord.gg/threejs) — / [Entrar](https://discord.gg/threejs) / [Canais](https://discord.gg/threejs) / [Membros](https://discord.gg/threejs)
- [Three.js Forum](https://discourse.threejs.org/) — / [Principal](https://discourse.threejs.org/) / [Suporte](https://discourse.threejs.org/c/support) / [Vitrine](https://discourse.threejs.org/c/showcase) / [Colaboração](https://discourse.threejs.org/c/collaboration)

**Comunidade Babylon.js:**
- [Reddit r/babylonjs](https://www.reddit.com/r/babylonjs/) — / [Novos](https://www.reddit.com/r/babylonjs/new/) / [Populares](https://www.reddit.com/r/babylonjs/hot/) / [Principais](https://www.reddit.com/r/babylonjs/top/)
- [Stack Overflow Babylon.js](https://stackoverflow.com/questions/tagged/babylonjs) — / [Tag](https://stackoverflow.com/questions/tagged/babylonjs) / [Mais Recentes](https://stackoverflow.com/questions/tagged/babylonjs?tab=newest) / [Frequentes](https://stackoverflow.com/questions/tagged/babylonjs?tab=frequent)
- [Babylon.js Forum](https://forum.babylonjs.com/) — / [Principal](https://forum.babylonjs.com/) / [Suporte](https://forum.babylonjs.com/) / [Vitrine](https://forum.babylonjs.com/) / [Desenvolvimento](https://forum.babylonjs.com/)
- [Babylon.js Discord](https://discord.gg/babylonjs) — / [Entrar](https://discord.gg/babylonjs) / [Canais](https://discord.gg/babylonjs) / [Membros](https://discord.gg/babylonjs)

---

*Última atualização: 2026-08-31*  
*Este índice curado segue o modelo FMHY para organizar recursos de referência sobre gráficos web e 3D.*
