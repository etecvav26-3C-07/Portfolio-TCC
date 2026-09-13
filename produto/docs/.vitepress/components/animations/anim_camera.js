function createTextBadge(THREE, text, color = "#38bdf8", width = 380, height = 70) {
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

  // 1. Objeto alvo central a ser capturado pela câmera
  const targetGeom = new THREE.IcosahedronGeometry(0.55, 1);
  const targetMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    roughness: 0.3,
    metalness: 0.5,
    flatShading: true
  });
  const target = new THREE.Mesh(targetGeom, targetMat);
  group.add(target);

  const targetWire = new THREE.LineSegments(
    new THREE.WireframeGeometry(targetGeom),
    new THREE.LineBasicMaterial({ color: 0xbae6fd, transparent: true, opacity: 0.5 })
  );
  target.add(targetWire);

  // 2. Câmera Virtual com Frustum Completo (Near Plane, Far Plane e Raios de Borda)
  const cameraRig = new THREE.Group();

  // Corpo da câmera física
  const camBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.22, 0.32),
    new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.4, metalness: 0.6 })
  );
  cameraRig.add(camBody);

  // Lente cilíndrica apontando no eixo -Z local
  const lens = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.1, 0.15, 16),
    new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2, metalness: 0.8 })
  );
  lens.rotation.x = Math.PI / 2;
  lens.position.z = -0.2;
  cameraRig.add(lens);

  // Plano de corte Near (Near Clipping Plane / Sensor de Imagem)
  const nearDist = 0.55;
  const nearWidth = 0.45;
  const nearHeight = 0.32;
  const nearGeom = new THREE.PlaneGeometry(nearWidth, nearHeight);
  const nearMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.35,
    side: THREE.DoubleSide
  });
  const nearPlane = new THREE.Mesh(nearGeom, nearMat);
  nearPlane.position.z = -nearDist;
  cameraRig.add(nearPlane);

  const nearBorder = new THREE.LineSegments(
    new THREE.EdgesGeometry(nearGeom),
    new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2 })
  );
  nearPlane.add(nearBorder);

  // Plano de corte Far (Far Clipping Plane)
  const farDist = 2.6;
  const farWidth = 1.95;
  const farHeight = 1.35;
  const farGeom = new THREE.PlaneGeometry(farWidth, farHeight);
  const farMat = new THREE.MeshBasicMaterial({
    color: 0x818cf8,
    transparent: true,
    opacity: 0.12,
    side: THREE.DoubleSide
  });
  const farPlane = new THREE.Mesh(farGeom, farMat);
  farPlane.position.z = -farDist;
  cameraRig.add(farPlane);

  const farBorder = new THREE.LineSegments(
    new THREE.EdgesGeometry(farGeom),
    new THREE.LineBasicMaterial({ color: 0x818cf8, linewidth: 2 })
  );
  farPlane.add(farBorder);

  // 4 Linhas de borda da pirâmide Frustum (do olho da câmera aos cantos do Far plane)
  const frustumPoints = [];
  const corners = [
    { x: -farWidth / 2, y: -farHeight / 2 },
    { x: farWidth / 2, y: -farHeight / 2 },
    { x: farWidth / 2, y: farHeight / 2 },
    { x: -farWidth / 2, y: farHeight / 2 }
  ];
  corners.forEach((c) => {
    frustumPoints.push(new THREE.Vector3(0, 0, 0));
    frustumPoints.push(new THREE.Vector3(c.x, c.y, -farDist));
  });

  const frustumLines = new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints(frustumPoints),
    new THREE.LineBasicMaterial({ color: 0x7dd3fc, transparent: true, opacity: 0.55 })
  );
  cameraRig.add(frustumLines);
  group.add(cameraRig);

  // Linha de Visão Central (Look-At Vector)
  const lookGeom = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)]);
  const lookLine = new THREE.Line(lookGeom, new THREE.LineBasicMaterial({ color: 0xfbbf24, linewidth: 2.5 }));
  group.add(lookLine);

  // Badges didáticos 3D
  const titleBadge = createTextBadge(THREE, "Câmera Virtual: Pirâmide Frustum & Projeção", "#38bdf8", 440, 60);
  titleBadge.position.set(0, 1.7, 0);
  titleBadge.scale.set(2.2, 0.3, 1);
  group.add(titleBadge);

  const statusBadge = createTextBadge(THREE, "LookAt(0,0,0) | Near: 0.55m | Far: 2.6m", "#fbbf24", 400, 60);
  statusBadge.position.set(0, -1.5, 0);
  statusBadge.scale.set(2.0, 0.3, 1);
  group.add(statusBadge);

  group.userData = {
    target,
    cameraRig,
    lookLine,
    statusBadge,
    elapsed: 0
  };

  return group;
}

export function update(mesh, dt) {
  const d = mesh.userData;
  d.elapsed += dt;
  const t = d.elapsed;

  // Órbita da câmera em torno do objeto alvo
  const radius = 2.4;
  const cx = Math.cos(t * 0.6) * radius;
  const cz = Math.sin(t * 0.6) * radius;
  const cy = 0.65 + Math.sin(t * 0.8) * 0.45;

  d.cameraRig.position.set(cx, cy, cz);
  d.cameraRig.lookAt(0, 0, 0);

  // Rotação suave do objeto alvo
  d.target.rotation.y += dt * 0.4;
  d.target.rotation.x += dt * 0.2;

  // Atualiza vetor de visão central (Look-at line)
  const lookPos = d.lookLine.geometry.attributes.position;
  lookPos.setXYZ(0, cx, cy, cz);
  lookPos.setXYZ(1, 0, 0, 0);
  lookPos.needsUpdate = true;

  // Atualiza telemetria no badge
  const eyeStr = `Eye(${cx.toFixed(1)}, ${cy.toFixed(1)}, ${cz.toFixed(1)})`;
  updateBadgeText(d.statusBadge, `${eyeStr} → LookAt(0,0,0) | FOV: 45°`);
}
