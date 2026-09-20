function createTextBadge(THREE, text, color = "#38bdf8", width = 440, height = 70) {
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

function updateBadgeText(sprite, text, color = null) {
  const { canvas, ctx, texture, width, height } = sprite.userData;
  const strokeColor = color || sprite.userData.color;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
  ctx.strokeStyle = strokeColor;
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

  texture.needsUpdate = true;
}

export function createMesh(THREE) {
  const group = new THREE.Group();

  // 1. Geometria Base: Icosaedro (12 Vértices, 30 Arestas, 20 Faces)
  const geom = new THREE.IcosahedronGeometry(0.95, 0);

  // Faces sólidas semi-transparentes
  const solidMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.35,
    metalness: 0.35,
    transparent: true,
    opacity: 0.65,
    flatShading: true
  });
  const solidMesh = new THREE.Mesh(geom, solidMat);
  group.add(solidMesh);

  // Arestas destacadas em neon ciano
  const wireMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2.5 });
  const wireMesh = new THREE.LineSegments(new THREE.WireframeGeometry(geom), wireMat);
  solidMesh.add(wireMesh);

  // Vértices individuais esféricos (12 vértices únicos)
  const posAttr = geom.attributes.position;
  const uniqueVertices = [];
  const seen = new Set();

  for (let i = 0; i < posAttr.count; i++) {
    const v = new THREE.Vector3(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
    const key = `${v.x.toFixed(2)}|${v.y.toFixed(2)}|${v.z.toFixed(2)}`;
    if (!seen.has(key)) {
      seen.add(key);
      uniqueVertices.push(v);
    }
  }

  const vertGeom = new THREE.SphereGeometry(0.045, 12, 12);
  const vertMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
  const vertexMeshes = [];

  uniqueVertices.forEach((v, idx) => {
    const vm = new THREE.Mesh(vertGeom, vertMat.clone());
    vm.position.copy(v);
    solidMesh.add(vm);
    vertexMeshes.push(vm);
  });

  // 2. Vértice Primário em Destaque (V0 Probe) com linha de projeção para a origem
  const focusIdx = 0;
  const focusOrigin = uniqueVertices[focusIdx].clone();

  const probeLineGeom = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), focusOrigin]);
  const probeLine = new THREE.Line(
    probeLineGeom,
    new THREE.LineDashedMaterial({ color: 0xf472b6, dashSize: 0.05, gapSize: 0.04, linewidth: 2 })
  );
  probeLine.computeLineDistances();
  solidMesh.add(probeLine);

  const focusMarker = new THREE.Mesh(
    new THREE.SphereGeometry(0.065, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xf472b6 })
  );
  focusMarker.position.copy(focusOrigin);
  solidMesh.add(focusMarker);

  // 3. Badges conceituais didáticos
  const titleBadge = createTextBadge(THREE, "Modelagem 3D: Vértices (12) → Arestas (30) → Faces (20)", "#38bdf8", 480, 60);
  titleBadge.position.set(0, 1.68, 0);
  titleBadge.scale.set(2.4, 0.3, 1);
  group.add(titleBadge);

  const statusBadge = createTextBadge(THREE, "Euler: V - E + F = 2 | V₀: (x, y, z)", "#fbbf24", 440, 60);
  statusBadge.position.set(0, -1.45, 0);
  statusBadge.scale.set(2.2, 0.3, 1);
  group.add(statusBadge);

  group.userData = {
    solidMesh,
    uniqueVertices,
    focusOrigin,
    vertexMeshes,
    statusBadge,
    elapsed: 0
  };

  return group;
}

export function update(mesh, dt) {
  const d = mesh.userData;
  d.elapsed += dt;
  const t = d.elapsed;

  // Rotação suave da malha poligonal
  d.solidMesh.rotation.y += dt * 0.38;
  d.solidMesh.rotation.x += dt * 0.14;

  // Pulso sutil de iluminação nos vértices
  const pulse = 1 + Math.sin(t * 3) * 0.2;
  d.vertexMeshes.forEach((vm, i) => {
    const s = 1 + Math.sin(t * 3 + i) * 0.15;
    vm.scale.set(s, s, s);
  });

  // Calcula coordenadas mundiais do vértice probe V0
  d.solidMesh.updateMatrixWorld(true);
  const worldFocus = d.focusOrigin.clone().applyMatrix4(d.solidMesh.matrixWorld);
  const coordStr = `V₀(${worldFocus.x.toFixed(2)}, ${worldFocus.y.toFixed(2)}, ${worldFocus.z.toFixed(2)})`;

  updateBadgeText(d.statusBadge, `Euler: V - E + F = 2 | Coordenadas: ${coordStr}`);
}
