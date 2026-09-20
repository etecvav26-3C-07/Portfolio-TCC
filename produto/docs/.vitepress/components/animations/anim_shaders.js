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

  // 1. Geometria Principal (Torus Knot)
  const geom = new THREE.TorusKnotGeometry(0.72, 0.22, 128, 32);
  const count = geom.attributes.position.count;
  const basePositions = geom.attributes.position.clone();
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    colors[i * 3] = 0.22;
    colors[i * 3 + 1] = 0.74;
    colors[i * 3 + 2] = 0.97;
  }
  geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.22,
    metalness: 0.65,
    wireframe: false
  });
  const mesh = new THREE.Mesh(geom, mat);
  group.add(mesh);

  // 2. Wireframe Fantasma de Referência (Lattice não-deformado do Vertex Shader)
  const ghostGeom = new THREE.TorusKnotGeometry(0.72, 0.22, 64, 16);
  const ghostMat = new THREE.MeshBasicMaterial({
    color: 0x64748b,
    wireframe: true,
    transparent: true,
    opacity: 0.22
  });
  const ghostMesh = new THREE.Mesh(ghostGeom, ghostMat);
  group.add(ghostMesh);

  // 3. Vetor de Deslocamento do Vertex Shader em um vértice probe
  const probeIdx = 0;
  const probeLineGeom = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, 0)
  ]);
  const probeLine = new THREE.Line(
    probeLineGeom,
    new THREE.LineBasicMaterial({ color: 0xfbbf24, linewidth: 3 })
  );
  group.add(probeLine);

  const probeMarker = new THREE.Mesh(
    new THREE.SphereGeometry(0.045, 12, 12),
    new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
  );
  group.add(probeMarker);

  // 4. Badges conceituais
  const titleBadge = createTextBadge(THREE, "Shaders: Vertex (Deformação) → Fragment (Cor)", "#38bdf8", 460, 60);
  titleBadge.position.set(0, 1.68, 0);
  titleBadge.scale.set(2.3, 0.3, 1);
  group.add(titleBadge);

  const statusBadge = createTextBadge(THREE, "VS: v' = v + n·sin(ωt) | FS: Cor Procedural RGB", "#fbbf24", 450, 60);
  statusBadge.position.set(0, -1.45, 0);
  statusBadge.scale.set(2.25, 0.3, 1);
  group.add(statusBadge);

  group.userData = {
    mesh,
    ghostMesh,
    geom,
    basePositions,
    probeIdx,
    probeLine,
    probeMarker,
    statusBadge,
    elapsed: 0
  };

  return group;
}

export function update(mesh, dt, THREE) {
  const d = mesh.userData;
  d.elapsed += dt;
  const t = d.elapsed;

  // Rotação sutil da geometria deformada e do referencial
  d.mesh.rotation.y += dt * 0.35;
  d.mesh.rotation.x += dt * 0.15;
  d.ghostMesh.rotation.copy(d.mesh.rotation);

  const positions = d.geom.attributes.position;
  const colors = d.geom.attributes.color;
  const base = d.basePositions;
  const count = positions.count;

  let maxDisp = 0;

  // Vertex Shader: Ondulação senoidal baseada em coordenadas espaciais
  for (let i = 0; i < count; i++) {
    const bx = base.getX(i);
    const by = base.getY(i);
    const bz = base.getZ(i);

    const wave = Math.sin(bx * 3.2 + t * 3.5) * Math.cos(by * 3.2 + t * 3.5) * 0.09;
    positions.setXYZ(i, bx + wave, by + wave, bz + wave);

    if (i === d.probeIdx) {
      maxDisp = wave;
    }

    // Fragment Shader: gradiente cromático procedural calculado por pixel/vértice
    const r = 0.45 + 0.45 * Math.sin(bx * 2.2 + t * 2.2);
    const g = 0.55 + 0.45 * Math.cos(by * 2.2 + t * 2.6);
    const b = 0.85 + 0.15 * Math.sin(bz * 2.2 + t * 1.8);
    colors.setXYZ(i, r, g, b);
  }

  positions.needsUpdate = true;
  colors.needsUpdate = true;

  // Atualiza probe vector conectando posição original (ghost) à posição deslocada (vertex shader)
  const origLocal = new THREE.Vector3(
    base.getX(d.probeIdx),
    base.getY(d.probeIdx),
    base.getZ(d.probeIdx)
  );
  const dispLocal = new THREE.Vector3(
    positions.getX(d.probeIdx),
    positions.getY(d.probeIdx),
    positions.getZ(d.probeIdx)
  );

  d.mesh.updateMatrixWorld(true);
  const origWorld = origLocal.clone().applyMatrix4(d.mesh.matrixWorld);
  const dispWorld = dispLocal.clone().applyMatrix4(d.mesh.matrixWorld);

  const pPos = d.probeLine.geometry.attributes.position;
  pPos.setXYZ(0, origWorld.x, origWorld.y, origWorld.z);
  pPos.setXYZ(1, dispWorld.x, dispWorld.y, dispWorld.z);
  pPos.needsUpdate = true;

  d.probeMarker.position.copy(dispWorld);

  // Telemetria do badge
  const dispStr = (maxDisp >= 0 ? "+" : "") + maxDisp.toFixed(3);
  updateBadgeText(d.statusBadge, `VS Deslocamento: Δy = ${dispStr} | FS: Cor Procedural RGB`);
}
