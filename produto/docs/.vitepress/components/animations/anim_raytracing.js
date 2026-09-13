function createTextBadge(THREE, text, color = "#38bdf8", width = 440, height = 70) {
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

  // 1. Esfera reflexiva central
  const sphereGeom = new THREE.SphereGeometry(0.72, 36, 36);
  const sphereMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    roughness: 0.08,
    metalness: 0.9
  });
  const sphere = new THREE.Mesh(sphereGeom, sphereMat);
  sphere.position.set(0, 0, 0);
  group.add(sphere);

  // Caixa Delimitadora AABB da BVH em torno da esfera central
  const aabbGeom = new THREE.BoxGeometry(1.5, 1.5, 1.5);
  const aabbWire = new THREE.LineSegments(
    new THREE.EdgesGeometry(aabbGeom),
    new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.35 })
  );
  group.add(aabbWire);

  // Segunda esfera secundária (vidro/refrativa fictícia)
  const sphere2Geom = new THREE.SphereGeometry(0.38, 28, 28);
  const sphere2Mat = new THREE.MeshStandardMaterial({
    color: 0xf472b6,
    roughness: 0.15,
    metalness: 0.75
  });
  const sphere2 = new THREE.Mesh(sphere2Geom, sphere2Mat);
  sphere2.position.set(1.3, 0.3, -0.4);
  group.add(sphere2);

  // Piso receptor quadriculado
  const floorGeom = new THREE.PlaneGeometry(3.6, 3.6, 16, 16);
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.6,
    metalness: 0.1,
    wireframe: true
  });
  const floor = new THREE.Mesh(floorGeom, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.95;
  group.add(floor);

  // 2. Câmera virtual que dispara o raio primário
  const camOrigin = new THREE.Vector3(-1.9, 0.75, 1.35);
  const camMesh = new THREE.Mesh(
    new THREE.ConeGeometry(0.18, 0.38, 16),
    new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.3, metalness: 0.5 })
  );
  camMesh.rotation.x = Math.PI / 2;
  camMesh.position.copy(camOrigin);
  camMesh.lookAt(0, 0, 0);
  group.add(camMesh);

  // Fonte de luz (Sol) para raios de sombra (Shadow Ray)
  const lightOrigin = new THREE.Vector3(1.8, 1.8, 1.2);
  const sunMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.12, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xfef08a })
  );
  sunMesh.position.copy(lightOrigin);
  group.add(sunMesh);

  // 3. Trajetória Óptica:
  // Raio Primário (Amarelo: Câmera → Ponto de Impacto)
  const primaryRayGeom = new THREE.BufferGeometry().setFromPoints([camOrigin, new THREE.Vector3(0, 0, 0)]);
  const primaryRay = new THREE.Line(
    primaryRayGeom,
    new THREE.LineBasicMaterial({ color: 0xfbbf24, linewidth: 3 })
  );
  group.add(primaryRay);

  // Ponto de Impacto (Hit Point) com marcador
  const hitMarker = new THREE.Mesh(
    new THREE.SphereGeometry(0.045, 12, 12),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  group.add(hitMarker);

  // Vetor Normal N no Ponto de Impacto (Ciano)
  const normalLineGeom = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)]);
  const normalLine = new THREE.Line(
    normalLineGeom,
    new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2.5 })
  );
  group.add(normalLine);

  // Raio Secundário Refletido (Rosa: Hit Point → Chão/Espaço)
  const reflectRayGeom = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)]);
  const reflectRay = new THREE.Line(
    reflectRayGeom,
    new THREE.LineBasicMaterial({ color: 0xf472b6, linewidth: 3 })
  );
  group.add(reflectRay);

  // Raio de Sombra (Shadow Ray: Hit Point → Luz)
  const shadowRayGeom = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), lightOrigin]);
  const shadowRay = new THREE.Line(
    shadowRayGeom,
    new THREE.LineDashedMaterial({ color: 0x34d399, dashSize: 0.08, gapSize: 0.05, linewidth: 2 })
  );
  group.add(shadowRay);

  // Fóton animado percorrendo o caminho do raio
  const photon = new THREE.Mesh(
    new THREE.SphereGeometry(0.035, 12, 12),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  group.add(photon);

  // 4. Badges didáticos 3D
  const titleBadge = createTextBadge(THREE, "Ray Tracing: Primário → Intersecção → Reflexão", "#38bdf8", 460, 60);
  titleBadge.position.set(0, 1.75, 0);
  titleBadge.scale.set(2.3, 0.3, 1);
  group.add(titleBadge);

  const statusBadge = createTextBadge(THREE, "BVH AABB: Hit | Intersecção: t = 1.62m | Sombra: Desobstruída", "#34d399", 480, 60);
  statusBadge.position.set(0, -1.45, 0);
  statusBadge.scale.set(2.4, 0.3, 1);
  group.add(statusBadge);

  group.userData = {
    sphere,
    sphere2,
    camOrigin,
    lightOrigin,
    primaryRay,
    hitMarker,
    normalLine,
    reflectRay,
    shadowRay,
    photon,
    statusBadge,
    elapsed: 0
  };

  return group;
}

