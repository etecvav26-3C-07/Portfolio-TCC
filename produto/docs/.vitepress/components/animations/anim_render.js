function createTextBadge(THREE, text, color = "#38bdf8", width = 460, height = 70) {
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

  // 1. Objeto central (Torus Knot PBR)
  const knotGeom = new THREE.TorusKnotGeometry(0.68, 0.22, 180, 28);
  const knotMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    roughness: 0.18,
    metalness: 0.82
  });
  const knot = new THREE.Mesh(knotGeom, knotMat);
  knot.position.y = 0.1;
  group.add(knot);

  // Pedestal e anéis holográficos
  const pedestalGeom = new THREE.CylinderGeometry(1.4, 1.6, 0.12, 36);
  const pedestalMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.4,
    metalness: 0.6
  });
  const pedestal = new THREE.Mesh(pedestalGeom, pedestalMat);
  pedestal.position.y = -0.95;
  group.add(pedestal);

  const ringGeom = new THREE.TorusGeometry(1.5, 0.025, 8, 48);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
  const haloRing = new THREE.Mesh(ringGeom, ringMat);
  haloRing.rotation.x = Math.PI / 2;
  haloRing.position.y = -0.88;
  group.add(haloRing);

  // 2. Luzes pontuais orbitais (Key Light âmbar & Fill Light rosa)
  const light1 = new THREE.PointLight(0xfbbf24, 2.8, 10);
  const light2 = new THREE.PointLight(0xf472b6, 2.2, 10);
  group.add(light1);
  group.add(light2);

  const bulb1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.08, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xfef08a })
  );
  const bulb2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.07, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xfbcfe8 })
  );
  group.add(bulb1);
  group.add(bulb2);

  // Linhas de luz apontando para o centro
  const l1LineGeom = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0.1, 0)]);
  const l1Line = new THREE.Line(l1LineGeom, new THREE.LineDashedMaterial({ color: 0xfbbf24, dashSize: 0.06, gapSize: 0.04 }));
  group.add(l1Line);

  const l2LineGeom = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0.1, 0)]);
  const l2Line = new THREE.Line(l2LineGeom, new THREE.LineDashedMaterial({ color: 0xf472b6, dashSize: 0.06, gapSize: 0.04 }));
  group.add(l2Line);

  // 3. Câmera virtual com frustum didático para simbolizar a captura da cena
  const camGroup = new THREE.Group();
  const camBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.24, 0.18, 0.28),
    new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5, metalness: 0.4 })
  );
  camGroup.add(camBody);

  const frustumGeom = new THREE.ConeGeometry(0.38, 0.7, 4, 1, true);
  const frustumMat = new THREE.MeshBasicMaterial({
    color: 0x67e8f9,
    wireframe: true,
    transparent: true,
    opacity: 0.4
  });
  const frustum = new THREE.Mesh(frustumGeom, frustumMat);
  frustum.rotation.x = -Math.PI / 2;
  frustum.position.z = 0.45;
  camGroup.add(frustum);

  camGroup.position.set(1.9, 0.75, 1.4);
  camGroup.lookAt(0, 0.1, 0);
  group.add(camGroup);

  // 4. Badges didáticos 3D
  const titleBadge = createTextBadge(THREE, "Equação de Render: Lₒ = Lₑ + ∫ fᵣ · Lᵢ · (n · ωᵢ) dω", "#38bdf8", 480, 60);
  titleBadge.position.set(0, 1.75, 0);
  titleBadge.scale.set(2.4, 0.3, 1);
  group.add(titleBadge);

  const statusBadge = createTextBadge(THREE, "Composição Final: Key Light + Fill Light + Câmera + PBR", "#fbbf24", 480, 60);
  statusBadge.position.set(0, -1.5, 0);
  statusBadge.scale.set(2.4, 0.3, 1);
  group.add(statusBadge);

  group.userData = {
    knot,
    light1,
    light2,
    bulb1,
    bulb2,
    l1Line,
    l2Line,
    camGroup,
    haloRing,
    statusBadge,
    elapsed: 0
  };

  return group;
}

export function update(mesh, dt) {
  const data = mesh.userData;
  data.elapsed += dt;
  const t = data.elapsed;

  // Rotação suave da malha principal
  data.knot.rotation.y += dt * 0.45;
  data.knot.rotation.x += dt * 0.15;

  // Órbita da luz chave (Key Light - âmbar)
  const l1x = Math.cos(t * 1.1) * 1.8;
  const l1z = Math.sin(t * 1.1) * 1.8;
  const l1y = 0.5 + Math.sin(t * 1.7) * 0.35;
  data.light1.position.set(l1x, l1y, l1z);
  data.bulb1.position.set(l1x, l1y, l1z);

  const p1 = data.l1Line.geometry.attributes.position;
  p1.setXYZ(0, l1x, l1y, l1z);
  p1.setXYZ(1, 0, 0.1, 0);
  p1.needsUpdate = true;
  data.l1Line.computeLineDistances();

  // Órbita da luz secundária (Fill Light - rosa)
  const l2x = Math.cos(t * 0.85 + Math.PI) * 1.6;
  const l2z = Math.sin(t * 0.85 + Math.PI) * 1.6;
  const l2y = 0.3 + Math.cos(t * 1.3) * 0.4;
  data.light2.position.set(l2x, l2y, l2z);
  data.bulb2.position.set(l2x, l2y, l2z);

  const p2 = data.l2Line.geometry.attributes.position;
  p2.setXYZ(0, l2x, l2y, l2z);
  p2.setXYZ(1, 0, 0.1, 0);
  p2.needsUpdate = true;
  data.l2Line.computeLineDistances();

  // Leve oscilação de respiração do anel de halo
  data.haloRing.rotation.z += dt * 0.2;
}
