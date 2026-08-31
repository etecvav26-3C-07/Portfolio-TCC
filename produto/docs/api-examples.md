---
title: Renderização Mobile
sidebar_label: Mobile
description: Renderização 3D e gráficos em dispositivos móveis, tecnologias e otimizações.
---

<script setup>
import ThreePanel from "./.vitepress/components/ThreePanel.vue";
</script>

# Renderização Mobile

> Renderização mobile é a criação de gráficos 3D e 2D otimizados para dispositivos como smartphones e tablets. Requer técnicas especiais de performance, memória e bateria.

Renderização em dispositivos móveis enfrenta desafios únicos: telas pequenas com resoluções variadas, poder de processamento limitado e consumo de bateria crítico. Este guia explora tecnologias e práticas para criar gráficos eficientes em mobile.

## Características principais

- **Performance**: otimização para GPUs e CPUs móveis limitadas.
- **Memória**: uso eficiente de RAM (geralmente 2-6GB disponíveis).
- **Bateria**: redução de consumo energético.
- **Resoluções variadas**: suporte para diferentes tamanhos de tela.
- **Touch**: interações por toque em vez de mouse/teclado.

## Visualização: renderização padrão

<ThreePanel topic="render" title="Renderização" subtitle="Processo de geração de imagem em dispositivos móveis." />

<ThreePanel topic="threejs" title="Cena compacta" subtitle="Menos pós-processo e geometria simples — padrão comum em mobile." />

A renderização em mobile usa a mesma lógica que desktop, mas com otimizações de qualidade e performance.

## Tecnologias principais

### WebGL e WebGPU

**WebGL** é o padrão atual para gráficos 3D na web mobile.

```javascript
// Contexto WebGL para mobile
const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl2', {
  antialias: false,        // desabilita anti-aliasing em mobile
  powerPreference: 'low-power', // usa GPU de baixa energia
  preserveDrawingBuffer: false   // economiza memória
});

// Limitar renderização a 30-60 FPS
let frameId;
const render = () => {
  frameId = requestAnimationFrame(render);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  // renderizar cena
};
```

**WebGPU** é a próxima geração, com melhor performance em mobile.

```javascript
// WebGPU (futuro de gráficos web)
const adapter = await navigator.gpu.requestAdapter({
  powerPreference: 'low-power' // adapta para mobile
});

const device = await adapter.requestDevice();
const canvas = document.getElementById('canvas');
const context = canvas.getContext('webgpu');
```

### Three.js para Mobile

Three.js é a biblioteca JavaScript 3D mais popular e oferece otimizações para mobile.

```javascript
import * as THREE from 'three';

// Cenário otimizado para mobile
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('canvas'),
  antialias: false,        // desativa anti-aliasing
  powerPreference: 'low-power',
  precision: 'lowp'        // reduz precisão para melhor performance
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio); // DPI nativo

// Limitar FPS em mobile
renderer.xr?.setFrameRate?.(30); // XR a 30 FPS se disponível

// Geometria otimizada
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
  map: texture,
  aoMap: aoTexture,
  roughnessMap: roughnessTexture // texturas com dados combinados
});
```

### Babylon.js

Babylon.js é outra engine JavaScript com suporte excelente a mobile.

```javascript
import * as BABYLON from '@babylonjs/core';

// Configuração mobile
const engine = new BABYLON.Engine(canvas, true, {
  preserveDrawingBuffer: false,
  stencil: false,
  disableWebGL2Support: false
});

const scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color3(0.1, 0.1, 0.2);

// Otimização: reduzir shadows
const light = new BABYLON.PointLight('light', BABYLON.Vector3.Zero(), scene);
light.range = 100;
light.intensity = 1.0;

// Textures com compressão
const texture = new BABYLON.CubeTexture('https://example.com/textures/sky', scene);
```

## Otimizações essenciais

### 1. Reduzir qualidade em mobile

```javascript
const isMobile = window.innerWidth < 768;

if (isMobile) {
  renderer.setPixelRatio(0.75); // Render a 75% da resolução
  scene.fog = new THREE.Fog(0x0b1220, 10, 50); // Reduz distância de render
  renderer.shadowMap.enabled = false; // Desabilita shadows
} else {
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
}
```

### 2. Limitar frame rate