export function update(mesh, dt) {
  const d = mesh.userData;
  d.elapsed += dt;
  const t = d.elapsed;

  // Órbita da esfera secundária
  const s2x = Math.cos(t * 0.75) * 1.35;
  const s2z = Math.sin(t * 0.75) * 1.35;
  const s2y = 0.25 + Math.sin(t * 1.1) * 0.3;
  d.sphere2.position.set(s2x, s2y, s2z);

  // Ponto de impacto na esfera central variando suavemente
  const r = 0.72;
  const hitAngle = Math.sin(t * 0.9) * 0.45;
  const hitElevation = 0.15 + Math.cos(t * 1.2) * 0.25;

  const hitPoint = new THREE.Vector3(
    Math.sin(hitAngle) * r,
    hitElevation,
    Math.cos(hitAngle) * r
  );
  d.hitMarker.position.copy(hitPoint);

  // 1. Atualiza Raio Primário (Câmera → Hit Point)
  const pPos = d.primaryRay.geometry.attributes.position;
  pPos.setXYZ(0, d.camOrigin.x, d.camOrigin.y, d.camOrigin.z);
  pPos.setXYZ(1, hitPoint.x, hitPoint.y, hitPoint.z);
  pPos.needsUpdate = true;

  // 2. Normal de superfície em hitPoint
  const normal = hitPoint.clone().normalize();
  const nPos = d.normalLine.geometry.attributes.position;
  nPos.setXYZ(0, hitPoint.x, hitPoint.y, hitPoint.z);
  const nTip = hitPoint.clone().add(normal.clone().multiplyScalar(0.45));
  nPos.setXYZ(1, nTip.x, nTip.y, nTip.z);
  nPos.needsUpdate = true;

  // 3. Raio Refletido R = D - 2(D·N)N
  const incident = hitPoint.clone().sub(d.camOrigin).normalize();
  const reflected = incident.clone().sub(normal.clone().multiplyScalar(2 * incident.dot(normal))).normalize();
  const bounceEnd = hitPoint.clone().add(reflected.multiplyScalar(1.65));

  const rPos = d.reflectRay.geometry.attributes.position;
  rPos.setXYZ(0, hitPoint.x, hitPoint.y, hitPoint.z);
  rPos.setXYZ(1, bounceEnd.x, bounceEnd.y, bounceEnd.z);
  rPos.needsUpdate = true;

  // 4. Raio de Sombra (Shadow Ray: Hit Point → Luz)
  const sPos = d.shadowRay.geometry.attributes.position;
  sPos.setXYZ(0, hitPoint.x, hitPoint.y, hitPoint.z);
  sPos.setXYZ(1, d.lightOrigin.x, d.lightOrigin.y, d.lightOrigin.z);
  sPos.needsUpdate = true;
  d.shadowRay.computeLineDistances();

  // 5. Fóton viajante: percorre Primary Ray (0 a 0.5) e Reflected Ray (0.5 a 1.0)
  const cycle = (t * 0.9) % 1.0;
  if (cycle < 0.5) {
    const p = cycle / 0.5;
    d.photon.position.lerpVectors(d.camOrigin, hitPoint, p);
  } else {
    const p = (cycle - 0.5) / 0.5;
    d.photon.position.lerpVectors(hitPoint, bounceEnd, p);
  }

  // Telemetria do badge
  const dist = d.camOrigin.distanceTo(hitPoint);
  updateBadgeText(d.statusBadge, `BVH AABB: Hit | Intersecção: t = ${dist.toFixed(2)}m | Raio de Sombra: Ativo`);
}
