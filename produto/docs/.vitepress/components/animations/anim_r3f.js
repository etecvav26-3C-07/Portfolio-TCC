export function createMesh(THREE) {
  const group = new THREE.Group();

  // Núcleo React (átomo com anéis orbitais)
  const coreGeom = new THREE.SphereGeometry(0.35, 24, 24);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x61dafb, // Azul React
    emissive: 0x0ea5e9,
    emissiveIntensity: 0.6,
    roughness: 0.2,
    metalness: 0.5
  });
  const core = new THREE.Mesh(coreGeom, coreMat);
  group.add(core);

  // 3 anéis elípticos orbitais representando o logo React / grafo de componentes
  const rings = [];
  for (let i = 0; i < 3; i++) {
    const ringGeom = new THREE.TorusGeometry(1.2, 0.025, 12, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.6
    });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.rotation.x = Math.PI / 2.3;
    ring.rotation.y = (i * Math.PI) / 3;
    group.add(ring);
    rings.push(ring);
  }

  // Componentes reativos flutuantes (cubos declarativos simulando nós do Drei / Spring)
  const nodeCount = 6;
  const nodes = [];
  const nodeGeom = new THREE.BoxGeometry(0.25, 0.25, 0.25);
  const colors = [0x38bdf8, 0xf472b6, 0xa855f7, 0x34d399, 0xfbbf24, 0x60a5fa];

  for (let i = 0; i < nodeCount; i++) {
    const mat = new THREE.MeshStandardMaterial({
      color: colors[i],
      roughness: 0.3,
      metalness: 0.4
    });
    const node = new THREE.Mesh(nodeGeom, mat);
    group.add(node);
    nodes.push(node);
  }

  // Linhas elásticas conectando o estado (state hooks) ao núcleo
  const lineGeom = new THREE.BufferGeometry();
  const linePositions = new Float32Array(nodeCount * 6);
  lineGeom.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x7dd3fc,
    transparent: true,
    opacity: 0.45
  });
  const linkLines = new THREE.LineSegments(lineGeom, lineMat);
  group.add(linkLines);

  group.userData = {
    core,
    rings,
    nodes,
    linkLines,
    elapsed: 0
  };

  return group;
}

export function update(mesh, dt) {
  const data = mesh.userData;
  data.elapsed += dt;
  const t = data.elapsed;

  // Pulso do núcleo React
  const coreScale = 1.0 + Math.sin(t * 3.5) * 0.08;
  data.core.scale.set(coreScale, coreScale, coreScale);
  data.core.rotation.y += dt * 0.5;

  // Rotação dos anéis orbitais
  data.rings.forEach((ring, i) => {
    ring.rotation.z += dt * (0.6 + i * 0.2);
  });

  // Movimento de mola elástica dos nós (Spring physics do R3F / Leva)
  const linePos = data.linkLines.geometry.attributes.position;
  data.nodes.forEach((node, i) => {
    const angle = (i / data.nodes.length) * Math.PI * 2 + t * 0.8;
    const radius = 1.35 + Math.sin(t * 2.5 + i) * 0.15;
    const y = Math.sin(t * 2.0 + i * 1.5) * 0.45;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    node.position.set(x, y, z);
    node.rotation.x += dt * 1.2;
    node.rotation.y += dt * 1.5;

    // Atualizar conexões de estado
    linePos.setXYZ(i * 2, 0, 0, 0);
    linePos.setXYZ(i * 2 + 1, x, y, z);
  });
  linePos.needsUpdate = true;

  mesh.rotation.y += dt * 0.12;
}
