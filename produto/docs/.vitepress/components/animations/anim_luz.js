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

export function createMesh(THREE, context) {
  const group = new THREE.Group();

  if (context?.defaultLights) {
    context.defaultLights.forEach((light) => {
      light.visible = false;
    });
  }

  // 1. Esfera receptora central com alto brilho especular
  const sphereGeom = new THREE.SphereGeometry(0.85, 48, 48);
  const sphereMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    roughness: 0.15,
    metalness: 0.35
  });
  const sphere = new THREE.Mesh(sphereGeom, sphereMat);
  group.add(sphere);

  // Piso receptor com anel neon
  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(2.2, 48),
    new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.85,
      metalness: 0.1
    })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.1;
  group.add(floor);

  const floorRing = new THREE.Mesh(
    new THREE.RingGeometry(2.18, 2.22, 48),
    new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide })
  );
  floorRing.rotation.x = -Math.PI / 2;
  floorRing.position.y = -1.09;
  group.add(floorRing);

  // 2. Lâmpada / Fonte pontual em órbita
  const bulbGroup = new THREE.Group();
  const bulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.12, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xfef08a })
  );
  bulbGroup.add(bulb);

  const bulbHalo = new THREE.Mesh(
    new THREE.RingGeometry(0.15, 0.22, 24),
    new THREE.MeshBasicMaterial({ color: 0xfbbf24, side: THREE.DoubleSide, transparent: true, opacity: 0.6 })
  );
  bulbGroup.add(bulbHalo);

  const pointLight = new THREE.PointLight(0xfff7ed, 3.2, 12);
  bulbGroup.add(pointLight);
  group.add(bulbGroup);

  // Luz ambiente suave
  group.add(new THREE.AmbientLight(0xffffff, 0.15));

  // 3. Vetores matemáticos no vértice de foco
  // Ponto na superfície da esfera voltado para a frente-topo
  const P = new THREE.Vector3(0, 0.45, 0.72).normalize().multiplyScalar(0.85);
  const N = P.clone().normalize(); // Normal da esfera = direção do raio

  // Marcador no ponto P
  const marker = new THREE.Mesh(
    new THREE.SphereGeometry(0.04, 12, 12),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  marker.position.copy(P);
  group.add(marker);

  // Vetor Normal N (Ciano)
  const nLineGeom = new THREE.BufferGeometry().setFromPoints([P, P.clone().add(N.clone().multiplyScalar(0.65))]);
  const nLine = new THREE.Line(nLineGeom, new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 3 }));
  group.add(nLine);

  // Vetor Luz L (Âmbar) que aponta de P até a lâmpada
  const lLineGeom = new THREE.BufferGeometry().setFromPoints([P, P]);
  const lLine = new THREE.Line(lLineGeom, new THREE.LineBasicMaterial({ color: 0xfbbf24, linewidth: 3 }));
  group.add(lLine);

  // Vetor Reflexão Especular R (Rosa) = 2(N·L)N - L
  const rLineGeom = new THREE.BufferGeometry().setFromPoints([P, P]);
  const rLine = new THREE.Line(rLineGeom, new THREE.LineBasicMaterial({ color: 0xf472b6, linewidth: 3 }));
  group.add(rLine);

  // Vetor Visão V (Esmeralda) = em direção à câmera frontal padrão
  const V = new THREE.Vector3(0, 0.4, 4.2).sub(P).normalize();
  const vLineGeom = new THREE.BufferGeometry().setFromPoints([P, P.clone().add(V.clone().multiplyScalar(0.65))]);
  const vLine = new THREE.Line(vLineGeom, new THREE.LineBasicMaterial({ color: 0x34d399, linewidth: 3 }));
  group.add(vLine);

  // 4. Badges conceituais
  const titleBadge = createTextBadge(THREE, "Iluminação Phong: Ambiente + Difuso + Especular", "#38bdf8", 460, 60);
  titleBadge.position.set(0, 1.65, 0);
  titleBadge.scale.set(2.3, 0.3, 1);
  group.add(titleBadge);

  const formulaBadge = createTextBadge(THREE, "N·L = Difuso | (R·V)^α = Especular", "#fbbf24", 440, 60);
  formulaBadge.position.set(0, -1.45, 0);
  formulaBadge.scale.set(2.2, 0.3, 1);
  group.add(formulaBadge);

  group.userData = {
    bulbGroup,
    P,
    N,
    V,
    lLine,
    rLine,
    formulaBadge,
    elapsed: 0
  };

  return group;
}

export function update(mesh, dt) {
  const d = mesh.userData;
  d.elapsed += dt;
  const t = d.elapsed;

  // Movimento orbital suave da lâmpada
  const lx = Math.cos(t * 1.0) * 1.8;
  const lz = Math.sin(t * 1.0) * 1.8;
  const ly = 0.5 + Math.sin(t * 1.5) * 0.45;
  d.bulbGroup.position.set(lx, ly, lz);

  // Vetor L: de P até a lâmpada
  const L = d.bulbGroup.position.clone().sub(d.P).normalize();

  // Atualiza linha L
  const lPos = d.lLine.geometry.attributes.position;
  lPos.setXYZ(0, d.P.x, d.P.y, d.P.z);
  const lTip = d.P.clone().add(L.clone().multiplyScalar(0.75));
  lPos.setXYZ(1, lTip.x, lTip.y, lTip.z);
  lPos.needsUpdate = true;

  // Cálculo de Phong:
  // Difuso: N · L
  const NdotL = Math.max(0, d.N.dot(L));

  // Reflexão R = 2(N·L)N - L
  const R = d.N.clone().multiplyScalar(2 * d.N.dot(L)).sub(L).normalize();

  // Atualiza linha R
  const rPos = d.rLine.geometry.attributes.position;
  rPos.setXYZ(0, d.P.x, d.P.y, d.P.z);
  const rTip = d.P.clone().add(R.clone().multiplyScalar(0.75));
  rPos.setXYZ(1, rTip.x, rTip.y, rTip.z);
  rPos.needsUpdate = true;

  // Especular: (R · V)^alpha
  const RdotV = Math.max(0, R.dot(d.V));
  const shininess = 16;
  const specular = Math.pow(RdotV, shininess);

  // Telemetria em tempo real
  const difStr = `N·L: ${NdotL.toFixed(2)}`;
  const specStr = `(R·V)^16: ${specular.toFixed(2)}`;
  const specHighlight = specular > 0.35 ? " [BRILHO MÁXIMO]" : "";
  const color = specular > 0.35 ? "#f472b6" : (NdotL > 0.1 ? "#38bdf8" : "#94a3b8");

  updateBadgeText(d.formulaBadge, `${difStr} (Difusa) | ${specStr} (Especular)${specHighlight}`, color);
}
