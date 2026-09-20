function createTextBadge(THREE, text, color = "#38bdf8", width = 480, height = 70) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;

  ctx.beginPath();
  ctx.roundRect(4, 4, width - 8, height - 8, 12);
  ctx.fill();
  ctx.stroke();

  ctx.font = "bold 20px sans-serif";
  ctx.fillStyle = "#f8fafc";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, width / 2, height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(spriteMat);
  sprite.scale.set(width / 200, height / 200, 1);
  sprite.userData = { canvas, ctx, texture, width, height, color };
  return sprite;
}

export function createMesh(THREE) {
  const group = new THREE.Group();

  // Nós do grafo (Force-Directed Graph estilo D3.js)
  const nodeCount = 18;
  const nodes = [];
  const nodeGeom = new THREE.SphereGeometry(0.12, 16, 16);

  const colors = [0xf59e0b, 0xef4444, 0x3b82f6, 0x10b981, 0x8b5cf6, 0xec4899];

  for (let i = 0; i < nodeCount; i++) {
    const size = 0.08 + Math.random() * 0.12;
    const mat = new THREE.MeshStandardMaterial({
      color: colors[i % colors.length],
      roughness: 0.3,
      metalness: 0.4
    });
    const node = new THREE.Mesh(nodeGeom, mat);
    node.scale.set(size / 0.12, size / 0.12, size / 0.12);

    // Posições espaciais esféricas
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 0.8 + Math.random() * 0.8;

    node.position.set(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta)
    );

    group.add(node);
    nodes.push({
      mesh: node,
      basePos: node.position.clone(),
      phase: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random() * 0.8
    });
  }

  // Arestas de conexão do grafo D3 (links)
  const edgePairs = [
    [0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 7], [6, 8],
    [7, 9], [8, 10], [9, 11], [10, 12], [11, 13], [12, 14], [13, 15],
    [14, 16], [15, 17], [0, 10], [2, 12], [5, 15]
  ];

  const edgeLines = [];
  const edgeMat = new THREE.LineBasicMaterial({
    color: 0x64748b,
    transparent: true,
    opacity: 0.45
  });

  edgePairs.forEach((pair) => {
    const p1 = nodes[pair[0]].mesh.position;
    const p2 = nodes[pair[1]].mesh.position;
    const geom = new THREE.BufferGeometry().setFromPoints([p1, p2]);
    const line = new THREE.Line(geom, edgeMat);
    group.add(line);
    edgeLines.push({ line, pair });
  });

  // Badges conceituais didáticos
  const titleBadge = createTextBadge(THREE, "D3.js 3D: Grafo Direcionado por Forças (Force Graph)", "#38bdf8", 480, 60);
  titleBadge.position.set(0, 1.7, 0);
  titleBadge.scale.set(2.4, 0.3, 1);
  group.add(titleBadge);

  const statusBadge = createTextBadge(THREE, "Simulação Física: Repulsão de Carga + Tensão Elástica de Arestas", "#fbbf24", 510, 60);
  statusBadge.position.set(0, -1.5, 0);
  statusBadge.scale.set(2.55, 0.3, 1);
  group.add(statusBadge);

  group.userData = {
    nodes,
    edgeLines,
    statusBadge,
    elapsed: 0
  };

  return group;
}

export function update(mesh, dt) {
  const data = mesh.userData;
  data.elapsed += dt;
  const t = data.elapsed;

  // Simulação física de forças (respiração e atração/repulsão elástica)
  data.nodes.forEach((n, idx) => {
    const p = n.phase + t * n.speed;
    const offset = Math.sin(p) * 0.18;
    n.mesh.position.set(
      n.basePos.x + Math.sin(p * 1.2) * offset,
      n.basePos.y + Math.cos(p * 1.4) * offset,
      n.basePos.z + Math.sin(p * 0.8) * offset
    );

    // Pulsação métrica dos dados
    const pulse = 1.0 + Math.sin(t * 3.0 + idx) * 0.15;
    n.mesh.scale.setScalar(pulse);
  });

  // Atualizar pontas das arestas
  data.edgeLines.forEach((edge) => {
    const p1 = data.nodes[edge.pair[0]].mesh.position;
    const p2 = data.nodes[edge.pair[1]].mesh.position;
    const positions = edge.line.geometry.attributes.position;
    positions.setXYZ(0, p1.x, p1.y, p1.z);
    positions.setXYZ(1, p2.x, p2.y, p2.z);
    positions.needsUpdate = true;
  });

  mesh.rotation.y += dt * 0.2;
}
