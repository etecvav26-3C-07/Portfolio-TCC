---
title: Web e Computação Gráfica
sidebar_label: Web
description: Gráficos na web com WebGL, WebGPU, Three.js e Babylon.js — demos ao vivo.
---

<script setup>
import ThreePanel from "./.vitepress/components/ThreePanel.vue";
import WebGLPanel from "./.vitepress/components/WebGLPanel.vue";
import WebGPUPanel from "./.vitepress/components/WebGPUPanel.vue";
import BabylonPanel from "./.vitepress/components/BabylonPanel.vue";
</script>

# Web

Na web você escolhe o nível da pilha: **WebGL** e **WebGPU** falam com a GPU; **Three.js** e **Babylon.js** montam cena, câmera, luz e materiais por cima.

## WebGL

WebGL 2 expõe OpenGL ES 3 no canvas. O exemplo usa shaders GLSL, buffers e uma matriz MVP — o mesmo modelo da página de OpenGL.

<WebGLPanel
  title="WebGL 2"
  subtitle="API nativa do canvas: programa GLSL, atributos e drawElements."
/>

- [WebGL Fundamentals](https://webglfundamentals.org/) — base da API
- [MDN WebGL](https://developer.mozilla.org/pt-BR/docs/Web/API/WebGL_API) — documentação oficial

## WebGPU

WebGPU é a API moderna (filas, pipelines, WGSL). Mais próxima do Vulkan/D3D12/Metal do que do OpenGL.

<WebGPUPanel
  title="WebGPU + WGSL"
  subtitle="Device, render pipeline e command encoder. Se o cubo não aparecer, o navegador ainda não expõe navigator.gpu."
/>

<ThreePanel
  topic="webgpu"
  title="Compute e instancing"
  subtitle="Centenas de instâncias orbitando um núcleo — o tipo de carga que o WebGPU trata bem."
/>

- [WebGPU Fundamentals](https://webgpufundamentals.org/) — guia moderno
- [WGSL Spec](https://www.w3.org/TR/WGSL/) — linguagem de shader
- [WebGPU samples](https://github.com/webgpu/webgpu-samples) — exemplos oficiais

## Three.js

Three.js é a biblioteca 3D mais usada na web. A cena abaixo mistura knot, satélites e partículas.

<ThreePanel
  topic="threejs"
  title="Cena Three.js"
  subtitle="Torus knot, órbitas e nuvem de pontos com MeshStandardMaterial."
/>

- [Three.js](https://threejs.org/) — biblioteca principal para 3D web
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) — 3D com React

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

- [Babylon.js](https://www.babylonjs.com/) — engine robusta
- [Babylon Playground](https://playground.babylonjs.com/) — experimentos no navegador

## Links rápidos

- [Three.js](https://threejs.org/) — / [Docs](https://threejs.org/docs/) / [Examples](https://threejs.org/examples/) / [GitHub](https://github.com/mrdoob/three.js)
- [WebGPU Fundamentals](https://webgpufundamentals.org/) — / [Docs](https://webgpufundamentals.org/) / [GitHub](https://github.com/gpupublish/webgpufundamentals-website)
- [WebGL Fundamentals](https://webglfundamentals.org/) — / [Docs](https://webglfundamentals.org/) / [GitHub](https://github.com/gpupublish/webglfundamentals-website)
- [Babylon.js](https://www.babylonjs.com/) — / [Docs](https://doc.babylonjs.com/) / [Playground](https://playground.babylonjs.com/) / [GitHub](https://github.com/BabylonJS/Babylon.js)
- [MDN WebGL](https://developer.mozilla.org/pt-BR/docs/Web/API/WebGL_API) — / [WebGL](https://developer.mozilla.org/pt-BR/docs/Web/API/WebGL_API) / [WebGL2](https://developer.mozilla.org/pt-BR/docs/Web/API/WebGL2_API) / [WebGPU](https://developer.mozilla.org/pt-BR/docs/Web/API/WebGPU_API)

## Bibliotecas e Frameworks com Demos

### 🎮 3D Web Frameworks

#### React Three Fiber (R3F)
> Ecossistema declarativo que traz o Three.js para o paradigma de componentes e hooks do React (`@react-three/fiber`, `@react-three/drei`).

<ThreePanel
  topic="r3f"
  title="React Three Fiber (R3F)"
  subtitle="Nós reativos declarativos com física de molas (Spring) e grafo de estados em torno do núcleo React."
/>

- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) — / [Docs](https://docs.pmnd.rs/react-three-fiber) / [GitHub](https://github.com/pmndrs/react-three-fiber) / [Drei](https://github.com/pmndrs/drei) / [Tutorials](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) / [Community](https://discord.gg/pmndrs) / [YouTube](https://www.youtube.com/c/pmndrs) / [Twitter](https://twitter.com/pmndrs)

#### A-Frame (WebXR & VR)
> Framework baseado em Entity-Component-System (ECS) para construção de experiências de Realidade Virtual e Aumentada no navegador.

<ThreePanel
  topic="aframe"
  title="A-Frame (WebXR / Realidade Virtual)"
  subtitle="Headset VR com controladores de mira laser em cena espacial imersiva em 360°."
/>

- [A-Frame](https://aframe.io/) — / [Docs](https://aframe.io/docs/) / [GitHub](https://github.com/aframevr/aframe) / [Examples](https://aframe.io/examples/) / [Community](https://aframe.io/community/) / [YouTube](https://www.youtube.com/c/aframevr) / [Twitter](https://twitter.com/aframevr)

#### PlayCanvas
> Engine de jogos WebGL/WebGPU completa na nuvem, com física rígida em tempo real, editor colaborativo e suporte mobile de alto desempenho.

<ThreePanel
  topic="playcanvas"
  title="PlayCanvas (Web Game Engine)"
  subtitle="Arena isométrica de jogo com simulação física de esfera, pickups de cristais e sombras dinâmicas."
/>

- [PlayCanvas](https://playcanvas.com/) — / [Docs](https://developer.playcanvas.com/) / [GitHub](https://github.com/playcanvas/engine) / [Editor](https://playcanvas.com/editor) / [Community](https://forum.playcanvas.com/) / [YouTube](https://www.youtube.com/c/PlayCanvas) / [Twitter](https://twitter.com/playcanvas)

#### Mapbox GL JS
> Renderizador de mapas geoespaciais vetoriais com extrusão 3D de edifícios urbanos, camadas de tráfego e visualização de terreno.

<ThreePanel
  topic="mapbox"
  title="Mapbox GL JS (3D Geospatial)"
  subtitle="Extrusão de malha urbana poligonal com pulso de geolocalização e malha viária em tempo real."
/>

- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/) — / [Docs](https://docs.mapbox.com/mapbox-gl-js/) / [GitHub](https://github.com/mapbox/mapbox-gl-js) / [Examples](https://docs.mapbox.com/mapbox-gl-js/examples/) / [Community](https://www.mapbox.com/community/) / [YouTube](https://www.youtube.com/c/Mapbox) / [Twitter](https://twitter.com/mapbox)

---

### 🕹️ 2D Web Frameworks

#### PixiJS
> O motor de renderização 2D mais rápido da web, utilizando lote de sprites (*Sprite Batching*) com aceleração direta por hardware WebGL.

<ThreePanel
  topic="pixijs"
  title="PixiJS (Sprite Batching 2D)"
  subtitle="Mais de 100 sprites 2D agrupados e renderizados em lote em alta velocidade com colisões no canvas."
/>

- [PixiJS](https://pixijs.com/) — / [Docs](https://pixijs.io/docs/) / [GitHub](https://github.com/pixijs/pixi.js) / [Examples](https://pixijs.io/examples/) / [Community](https://discord.gg/pixijs) / [YouTube](https://www.youtube.com/c/PixiJS) / [Twitter](https://twitter.com/pixijs)

#### Phaser
> Framework completo para desenvolvimento de jogos 2D no navegador com gerenciador de física (Arcade/Matter), áudio, spritesheets e mapas de azulejos (Tilemaps).

<ThreePanel
  topic="phaser"
  title="Phaser (2D Game Framework)"
  subtitle="Mini-nível de plataforma com física de pulo, plataformas e moedas colecionáveis giratórias."
/>

- [Phaser](https://phaser.io/) — / [Docs](https://photonstorm.github.io/phaser3-docs/) / [GitHub](https://github.com/photonstorm/phaser) / [Examples](https://phaser.io/examples) / [Community](https://phaser.io/community) / [YouTube](https://www.youtube.com/c/Phaser) / [Twitter](https://twitter.com/photonstorm)
- [MelonJS](https://melonjs.org/) — / [Docs](https://melonjs.org/docs/) / [GitHub](https://github.com/melonjs/melonJS) / [Examples](https://melonjs.org/examples/)
- [Konva.js](https://konvajs.org/) — / [Docs](https://konvajs.org/docs) / [GitHub](https://github.com/konvajs/konva) / [Examples](https://konvajs.org/docs/sandbox/)
- [Fabric.js](https://fabricjs.com/) — / [Docs](https://fabricjs.com/docs/) / [GitHub](https://github.com/fabricjs/fabric.js) / [Examples](https://fabricjs.com/kitchensink/)
- [Paper.js](https://paperjs.org/) — / [Docs](https://paperjs.org/) / [GitHub](https://github.com/paperjs/paper.js) / [Examples](https://paperscript.org/)
- [Two.js](https://two.js.org/) — / [Docs](https://two.js.org/) / [GitHub](https://github.com/jonobr1/two.js) / [Examples](https://two.js.org/examples/)

#### P5.js (Creative Coding)
> Biblioteca voltada para arte generativa, design de interação e educação artística, inspirada na filosofia do Processing.

<ThreePanel
  topic="p5js"
  title="P5.js (Creative Coding & Generative Art)"
  subtitle="Curvas matemáticas de Lissajous tridimensionais geradas por código procedimental contínuo."
/>

- [P5.js](https://p5js.org/) — / [Docs](https://p5js.org/) / [GitHub](https://github.com/processing/p5.js) / [Examples](https://p5js.org/examples/) / [Community](https://p5js.org/community/) / [YouTube](https://www.youtube.com/c/p5js) / [Twitter](https://twitter.com/p5xjs)

---

### 📊 Visualization Libraries (Data Viz)

#### D3.js (Data-Driven Documents)
> A biblioteca padrão da indústria para manipulação do DOM e geração de gráficos vetoriais impulsionados por dados, grafos de força e mapas.

<ThreePanel
  topic="d3"
  title="D3.js (Force-Directed Graph 3D)"
  subtitle="Grafo de forças tridimensional com atração, repulsão de nós e pulso métrico de dados dinâmicos."
/>

- [D3.js](https://d3js.org/) — / [Docs](https://github.com/d3/d3/wiki) / [GitHub](https://github.com/d3/d3) / [Examples](https://observablehq.com/@d3/gallery) / [Community](https://d3js.org/) / [YouTube](https://www.youtube.com/results?search_query=d3js) / [Twitter](https://twitter.com/d3js)

#### Deck.gl (Uber Open Source)
> Framework de visualização em grande escala construído sobre WebGL/WebGPU para análise espacial de milhões de pontos e dados geoespaciais em tempo real.

<ThreePanel
  topic="deckgl"
  title="Deck.gl (HexagonLayer & ArcLayer 3D)"
  subtitle="Camadas de densidade hexagonal 3D e arcos de fluxo de dados de alta escala acelerados por GPU."
/>

- [Deck.gl](https://deck.gl/) — / [Docs](https://deck.gl/) / [GitHub](https://github.com/visgl/deck.gl) / [Examples](https://deck.gl/examples) / [Community](https://github.com/visgl/deck.gl) / [YouTube](https://www.youtube.com/results?search_query=deckgl) / [Twitter](https://twitter.com/uber)
- [Luma.gl](https://luma.gl/) — / [Docs](https://luma.gl/) / [GitHub](https://github.com/visgl/luma.gl) / [Examples](https://luma.gl/examples)
- [Vis.gl](https://vis.gl/) — / [Docs](https://vis.gl/) / [GitHub](https://github.com/visgl) / [Examples](https://vis.gl/examples)
- [Plotly](https://plotly.com/) — / [Docs](https://plotly.com/) / [GitHub](https://github.com/plotly/plotly.js) / [Examples](https://plotly.com/)
- [Bokeh](https://bokeh.org/) — / [Docs](https://docs.bokeh.org/) / [GitHub](https://github.com/bokeh/bokeh) / [Examples](https://bokeh.org/)

#### Chart.js
> Biblioteca amigável e amplamente adotada para criação de painéis e dashboards gráficos modernos.

<ThreePanel
  topic="chartjs"
  title="Chart.js (Dashboard & Gráficos 3D)"
  subtitle="Barras métricas animadas com gráfico donut de distribuição percentual."
/>

- [Chart.js](https://www.chartjs.org/) — / [Docs](https://www.chartjs.org/docs/) / [GitHub](https://github.com/chartjs/Chart.js) / [Examples](https://www.chartjs.org/docs/latest/samples/) / [Community](https://www.chartjs.org/docs/latest/) / [YouTube](https://www.youtube.com/results?search_query=chartjs) / [Twitter](https://twitter.com/chartjs)

## Best picks

- [Three.js](https://threejs.org/) — melhor para começar em 3D web — / [Docs](https://threejs.org/docs/) / [Examples](https://threejs.org/examples/) / [GitHub](https://github.com/mrdoob/three.js) / [Tutorials](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) / [Community](https://threejs.org/) / [YouTube](https://www.youtube.com/c/ThreeJS) / [Twitter](https://twitter.com/threejs)
- [WebGPU Fundamentals](https://webgpufundamentals.org/) — melhor referência moderna — / [Docs](https://webgpufundamentals.org/) / [GitHub](https://github.com/gpupublish/webgpufundamentals-website) / [WGSL](https://www.w3.org/TR/WGSL/) / [Examples](https://webgpufundamentals.org/webgpu-lessons.html)
- [Babylon.js](https://www.babylonjs.com/) — ótimo para projetos maiores — / [Docs](https://doc.babylonjs.com/) / [Playground](https://playground.babylonjs.com/) / [GitHub](https://github.com/BabylonJS/Babylon.js) / [Tutorials](https://doc.babylonjs.com/start/chapter1) / [Community](https://forum.babylonjs.com/) / [YouTube](https://www.youtube.com/c/BabylonJS) / [Twitter](https://twitter.com/babylonjs)
- [WebGL Fundamentals](https://webglfundamentals.org/) — base essencial — / [Docs](https://webglfundamentals.org/) / [GitHub](https://github.com/gpupublish/webglfundamentals-website) / [Tutorials](https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html) / [Examples](https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html)

---

## 🚀 MEGA LINK DUMP - Web Graphics & 3D

### 🌐 WebGL & WebGPU

**WebGL Resources:**
- [WebGL Fundamentals](https://webglfundamentals.org/) — / [WebGL](https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html) / [WebGL2](https://webgl2fundamentals.org/) / [GitHub](https://github.com/gpupublish/webglfundamentals-website) / [Tutorials](https://webglfundamentals.org/webgl/lessons/)
- [WebGL2 Fundamentals](https://webgl2fundamentals.org/) — / [Docs](https://webgl2fundamentals.org/) / [GitHub](https://github.com/gpupublish/webgl2fundamentals-website) / [Tutorials](https://webgl2fundamentals.org/) / [Examples](https://webgl2fundamentals.org/)
- [MDN WebGL](https://developer.mozilla.org/pt-BR/docs/Web/API/WebGL_API) — / [WebGL](https://developer.mozilla.org/pt-BR/docs/Web/API/WebGL_API) / [WebGL2](https://developer.mozilla.org/pt-BR/docs/Web/API/WebGL2_API) / [Tutorials](https://developer.mozilla.org/pt-BR/docs/Web/API/WebGL_API/Tutorial) / [Community](https://developer.mozilla.org/pt-BR/docs/Web/API/WebGL_API)
- [WebGL Spec](https://www.khronos.org/webgl/) — / [Spec](https://www.khronos.org/registry/webgl/specs/latest/2.0/) / [Extensions](https://www.khronos.org/webgl/wiki/Getting_WebGL_Extensions) / [Community](https://www.khronos.org/webgl/) / [GitHub](https://github.com/KhronosGroup/WebGL)
- [WebGL Wiki](https://www.khronos.org/opengl/wiki/Main_Page) — / [OpenGL](https://www.khronos.org/opengl/wiki/Main_Page) / [WebGL](https://www.khronos.org/webgl/) / [Common Mistakes](https://www.khronos.org/opengl/wiki/Common_Mistakes) / [API](https://www.khronos.org/opengl/wiki/OpenGL_API)

**WebGPU Resources:**
- [WebGPU Fundamentals](https://webgpufundamentals.org/) — / [Docs](https://webgpufundamentals.org/) / [GitHub](https://github.com/gpupublish/webgpufundamentals-website) / [WGSL](https://www.w3.org/TR/WGSL/) / [Examples](https://webgpufundamentals.org/webgpu-lessons.html)
- [WebGPU Spec](https://www.w3.org/TR/webgpu/) — / [Spec](https://www.w3.org/TR/webgpu/) / [WGSL](https://www.w3.org/TR/WGSL/) / [Explainer](https://github.com/gpuweb/gpuweb/blob/main/explainer.md) / [Community](https://www.w3.org/community/groups/wgpu/)
- [WGSL Spec](https://www.w3.org/TR/WGSL/) — / [Spec](https://www.w3.org/TR/WGSL/) / [Guide](https://gpuweb.github.io/wgsl/) / [Examples](https://www.w3.org/TR/WGSL/) / [Community](https://www.w3.org/community/groups/wgpu/)
- [WebGPU Samples](https://github.com/google/webgpu-samples) — / [GitHub](https://github.com/google/webgpu-samples) / [Live](https://google.github.io/webgpu-samples/) / [Docs](https://github.com/google/webgpu-samples) / [Contributing](https://github.com/google/webgpu-samples)
- [WebGPU GitHub](https://github.com/gpuweb/gpuweb) — / [GitHub](https://github.com/gpuweb/gpuweb) / [Design](https://github.com/gpuweb/gpuweb/blob/main/design/) / [Explainer](https://github.com/gpuweb/gpuweb/blob/main/explainer.md) / [Community](https://github.com/gpuweb/gpuweb)

### 🎨 Three.js Ecosystem

**Core Three.js:**
- [Three.js](https://threejs.org/) — / [Docs](https://threejs.org/docs/) / [Examples](https://threejs.org/examples/) / [GitHub](https://github.com/mrdoob/three.js) / [Tutorials](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) / [Community](https://threejs.org/) / [YouTube](https://www.youtube.com/c/ThreeJS) / [Twitter](https://twitter.com/threejs)
- [Three.js Examples](https://threejs.org/examples/) — / [Examples](https://threejs.org/examples/) / [Docs](https://threejs.org/docs/#examples/en/) / [GitHub](https://github.com/mrdoob/three.js) / [Contribute](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene)
- [Three.js Documentation](https://threejs.org/docs/) — / [Docs](https://threejs.org/docs/) / [API](https://threejs.org/docs/#api/en/) / [Manual](https://threejs.org/docs/#manual/en/introduction/) / [Examples](https://threejs.org/docs/#examples/en/)

**Three.js Libraries:**
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) — / [Docs](https://docs.pmnd.rs/react-three-fiber) / [GitHub](https://github.com/pmndrs/react-three-fiber) / [Drei](https://github.com/pmndrs/drei) / [Tutorials](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) / [Community](https://discord.gg/pmndrs) / [YouTube](https://www.youtube.com/c/pmndrs) / [Twitter](https://twitter.com/pmndrs)
- [Drei](https://github.com/pmndrs/drei) — / [GitHub](https://github.com/pmndrs/drei) / [Docs](https://drei.pmnd.rs/) / [Examples](https://drei.pmnd.rs/) / [Community](https://discord.gg/pmndrs) / [YouTube](https://www.youtube.com/c/pmndrs) / [Twitter](https://twitter.com/pmndrs)
- [React Three Postprocessing](https://github.com/pmndrs/postprocessing) — / [GitHub](https://github.com/pmndrs/postprocessing) / [Docs](https://github.com/pmndrs/postprocessing) / [Examples](https://github.com/pmndrs/postprocessing) / [Community](https://discord.gg/pmndrs)
- [Cannon-es](https://github.com/pmndrs/cannon-es) — / [GitHub](https://github.com/pmndrs/cannon-es) / [Docs](https://github.com/pmndrs/cannon-es) / [Examples](https://github.com/pmndrs/cannon-es) / [Community](https://github.com/pmndrs/cannon-es)
- [Leva](https://github.com/pmndrs/leva) — / [GitHub](https://github.com/pmndrs/leva) / [Docs](https://github.com/pmndrs/leva) / [Examples](https://github.com/pmndrs/leva) / [Community](https://github.com/pmndrs/leva)
- [Zustand](https://github.com/pmndrs/zustand) — / [GitHub](https://github.com/pmndrs/zustand) / [Docs](https://github.com/pmndrs/zustand) / [Examples](https://github.com/pmndrs/zustand) / [Community](https://github.com/pmndrs/zustand)

**Three.js Loaders:**
- [GLTFLoader](https://threejs.org/examples/#webgl_loader_gltf) — / [Example](https://threejs.org/examples/#webgl_loader_gltf) / [Docs](https://threejs.org/docs/#examples/en/loaders/GLTFLoader) / [Format](https://www.khronos.org/gltf/) / [Community](https://www.khronos.org/gltf/)
- [OBJLoader](https://threejs.org/examples/#webgl_loader_obj) — / [Example](https://threejs.org/examples/#webgl_loader_obj) / [Docs](https://threejs.org/docs/#examples/en/loaders/OBJLoader) / [Format](https://en.wikipedia.org/wiki/Wavefront_.obj_file) / [Community](https://en.wikipedia.org/wiki/Wavefront_.obj_file)
- [FBXLoader](https://threejs.org/examples/#webgl_loader_fbx) — / [Example](https://threejs.org/examples/#webgl_loader_fbx) / [Docs](https://threejs.org/docs/#examples/en/loaders/FBXLoader) / [Format](https://en.wikipedia.org/wiki/FBX) / [Community](https://en.wikipedia.org/wiki/FBX)
- [STLLoader](https://threejs.org/examples/#webgl_loader_stl) — / [Example](https://threejs.org/examples/#webgl_loader_stl) / [Docs](https://threejs.org/docs/#examples/en/loaders/STLLoader) / [Format](https://en.wikipedia.org/wiki/STL_(file_format)) / [Community](https://en.wikipedia.org/wiki/STL_(file_format))
- [ColladaLoader](https://threejs.org/examples/#webgl_loader_collada) — / [Example](https://threejs.org/examples/#webgl_loader_collada) / [Docs](https://threejs.org/docs/#examples/en/loaders/ColladaLoader) / [Format](https://en.wikipedia.org/wiki/COLLADA) / [Community](https://en.wikipedia.org/wiki/COLLADA)

### 🏗️ Babylon.js Ecosystem

**Core Babylon.js:**
- [Babylon.js](https://www.babylonjs.com/) — / [Docs](https://doc.babylonjs.com/) / [Playground](https://playground.babylonjs.com/) / [GitHub](https://github.com/BabylonJS/Babylon.js) / [Tutorials](https://doc.babylonjs.com/start/chapter1) / [Community](https://forum.babylonjs.com/) / [YouTube](https://www.youtube.com/c/BabylonJS) / [Twitter](https://twitter.com/babylonjs)
- [Babylon Playground](https://playground.babylonjs.com/) — / [Playground](https://playground.babylonjs.com/) / [Docs](https://doc.babylonjs.com/) / [Examples](https://doc.babylonjs.com/examples/) / [Community](https://forum.babylonjs.com/) / [GitHub](https://github.com/BabylonJS/Babylon.js)
- [Babylon Documentation](https://doc.babylonjs.com/) — / [Docs](https://doc.babylonjs.com/) / [API](https://doc.babylonjs.com/) / [Tutorials](https://doc.babylonjs.com/start/chapter1) / [Examples](https://doc.babylonjs.com/examples/)

**Babylon.js Extensions:**
- [Babylon GUI](https://doc.babylonjs.com/features/featuresDeepDive/gui) — / [Docs](https://doc.babylonjs.com/features/featuresDeepDive/gui) / [AdvancedDynamicTexture](https://doc.babylonjs.com/api/classes/babylon.gui.advanceddynamictexture) / [Examples](https://doc.babylonjs.com/features/featuresDeepDive/gui) / [Community](https://forum.babylonjs.com/)
- [Babylon Physics](https://doc.babylonjs.com/features/featuresDeepDive/physics) — / [Docs](https://doc.babylonjs.com/features/featuresDeepDive/physics) / [Havok](https://doc.babylonjs.com/features/featuresDeepDive/physics/physicsEngines/havokPlugin) / [Oimo](https://doc.babylonjs.com/features/featuresDeepDive/physics/physicsEngines/oimoPlugin) / [Community](https://forum.babylonjs.com/)
- [Babylon Materials](https://doc.babylonjs.com/features/featuresDeepDive/materials) — / [Docs](https://doc.babylonjs.com/features/featuresDeepDive/materials) / [PBRMaterial](https://doc.babylonjs.com/api/classes/babylon.pbrmaterial) / [NodeMaterial](https://doc.babylonjs.com/api/classes/babylon.nodematerial) / [Community](https://forum.babylonjs.com/)
- [Babylon PostProcess](https://doc.babylonjs.com/features/featuresDeepDive/postProcesses) — / [Docs](https://doc.babylonjs.com/features/featuresDeepDive/postProcesses) / [Pipeline](https://doc.babylonjs.com/features/featuresDeepDive/postProcesses/usePostProcessRenderPipeline) / [Community](https://forum.babylonjs.com/)
- [Babylon Inspector](https://doc.babylonjs.com/features/featuresDeepDive/debugLayer) — / [Docs](https://doc.babylonjs.com/features/featuresDeepDive/debugLayer) / [Debug Layer](https://doc.babylonjs.com/features/featuresDeepDive/debugLayer) / [Community](https://forum.babylonjs.com/)

### 🎮 VR/AR Web

**VR Frameworks:**
- [A-Frame](https://aframe.io/) — / [Docs](https://aframe.io/docs/) / [GitHub](https://github.com/aframevr/aframe) / [Examples](https://aframe.io/examples/) / [Community](https://aframe.io/community/) / [YouTube](https://www.youtube.com/c/aframevr) / [Twitter](https://twitter.com/aframevr)
- [React VR](https://facebook.github.io/react-vr/) — / [Docs](https://facebook.github.io/react-vr/) / [GitHub](https://github.com/facebook/react-vr) / [Examples](https://facebook.github.io/react-vr/) / [Community](https://github.com/facebook/react-vr) / [YouTube](https://www.youtube.com/results?search_query=react+vr) / [Twitter](https://twitter.com/react)
- [WebXR](https://immersiveweb.dev/) — / [API](https://www.w3.org/TR/webxr/) / [Samples](https://immersive-web.github.io/webxr-samples/) / [Docs](https://immersiveweb.dev/) / [Community](https://immersiveweb.dev/) / [GitHub](https://github.com/immersive-web/webxr)
- [Cardboard](https://developers.google.com/cardboard/) — / [Docs](https://developers.google.com/cardboard/) / [API](https://developers.google.com/cardboard/) / [Examples](https://developers.google.com/cardboard/) / [Community](https://developers.google.com/cardboard/) / [YouTube](https://www.youtube.com/results?search_query=cardboard) / [Twitter](https://twitter.com/googlevr)

**AR Frameworks:**
- [AR.js](https://github.com/AR-js-org/AR.js) — / [GitHub](https://github.com/AR-js-org/AR.js) / [Docs](https://ar-js-org.github.io/AR.js/) / [Examples](https://ar-js-org.github.io/AR.js/) / [Community](https://github.com/AR-js-org/AR.js) / [YouTube](https://www.youtube.com/results?search_query=arjs) / [Twitter](https://twitter.com/arjs_org)
- [MindAR](https://github.com/hiukim/mind-ar-js) — / [GitHub](https://github.com/hiukim/mind-ar-js) / [Docs](https://hiukim.github.io/mind-ar-js/) / [Examples](https://hiukim.github.io/mind-ar-js/) / [Community](https://github.com/hiukim/mind-ar-js) / [YouTube](https://www.youtube.com/results?search_query=mindar) / [Twitter](https://twitter.com/hiukim)
- [8th Wall](https://www.8thwall.com/) — / [Docs](https://www.8thwall.com/docs) / [SDK](https://www.8thwall.com/) / [Examples](https://www.8thwall.com/examples) / [Community](https://www.8thwall.com/community) / [YouTube](https://www.youtube.com/c/8thWall) / [Twitter](https://twitter.com/8thWall)
- [Zappar](https://www.zappar.com/) — / [Docs](https://docs.zappar.com/) / [SDK](https://www.zappar.com/) / [Examples](https://www.zappar.com/examples) / [Community](https://www.zappar.com/community) / [YouTube](https://www.youtube.com/c/Zappar) / [Twitter](https://twitter.com/zappar)

### 📊 Visualization & Data

**Data Visualization:**
- [D3.js](https://d3js.org/) — / [Docs](https://github.com/d3/d3/wiki) / [GitHub](https://github.com/d3/d3) / [Examples](https://observablehq.com/@d3/gallery) / [Community](https://d3js.org/) / [YouTube](https://www.youtube.com/results?search_query=d3js) / [Twitter](https://twitter.com/d3js)
- [Deck.gl](https://deck.gl/) — / [Docs](https://deck.gl/) / [GitHub](https://github.com/visgl/deck.gl) / [Examples](https://deck.gl/examples) / [Community](https://github.com/visgl/deck.gl) / [YouTube](https://www.youtube.com/results?search_query=deckgl) / [Twitter](https://twitter.com/uber)
- [Luma.gl](https://luma.gl/) — / [Docs](https://luma.gl/) / [GitHub](https://github.com/visgl/luma.gl) / [Examples](https://luma.gl/examples) / [Community](https://github.com/visgl/luma.gl) / [YouTube](https://www.youtube.com/results?search_query=lumagl) / [Twitter](https://twitter.com/uber)
- [Vis.gl](https://vis.gl/) — / [Docs](https://vis.gl/) / [GitHub](https://github.com/visgl) / [Examples](https://vis.gl/examples) / [Community](https://github.com/visgl) / [YouTube](https://www.youtube.com/results?search_query=visgl) / [Twitter](https://twitter.com/uber)
- [Plotly](https://plotly.com/) — / [Docs](https://plotly.com/) / [GitHub](https://github.com/plotly/plotly.js) / [Examples](https://plotly.com/) / [Community](https://community.plotly.com/) / [YouTube](https://www.youtube.com/c/Plotly) / [Twitter](https://twitter.com/plotly)
- [Bokeh](https://bokeh.org/) — / [Docs](https://docs.bokeh.org/) / [GitHub](https://github.com/bokeh/bokeh) / [Examples](https://bokeh.org/) / [Community](https://discourse.bokeh.org/) / [YouTube](https://www.youtube.com/results?search_query=bokeh) / [Twitter](https://twitter.com/bokeh)
- [Chart.js](https://www.chartjs.org/) — / [Docs](https://www.chartjs.org/docs/) / [GitHub](https://github.com/chartjs/Chart.js) / [Examples](https://www.chartjs.org/docs/latest/samples/) / [Community](https://www.chartjs.org/docs/latest/) / [YouTube](https://www.youtube.com/results?search_query=chartjs) / [Twitter](https://twitter.com/chartjs)

**Maps & Geospatial:**
- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/) — / [Docs](https://docs.mapbox.com/mapbox-gl-js/) / [GitHub](https://github.com/mapbox/mapbox-gl-js) / [Examples](https://docs.mapbox.com/mapbox-gl-js/examples/) / [Community](https://www.mapbox.com/community/) / [YouTube](https://www.youtube.com/c/Mapbox) / [Twitter](https://twitter.com/mapbox)
- [Leaflet](https://leafletjs.com/) — / [Docs](https://leafletjs.com/) / [GitHub](https://github.com/Leaflet/Leaflet) / [Examples](https://leafletjs.com/examples.html) / [Community](https://leafletjs.com/) / [YouTube](https://www.youtube.com/results?search_query=leaflet) / [Twitter](https://twitter.com/Leaflet)
- [Cesium.js](https://cesium.com/) — / [Docs](https://cesium.com/) / [GitHub](https://github.com/CesiumGS/cesium) / [Examples](https://cesium.com/) / [Community](https://community.cesium.com/) / [YouTube](https://www.youtube.com/c/CesiumGS) / [Twitter](https://twitter.com/CesiumGS)
- [OpenLayers](https://openlayers.org/) — / [Docs](https://openlayers.org/) / [GitHub](https://github.com/openlayers/openlayers) / [Examples](https://openlayers.org/en/latest/examples/) / [Community](https://openlayers.org/) / [YouTube](https://www.youtube.com/results?search_query=openlayers) / [Twitter](https://twitter.com/openlayers)

### 🎨 Creative Coding

**Creative Libraries:**
- [p5.js](https://p5js.org/) — / [Docs](https://p5js.org/) / [GitHub](https://github.com/processing/p5.js) / [Examples](https://p5js.org/examples/) / [Community](https://p5js.org/community/) / [YouTube](https://www.youtube.com/c/p5js) / [Twitter](https://twitter.com/p5xjs)
- [Processing](https://processing.org/) — / [Docs](https://processing.org/) / [GitHub](https://github.com/processing/processing) / [Examples](https://processing.org/examples/) / [Community](https://processing.org/community/) / [YouTube](https://www.youtube.com/c/ProcessingFoundation) / [Twitter](https://twitter.com/processingorg)
- [OpenFrameworks](https://openframeworks.cc/) — / [Docs](https://openframeworks.cc/) / [GitHub](https://github.com/openframeworks/openFrameworks) / [Examples](https://openframeworks.cc/) / [Community](https://openframeworks.cc/) / [YouTube](https://www.youtube.com/results?search_query=openframeworks) / [Twitter](https://twitter.com/openframeworks)
- [Cinder](https://libcinder.org/) — / [Docs](https://libcinder.org/) / [GitHub](https://github.com/cinder/Cinder) / [Examples](https://libcinder.org/) / [Community](https://libcinder.org/) / [YouTube](https://www.youtube.com/results?search_query=cinder) / [Twitter](https://twitter.com/libcinder)
- [TouchDesigner](https://derivative.ca/) — / [Docs](https://docs.derivative.ca/) / [GitHub](https://github.com/derivative) / [Examples](https://docs.derivative.ca/) / [Community](https://forum.derivative.ca/) / [YouTube](https://www.youtube.com/results?search_query=touchdesigner) / [Twitter](https://twitter.com/derivative)

### 🔧 Development Tools

**WebGL/WebGPU Tools:**
- [WebGL Report](https://webglreport.com/) — / [WebGL](https://webglreport.com/) / [WebGL2](https://webglreport.com/?v=2) / [WebGPU](https://webglreport.com/?v=webgpu) / [Community](https://webglreport.com/)
- [Spector.js](https://spector.babylonjs.com/) — / [Chrome](https://chrome.google.com/webstore/detail/spectorjs/denbgaamihkadbilfifdlfdpghfikcjpo) / [Firefox](https://addons.mozilla.org/en-US/firefox/addon/spectorjs/) / [Docs](https://spector.babylonjs.com/) / [GitHub](https://github.com/BabylonJS/Spector.js) / [YouTube](https://www.youtube.com/results?search_query=spectorjs) / [Twitter](https://twitter.com/babylonjs)
- [WebGL Inspector](https://github.com/brendandahl/webgl-inspector) — / [GitHub](https://github.com/brendandahl/webgl-inspector) / [Chrome](https://chrome.google.com/webstore/detail/webgl-inspector/ogkcjfnlncljdnepjmljhlbnkffimhnf) / [Docs](https://github.com/brendandahl/webgl-inspector) / [YouTube](https://www.youtube.com/results?search_query=webgl+inspector) / [Twitter](https://twitter.com/brendandahl)
- [Bones](https://github.com/williamnguandj/bones) — / [GitHub](https://github.com/williamnguandj/bones) / [Docs](https://github.com/williamnguandj/bones) / [YouTube](https://www.youtube.com/results?search_query=bones+gl) / [Twitter](https://twitter.com/williamnguandj)

**Performance Tools:**
- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/) — / [Performance](https://developers.google.com/web/tools/chrome-devtools/performance) / [WebGL](https://developers.google.com/web/tools/chrome-devtools/javascript/webgl-inspector) / [Memory](https://developers.google.com/web/tools/chrome-devtools/memory-problems) / [Community](https://developers.google.com/web/tools/chrome-devtools/)
- [Firefox DevTools](https://developer.mozilla.org/pt-BR/docs/Tools) — / [Performance](https://developer.mozilla.org/pt-BR/docs/Tools/Performance) / [WebGL](https://developer.mozilla.org/pt-BR/docs/Tools/Web_Console) / [Memory](https://developer.mozilla.org/pt-BR/docs/Tools/Memory) / [Community](https://developer.mozilla.org/pt-BR/docs/Tools)
- [Safari Web Inspector](https://developer.apple.com/safari/tools/) — / [Performance](https://developer.apple.com/safari/tools/) / [WebGL](https://developer.apple.com/safari/tools/) / [Memory](https://developer.apple.com/safari/tools/) / [Community](https://developer.apple.com/safari/tools/)
- [Edge DevTools](https://docs.microsoft.com/microsoft-edge/devtools-guide) — / [Performance](https://docs.microsoft.com/microsoft-edge/devtools-guide/performance) / [WebGL](https://docs.microsoft.com/microsoft-edge/devtools-guide/console) / [Memory](https://docs.microsoft.com/microsoft-edge/devtools-guide/memory) / [Community](https://docs.microsoft.com/microsoft-edge/devtools-guide)

### 📚 Learning Resources

**WebGL Courses:**
- [WebGL Fundamentals](https://webglfundamentals.org/) — / [Docs](https://webglfundamentals.org/) / [GitHub](https://github.com/gpupublish/webglfundamentals-website) / [Tutorials](https://webglfundamentals.org/webgl/lessons/) / [Community](https://webglfundamentals.org/)
- [WebGL2 Fundamentals](https://webgl2fundamentals.org/) — / [Docs](https://webgl2fundamentals.org/) / [GitHub](https://github.com/gpupublish/webgl2fundamentals-website) / [Tutorials](https://webgl2fundamentals.org/) / [Community](https://webgl2fundamentals.org/)
- [MDN WebGL Tutorial](https://developer.mozilla.org/pt-BR/docs/Web/API/WebGL_API/Tutorial) — / [Docs](https://developer.mozilla.org/pt-BR/docs/Web/API/WebGL_API/Tutorial) / [Examples](https://developer.mozilla.org/pt-BR/docs/Web/API/WebGL_API/Tutorial) / [Community](https://developer.mozilla.org/pt-BR/docs/Web/API/WebGL_API/Tutorial)

**WebGPU Courses:**
- [WebGPU Fundamentals](https://webgpufundamentals.org/) — / [Docs](https://webgpufundamentals.org/) / [GitHub](https://github.com/gpupublish/webgpufundamentals-website) / [WGSL](https://www.w3.org/TR/WGSL/) / [Examples](https://webgpufundamentals.org/webgpu-lessons.html)
- [WebGPU GitHub](https://github.com/gpuweb/gpuweb) — / [GitHub](https://github.com/gpuweb/gpuweb) / [Design](https://github.com/gpuweb/gpuweb/blob/main/design/) / [Explainer](https://github.com/gpuweb/gpuweb/blob/main/explainer.md) / [Community](https://github.com/gpuweb/gpuweb)
- [WebGPU Samples](https://github.com/google/webgpu-samples) — / [GitHub](https://github.com/google/webgpu-samples) / [Live](https://google.github.io/webgpu-samples/) / [Docs](https://github.com/google/webgpu-samples) / [Contributing](https://github.com/google/webgpu-samples)

**Three.js Courses:**
- [Three.js Journey](https://threejs-journey.com/) — / [Course](https://threejs-journey.com/) / [Instructor](https://www.brunosimon.eu/) / [Discount](https://threejs-journey.com/) / [Community](https://threejs-journey.com/)
- [Three.js Fundamentals](https://threejsfundamentals.org/) — / [Docs](https://threejsfundamentals.org/) / [GitHub](https://github.com/threejsfundamentals/threejsfundamentals-website) / [Tutorials](https://threejsfundamentals.org/) / [Community](https://threejsfundamentals.org/)
- [Three.js TypeScript](https://github.com/tweenjs/three.ts) — / [GitHub](https://github.com/tweenjs/three.ts) / [Docs](https://github.com/tweenjs/three.ts) / [Examples](https://github.com/tweenjs/three.ts)

**Babylon.js Courses:**
- [Babylon.js Tutorials](https://doc.babylonjs.com/start/chapter1) — / [Docs](https://doc.babylonjs.com/start/chapter1) / [GitHub](https://github.com/BabylonJS/Babylon.js) / [Examples](https://doc.babylonjs.com/examples/) / [Community](https://forum.babylonjs.com/)
- [Babylon.js GitHub](https://github.com/BabylonJS/Babylon.js) — / [GitHub](https://github.com/BabylonJS/Babylon.js) / [Contributing](https://github.com/BabylonJS/Babylon.js) / [Issues](https://github.com/BabylonJS/Babylon.js/issues) / [Community](https://github.com/BabylonJS/Babylon.js)

### 🌍 Community & Forums

**WebGL Community:**
- [Reddit r/webgl](https://www.reddit.com/r/webgl/) — / [New](https://www.reddit.com/r/webgl/new/) / [Hot](https://www.reddit.com/r/webgl/hot/) / [Top](https://www.reddit.com/r/webgl/top/)
- [Stack Overflow WebGL](https://stackoverflow.com/questions/tagged/webgl) — / [Tag](https://stackoverflow.com/questions/tagged/webgl) / [Newest](https://stackoverflow.com/questions/tagged/webgl?tab=newest) / [Frequent](https://stackoverflow.com/questions/tagged/webgl?tab=frequent)
- [WebGL Forum](https://community.khronos.org/t/) — / [Main](https://community.khronos.org/t/) / [WebGL](https://community.khronos.org/t/webgl/) / [GLSL](https://community.khronos.org/t/glsl/) / [WGL](https://community.khronos.org/t/wgl/)
- [WebGL Discord](https://discord.gg/webgl) — / [Join](https://discord.gg/webgl) / [Channels](https://discord.gg/webgl) / [Members](https://discord.gg/webgl)

**WebGPU Community:**
- [Reddit r/webgpu](https://www.reddit.com/r/webgpu/) — / [New](https://www.reddit.com/r/webgpu/new/) / [Hot](https://www.reddit.com/r/webgpu/hot/) / [Top](https://www.reddit.com/r/webgpu/top/)
- [Stack Overflow WebGPU](https://stackoverflow.com/questions/tagged/webgpu) — / [Tag](https://stackoverflow.com/questions/tagged/webgpu) / [Newest](https://stackoverflow.com/questions/tagged/webgpu?tab=newest) / [Frequent](https://stackoverflow.com/questions/tagged/webgpu?tab=frequent)
- [WebGPU Forum](https://community.khronos.org/t/) — / [Main](https://community.khronos.org/t/) / [WebGPU](https://community.khronos.org/t/webgpu/) / [WGSL](https://community.khronos.org/t/wgsl/) / [SPIRV](https://community.khronos.org/t/spirv/)
- [WebGPU Discord](https://discord.gg/webgpu) — / [Join](https://discord.gg/webgpu) / [Channels](https://discord.gg/webgpu) / [Members](https://discord.gg/webgpu)

**Three.js Community:**
- [Reddit r/threejs](https://www.reddit.com/r/threejs/) — / [New](https://www.reddit.com/r/threejs/new/) / [Hot](https://www.reddit.com/r/threejs/hot/) / [Top](https://www.reddit.com/r/threejs/top/)
- [Stack Overflow Three.js](https://stackoverflow.com/questions/tagged/three.js) — / [Tag](https://stackoverflow.com/questions/tagged/three.js) / [Newest](https://stackoverflow.com/questions/tagged/three.js?tab=newest) / [Frequent](https://stackoverflow.com/questions/tagged/three.js?tab=frequent)
- [Three.js Discord](https://discord.gg/threejs) — / [Join](https://discord.gg/threejs) / [Channels](https://discord.gg/threejs) / [Members](https://discord.gg/threejs)
- [Three.js Forum](https://discourse.threejs.org/) — / [Main](https://discourse.threejs.org/) / [Support](https://discourse.threejs.org/c/support) / [Showcase](https://discourse.threejs.org/c/showcase) / [Collaboration](https://discourse.threejs.org/c/collaboration)

**Babylon.js Community:**
- [Reddit r/babylonjs](https://www.reddit.com/r/babylonjs/) — / [New](https://www.reddit.com/r/babylonjs/new/) / [Hot](https://www.reddit.com/r/babylonjs/hot/) / [Top](https://www.reddit.com/r/babylonjs/top/)
- [Stack Overflow Babylon.js](https://stackoverflow.com/questions/tagged/babylonjs) — / [Tag](https://stackoverflow.com/questions/tagged/babylonjs) / [Newest](https://stackoverflow.com/questions/tagged/babylonjs?tab=newest) / [Frequent](https://stackoverflow.com/questions/tagged/babylonjs?tab=frequent)
- [Babylon.js Forum](https://forum.babylonjs.com/) — / [Main](https://forum.babylonjs.com/) / [Support](https://forum.babylonjs.com/) / [Showcase](https://forum.babylonjs.com/) / [Development](https://forum.babylonjs.com/)
- [Babylon.js Discord](https://discord.gg/babylonjs) — / [Join](https://discord.gg/babylonjs) / [Channels](https://discord.gg/babylonjs) / [Members](https://discord.gg/babylonjs)

---

*Última atualização: 2026-08-31*  
*Este mega link dump segue o estilo FMHY para fornecer recursos extensivos sobre gráficos web e 3D.*
