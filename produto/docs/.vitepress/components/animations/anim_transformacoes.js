function createTextBadge(THREE, text, color = "#38bdf8", width = 420, height = 70) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "rgba(15, 23, 42, 0.88)";
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
  ctx.fillStyle = "rgba(15, 23, 42, 0.88)";
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

  // Eixos cartesianos X (vermelho), Y (verde), Z (azul)
  const axes = new THREE.AxesHelper(1.6);
  group.add(axes);

  // Cubo Fantasma (Ghost) no ponto zero da origem
  const ghostGeom = new THREE.BoxGeometry(0.85, 0.85, 0.85);
  const ghostWire = new THREE.LineSegments(
    new THREE.EdgesGeometry(ghostGeom),
    new THREE.LineDashedMaterial({ color: 0x64748b, dashSize: 0.06, gapSize: 0.04, transparent: true, opacity: 0.4 })
  );
  ghostWire.computeLineDistances();
  group.add(ghostWire);

  // Cubo Ativo transformável
  const boxGeom = new THREE.BoxGeometry(0.85, 0.85, 0.85);
  const boxMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    roughness: 0.25,
    metalness: 0.45,
    transparent: true,
    opacity: 0.85
  });
  const box = new THREE.Mesh(boxGeom, boxMat);
  group.add(box);

  const boxWire = new THREE.LineSegments(
    new THREE.EdgesGeometry(boxGeom),
    new THREE.LineBasicMaterial({ color: 0xf8fafc, linewidth: 2 })
  );
  box.add(boxWire);

  // Vetor de Translação T (Linha da origem ao centro do cubo)
  const tLineGeom = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)]);
  const tLine = new THREE.Line(
    tLineGeom,
    new THREE.LineBasicMaterial({ color: 0xfbbf24, linewidth: 2.5 })
  );
  group.add(tLine);

  // Anel de Rotação Angular theta
  const rotRing = new THREE.Mesh(
    new THREE.RingGeometry(0.65, 0.72, 32),
    new THREE.MeshBasicMaterial({ color: 0xf472b6, side: THREE.DoubleSide, transparent: true, opacity: 0.6 })
  );
  rotRing.rotation.x = Math.PI / 2;
  group.add(rotRing);

  // Badges didáticos 3D
  const titleBadge = createTextBadge(THREE, "Transformações Afins: Matriz Model (M = T · R · S)", "#38bdf8", 460, 60);
  titleBadge.position.set(0, 1.65, 0);
  titleBadge.scale.set(2.3, 0.3, 1);
  group.add(titleBadge);

  const statusBadge = createTextBadge(THREE, "[1/3] Translação T: (Δx, Δy, Δz)", "#fbbf24", 420, 60);
  statusBadge.position.set(0, -1.45, 0);
  statusBadge.scale.set(2.1, 0.3, 1);
  group.add(statusBadge);

  group.userData = {
    box,
    tLine,
    rotRing,
    statusBadge,
    elapsed: 0
  };

  return group;
}

export function update(mesh, dt) {
  const d = mesh.userData;
  d.elapsed += dt;
  const cycle = 8.0;
  const t = d.elapsed % cycle;
  const box = d.box;

  box.position.set(0, 0, 0);
  box.rotation.set(0, 0, 0);
  box.scale.set(1, 1, 1);

  if (t < 2.6) {
    // FASE 1: Translação T
    const p = t / 2.6;
    const tx = Math.sin(p * Math.PI * 2) * 0.95;
    const ty = Math.sin(p * Math.PI * 4) * 0.25;
    box.position.set(tx, ty, 0);

    d.rotRing.visible = false;
    d.tLine.visible = true;

    // Atualiza linha do vetor T
    const posAttr = d.tLine.geometry.attributes.position;
    posAttr.setXYZ(0, 0, 0, 0);
    posAttr.setXYZ(1, tx, ty, 0);
    posAttr.needsUpdate = true;

    updateBadgeText(d.statusBadge, `[1/3] Translação T: Δx = ${tx.toFixed(2)}, Δy = ${ty.toFixed(2)}`, "#38bdf8");
  } else if (t < 5.3) {
    // FASE 2: Rotação R
    const p = (t - 2.6) / 2.7;
    const angle = p * Math.PI * 2;
    box.rotation.y = angle;
    box.rotation.x = Math.sin(angle) * 0.3;

    d.rotRing.visible = true;
    d.tLine.visible = false;
    d.rotRing.position.copy(box.position);

    const deg = Math.round(p * 360);
    updateBadgeText(d.statusBadge, `[2/3] Rotação R: θ = ${deg}° no Eixo Y`, "#f472b6");
  } else {
    // FASE 3: Escala S
    const p = (t - 5.3) / 2.7;
    const s = 0.55 + Math.abs(Math.sin(p * Math.PI)) * 0.85;
    box.scale.set(s, s, s);

    d.rotRing.visible = false;
    d.tLine.visible = false;

    updateBadgeText(d.statusBadge, `[3/3] Escala S: Fator = ${s.toFixed(2)}x`, "#fbbf24");
  }
}
