function createTextBadge(THREE, text, color = "#38bdf8", width = 340, height = 70) {
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

  // Geometria base (Icosaedro com faces facetadas)
  const geom = new THREE.IcosahedronGeometry(0.85, 1);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.35,
    metalness: 0.25,
    flatShading: true
  });
  const coreMesh = new THREE.Mesh(geom, mat);
  group.add(coreMesh);

  // Wireframe sutil sobre a malha
  const wireMat = new THREE.LineBasicMaterial({ color: 0x475569, transparent: true, opacity: 0.4 });
  const wireMesh = new THREE.LineSegments(new THREE.WireframeGeometry(geom), wireMat);
  coreMesh.add(wireMesh);

  // Sol / Fonte de luz direcional móvel
  const sunGroup = new THREE.Group();
  const sunMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.12, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xfef08a })
  );
  sunGroup.add(sunMesh);

  const sunHalo = new THREE.Mesh(
    new THREE.RingGeometry(0.15, 0.22, 24),
    new THREE.MeshBasicMaterial({ color: 0xfbbf24, side: THREE.DoubleSide, transparent: true, opacity: 0.6 })
  );
  sunGroup.add(sunHalo);

  const pointLight = new THREE.PointLight(0xfff7ed, 2.8, 10);
  sunGroup.add(pointLight);
  group.add(sunGroup);

  // Setas de normais em cada vértice
  const posAttr = geom.attributes.position;
  const normalAttr = geom.attributes.normal;
  const count = posAttr.count;

  const normalLength = 0.38;
  const coneGeom = new THREE.ConeGeometry(0.04, 0.1, 8);
  const normalItems = [];

  for (let i = 0; i < count; i += 2) {
    const vx = posAttr.getX(i);
    const vy = posAttr.getY(i);
    const vz = posAttr.getZ(i);

    const nx = normalAttr.getX(i);
    const ny = normalAttr.getY(i);
    const nz = normalAttr.getZ(i);

    const origin = new THREE.Vector3(vx, vy, vz);
    const dir = new THREE.Vector3(nx, ny, nz).normalize();
    const tip = origin.clone().add(dir.clone().multiplyScalar(normalLength));

    const lineGeom = new THREE.BufferGeometry().setFromPoints([origin, tip]);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85 });
    const line = new THREE.Line(lineGeom, lineMat);
    coreMesh.add(line);

    const coneMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const cone = new THREE.Mesh(coneGeom, coneMat);
    cone.position.copy(tip);
    cone.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    coreMesh.add(cone);

    normalItems.push({ origin, dir, lineMat, coneMat });
  }

  // Vértice em Destaque com o Frame TNB completo e Vetor de Luz
  const focusOrigin = normalItems[0].origin.clone();
  const focusNormal = normalItems[0].dir.clone();

  // Vetor Normal N (Ciano)
  const nLineGeom = new THREE.BufferGeometry().setFromPoints([
    focusOrigin,
    focusOrigin.clone().add(focusNormal.clone().multiplyScalar(0.75))
  ]);
  const nLine = new THREE.Line(nLineGeom, new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 3 }));
  coreMesh.add(nLine);

  // Vetor Luz L (Âmbar) que aponta do vértice para o Sol
  const lLineGeom = new THREE.BufferGeometry().setFromPoints([focusOrigin, focusOrigin]);
  const lLine = new THREE.Line(lLineGeom, new THREE.LineBasicMaterial({ color: 0xfbbf24, linewidth: 3 }));
  group.add(lLine);

  // Badge da Fórmula de Lambert
  const formulaBadge = createTextBadge(THREE, "cos(θ) = N · L = +0.85 (Iluminado)", "#38bdf8", 380, 70);
  formulaBadge.position.set(0, 1.45, 0);
  formulaBadge.scale.set(1.9, 0.35, 1);
  group.add(formulaBadge);

  // Badge do topo
  const titleBadge = createTextBadge(THREE, "Vetores Normais e Lei de Lambert (N · L)", "#fbbf24", 420, 60);
  titleBadge.position.set(0, 1.85, 0);
  titleBadge.scale.set(2.1, 0.3, 1);
  group.add(titleBadge);

  group.userData = {
    coreMesh,
    sunGroup,
    normalItems,
    focusOrigin,
    focusNormal,
    lLine,
    formulaBadge,
    elapsed: 0
  };

  return group;
}

export function update(mesh, dt) {
  const d = mesh.userData;
  d.elapsed += dt;
  const t = d.elapsed;

  // Órbita da fonte de luz (Sol)
  const sunRadius = 2.2;
  const sunX = Math.cos(t * 0.9) * sunRadius;
  const sunZ = Math.sin(t * 0.9) * sunRadius;
  const sunY = 0.6 + Math.sin(t * 1.3) * 0.5;
  d.sunGroup.position.set(sunX, sunY, sunZ);

  // Rotação suave da malha
  d.coreMesh.rotation.y += dt * 0.25;

  // Calcula a posição mundial do vértice em foco
  const worldFocus = d.focusOrigin.clone().applyMatrix4(d.coreMesh.matrixWorld);
  const worldNormal = d.focusNormal.clone().applyQuaternion(d.coreMesh.quaternion).normalize();

  // Vetor L (da superfície até a luz)
  const sunPos = d.sunGroup.position.clone();
  const dirToLight = sunPos.clone().sub(worldFocus).normalize();

  // Atualiza linha do vetor L
  const lPos = d.lLine.geometry.attributes.position;
  lPos.setXYZ(0, worldFocus.x, worldFocus.y, worldFocus.z);
  const lTip = worldFocus.clone().add(dirToLight.clone().multiplyScalar(0.75));
  lPos.setXYZ(1, lTip.x, lTip.y, lTip.z);
  lPos.needsUpdate = true;

  // Produto escalar cos(θ) = N · L
  const dot = Math.max(-1, Math.min(1, worldNormal.dot(dirToLight)));
  const isLit = dot > 0.05;

  // Atualiza badge da fórmula
  const dotStr = (dot >= 0 ? "+" : "") + dot.toFixed(2);
  const statusStr = isLit ? "Iluminado (Face visível)" : "Sombra (Face oclusa)";
  const statusColor = isLit ? "#34d399" : "#f43f5e";
  updateBadgeText(d.formulaBadge, `cos(θ) = N · L = ${dotStr} | ${statusStr}`, statusColor);

  // Colore todas as normais conforme incidência de luz
  const lightWorld = sunPos.clone().normalize();
  d.normalItems.forEach((item) => {
    const itemNormalWorld = item.dir.clone().applyQuaternion(d.coreMesh.quaternion);
    const itemDot = itemNormalWorld.dot(lightWorld);
    if (itemDot > 0.1) {
      item.lineMat.color.setHex(0x38bdf8); // Iluminado
      item.coneMat.color.setHex(0x34d399);
      item.lineMat.opacity = 0.9;
    } else {
      item.lineMat.color.setHex(0x475569); // Em sombra
      item.coneMat.color.setHex(0xf43f5e);
      item.lineMat.opacity = 0.35;
    }
  });
}