```javascript
let lastFrameTime = 0;
const targetFPS = 30; // 30 FPS em mobile
const frameDuration = 1000 / targetFPS;

const animate = (currentTime) => {
  requestAnimationFrame(animate);
  
  if (currentTime - lastFrameTime >= frameDuration) {
    renderer.render(scene, camera);
    lastFrameTime = currentTime;
  }
};

animate(0);
```

### 3. Usar texturas comprimidas

```javascript
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';

const ktx2Loader = new KTX2Loader();
ktx2Loader.setTranscoderPath('path/to/basis/');

// Texturas KTX2 são menores e mais rápidas
const texture = await ktx2Loader.loadAsync('texture.ktx2');
```

### 4. Instancing para múltiplos objetos

```javascript
// Em vez de múltiplas meshes, usar instancing
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial();
const instancedMesh = new THREE.InstancedMesh(geometry, material, 1000);

// Posicionar instâncias
const matrix = new THREE.Matrix4();
for (let i = 0; i < 1000; i++) {
  matrix.setPosition(
    Math.random() * 100 - 50,
    Math.random() * 100 - 50,
    Math.random() * 100 - 50
  );
  instancedMesh.setMatrixAt(i, matrix);
}
instancedMesh.instanceMatrix.needsUpdate = true;
```

## Ferramentas para mobile rendering

### Desenvolvimento

- **React Native**: aplicações nativas com JavaScript
- **Flutter**: apps de alta performance (não é JavaScript, mas popular)
- **Capacitor**: web apps convertidas em apps nativas
- **NativeScript**: JavaScript direto em apps nativas

### Engines e Frameworks

- **PlayCanvas**: engine na cloud para mobile games
- **Needle Engine**: 3D web para mobile com suporte a AR/VR
- **Spline**: design 3D colaborativo com export para web
- **Needle Components**: integração 3D em aplicações web

## Performance em dispositivos reais

### Checklist de otimização

```markdown
- [ ] Pixel ratio reduzido em mobile (0.5 - 0.75)
- [ ] Shadows desabilitas ou de baixa qualidade
- [ ] Texturas comprimidas (KTX2, WebP)
- [ ] Limite de 30-60 FPS
- [ ] Sem post-processing pesado
- [ ] Geometrias de baixa densidade poligonal
- [ ] Fog para reduzir distância de render
- [ ] LOD (Level of Detail) para objetos distantes
- [ ] Instancing ao invés de múltiplas meshes
- [ ] Throttling de eventos de toque
```

### Monitoramento

```javascript
// Monitorar FPS
let frameCount = 0;
let lastTime = performance.now();

const measureFPS = () => {
  frameCount++;
  const currentTime = performance.now();
  
  if (currentTime - lastTime >= 1000) {
    console.log(`FPS: ${frameCount}`);
    frameCount = 0;
    lastTime = currentTime;
  }
};

// Chamar em cada frame
measureFPS();
```

## Exemplo completo: app 3D mobile simples

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>3D Mobile</title>
  <style>
    body { margin: 0; overflow: hidden; }
    canvas { display: block; width: 100%; height: 100%; }
  </style>
</head>
<body>
  <canvas id="canvas"></canvas>
  <script type="importmap">
    {
      "imports": {
        "three": "https://cdn.jsdelivr.net/npm/three@r128/build/three.module.js"
      }
    }
  </script>
  <script type="module">
    import * as THREE from 'three';

    // Setup
    const canvas = document.getElementById('canvas');
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      antialias: false,
      powerPreference: 'low-power'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      100
    );
    camera.position.z = 3;

    // Objeto
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ 
      color: 0x7e57c2,
      roughness: 0.5
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Luz
    const light = new THREE.PointLight(0xffffff, 1.2);
    light.position.set(2, 2, 3);
    scene.add(light);

    // Animar
    const animate = () => {
      requestAnimationFrame(animate);
      mesh.rotation.x += 0.008;
      mesh.rotation.y += 0.012;
      renderer.render(scene, camera);
    };

    // Redimensionar
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    animate();
  </script>
</body>
</html>
```

## Próximos passos

- Explore bibliotecas como **Three.js** e **Babylon.js** com exemplos mobile.
- Use ferramentas de profiling (Chrome DevTools) para medir performance.
- Teste em dispositivos reais para garantir otimizações.
- Estude **WebGPU** para a próxima geração de gráficos web.

