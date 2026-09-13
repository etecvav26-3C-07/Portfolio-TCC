function createUVTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  // Fundo base escuro
  ctx.fillStyle = "#0c1020";
  ctx.fillRect(0, 0, 512, 512);

  // 4 Quadrantes com cores didáticas distintas
  // Q1 (Inferior-Esquerdo): Azul ciano
  ctx.fillStyle = "rgba(14, 165, 233, 0.35)";
  ctx.fillRect(0, 256, 256, 256);

  // Q2 (Inferior-Direito): Âmbar dourado
  ctx.fillStyle = "rgba(245, 158, 11, 0.35)";
  ctx.fillRect(256, 256, 256, 256);

  // Q3 (Superior-Esquerdo): Rosa magenta
  ctx.fillStyle = "rgba(244, 63, 94, 0.35)";
  ctx.fillRect(0, 0, 256, 256);

  // Q4 (Superior-Direito): Esmeralda
  ctx.fillStyle = "rgba(16, 185, 129, 0.35)";
  ctx.fillRect(256, 0, 256, 256);

  // Grade de coordenadas UV
  ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
  ctx.lineWidth = 2;
  const step = 64;
  for (let x = 0; x <= 512; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 512);
    ctx.stroke();
  }
  for (let y = 0; y <= 512; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y);
    ctx.stroke();
  }

  // Eixos centrais mais destacados
  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 3;
  ctx.strokeRect(0, 0, 512, 512);

  ctx.beginPath();
  ctx.moveTo(256, 0); ctx.lineTo(256, 512);
  ctx.moveTo(0, 256); ctx.lineTo(512, 256);
  ctx.stroke();

  // Rótulos de coordenadas nos 4 cantos
  ctx.font = "bold 22px monospace";
  ctx.fillStyle = "#f8fafc";
  ctx.fillText("(0, 1)", 14, 34);
  ctx.fillText("(1, 1)", 420, 34);
  ctx.fillText("(0, 0)", 14, 496);
  ctx.fillText("(1, 0)", 420, 496);

  // Indicador de eixos +U e +V
  ctx.fillStyle = "#38bdf8";
  ctx.font = "bold 26px sans-serif";
  ctx.fillText("+U →", 210, 496);
  ctx.fillText("↑ +V", 14, 270);

  // Centro
  ctx.fillStyle = "#fbbf24";
  ctx.font = "bold 18px monospace";
  ctx.fillText("(0.5, 0.5)", 265, 250);

  return canvas;
}

function createTextBadge(THREE, text, color = "#38bdf8") {
  const canvas = document.createElement("canvas");
  canvas.width = 320;
  canvas.height = 70;
  const ctx = canvas.getContext("2d");

  // Moldura glassmorphism
  ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;

  ctx.beginPath();
  ctx.roundRect(4, 4, 312, 62, 12);
  ctx.fill();
  ctx.stroke();

  ctx.font = "bold 22px sans-serif";
  ctx.fillStyle = "#f8fafc";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 160, 35);

  const texture = new THREE.CanvasTexture(canvas);
  const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(spriteMat);
  sprite.scale.set(1.4, 0.32, 1);
  return sprite;
}

export function createMesh(THREE) {
  const group = new THREE.Group();

  const uvCanvas = createUVTexture();
  const texture = new THREE.CanvasTexture(uvCanvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  // ----------------------------------------------------
  // 1. ESPAÇO UV 2D (Plano à esquerda: x = -1.35)
  // ----------------------------------------------------
  const planeSize = 1.35;
  const planeGeom = new THREE.PlaneGeometry(planeSize, planeSize);
  const planeMat = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide
  });
  const uvPlane = new THREE.Mesh(planeGeom, planeMat);
  uvPlane.position.set(-1.35, 0, 0);
  group.add(uvPlane);

  // Borda neon do plano 2D
  const planeBorder = new THREE.LineSegments(
    new THREE.EdgesGeometry(planeGeom),
    new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2 })
  );
  uvPlane.add(planeBorder);

  // Badge do plano UV
  const badge2D = createTextBadge(THREE, "Espaço UV 2D [0, 1]", "#38bdf8");
  badge2D.position.set(-1.35, 0.95, 0);
  group.add(badge2D);

  // Cursor no plano 2D (ponto amostrado u, v)
  const cursor2D = new THREE.Mesh(
    new THREE.SphereGeometry(0.045, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xf43f5e })
  );
  cursor2D.position.set(-1.35, 0, 0.02);
  group.add(cursor2D);

  const ring2D = new THREE.Mesh(
    new THREE.RingGeometry(0.065, 0.085, 24),
    new THREE.MeshBasicMaterial({ color: 0xf43f5e, side: THREE.DoubleSide })
  );
  ring2D.position.set(-1.35, 0, 0.025);
  group.add(ring2D);

  // ----------------------------------------------------
  // 2. SUPERFÍCIE 3D (Cilindro Curvado à direita: x = 0.95)
  // ----------------------------------------------------
  const cylRadius = 0.65;
  const cylHeight = 1.35;
  const cylArc = Math.PI * 1.55; // Arco aberto permitindo ver interior e exterior
  const cylGeom = new THREE.CylinderGeometry(
    cylRadius,
    cylRadius,
    cylHeight,
    36,
    1,
    true,
    0,
    cylArc
  );

  const cylMat = new THREE.MeshStandardMaterial({
    map: texture,
    side: THREE.DoubleSide,
    roughness: 0.35,
    metalness: 0.15
  });
  const surface3D = new THREE.Mesh(cylGeom, cylMat);
  surface3D.position.set(0.95, 0, 0);
  surface3D.rotation.y = -Math.PI * 0.75;
  group.add(surface3D);

  // Wireframe sutil na superfície 3D
  const surfaceWire = new THREE.LineSegments(
    new THREE.WireframeGeometry(cylGeom),
    new THREE.LineBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.25 })
  );
  surface3D.add(surfaceWire);

  // Badge da superfície 3D
  const badge3D = createTextBadge(THREE, "Superfície 3D (X, Y, Z)", "#34d399");
  badge3D.position.set(0.95, 0.95, 0);
  group.add(badge3D);

  // Cursor na superfície 3D (ponto amostrado 3D)
  const cursor3D = new THREE.Mesh(
    new THREE.SphereGeometry(0.045, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xf43f5e })
  );
  group.add(cursor3D);

  const ring3D = new THREE.Mesh(
    new THREE.RingGeometry(0.065, 0.085, 24),
    new THREE.MeshBasicMaterial({ color: 0xf43f5e, side: THREE.DoubleSide })
  );
  group.add(ring3D);

  // ----------------------------------------------------
  // 3. RAIO LASER DE PROJEÇÃO DINÂMICA (2D UV → 3D)
  // ----------------------------------------------------
  const beamPoints = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)];
  const beamGeom = new THREE.BufferGeometry().setFromPoints(beamPoints);
  const beamLine = new THREE.Line(
    beamGeom,
    new THREE.LineBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.9,
      linewidth: 2
    })
  );
  group.add(beamLine);

  // Fóton / Partícula viajante ao longo do feixe laser
  const photon = new THREE.Mesh(
    new THREE.SphereGeometry(0.035, 12, 12),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  group.add(photon);

  // Badge central indicando a função de amostragem
  const samplingBadge = createTextBadge(THREE, "Amostragem GPU: (u,v) → S(x,y,z)", "#fbbf24");
  samplingBadge.position.set(-0.2, 0.55, 0.2);
  samplingBadge.scale.set(1.6, 0.35, 1);
  group.add(samplingBadge);

  // Linhas guia conectando os cantos
  const cornerLinesGeom = new THREE.BufferGeometry();
  const cornerPos = new Float32Array(4 * 2 * 3); // 4 cantos x 2 pontos x 3 coords
  cornerLinesGeom.setAttribute("position", new THREE.BufferAttribute(cornerPos, 3));
  const cornerLines = new THREE.LineSegments(
    cornerLinesGeom,
    new THREE.LineDashedMaterial({
      color: 0x64748b,
      dashSize: 0.08,
      gapSize: 0.05,
      transparent: true,
      opacity: 0.4
    })
  );
  group.add(cornerLines);

  group.userData = {
    uvPlane,
    surface3D,
    cursor2D,
    ring2D,
    cursor3D,
    ring3D,
    beamLine,
    photon,
    cornerLines,
    samplingBadge,
    planeSize,
    cylRadius,
    cylHeight,
    cylArc,
    elapsed: 0
  };

  return group;
}

export function update(mesh, dt) {
  const d = mesh.userData;
  d.elapsed += dt;
  const t = d.elapsed;

  // Movimento suave do cursor UV em curva contínua de Lissajous dentro de [0.1, 0.9]
  const u = 0.5 + 0.36 * Math.cos(t * 1.15);
  const v = 0.5 + 0.36 * Math.sin(t * 0.85);

  // Posição no plano 2D UV
  const p2x = -1.35 + (u - 0.5) * d.planeSize;
  const p2y = (v - 0.5) * d.planeSize;
  const p2z = 0.025;

  d.cursor2D.position.set(p2x, p2y, p2z);
  d.ring2D.position.set(p2x, p2y, p2z + 0.005);
  const pulse = 1 + Math.sin(t * 6) * 0.18;
  d.ring2D.scale.set(pulse, pulse, 1);

  // Posição correspondente na Superfície 3D (Cilindro curvilíneo)
  // O cilindro tem rotação y = -Math.PI * 0.75
  const baseAngle = -Math.PI * 0.75;
  const theta = baseAngle + u * d.cylArc;
  const p3x = 0.95 + d.cylRadius * Math.cos(theta);
  const p3y = (v - 0.5) * d.cylHeight;
  const p3z = d.cylRadius * Math.sin(theta);

  d.cursor3D.position.set(p3x, p3y, p3z);
  d.ring3D.position.set(p3x, p3y, p3z);
  d.ring3D.lookAt(0.95, p3y, 0); // Alinha o anel perpendicular à superfície normal
  d.ring3D.scale.set(pulse, pulse, 1);

  // Atualiza feixe de luz laser
  const posAttr = d.beamLine.geometry.attributes.position;
  posAttr.setXYZ(0, p2x, p2y, p2z);
  posAttr.setXYZ(1, p3x, p3y, p3z);
  posAttr.needsUpdate = true;

  // Fóton viajante (vai de 2D para 3D em ciclo de 1 segundo)
  const photonProgress = (t * 1.4) % 1.0;
  const phX = p2x + (p3x - p2x) * photonProgress;
  const phY = p2y + (p3y - p2y) * photonProgress;
  const phZ = p2z + (p3z - p2z) * photonProgress;
  d.photon.position.set(phX, phY, phZ);

  // Atualiza linhas guia dos 4 cantos
  const cAttr = d.cornerLines.geometry.attributes.position;
  const cornersUV = [
    { u: 0, v: 0 },
    { u: 1, v: 0 },
    { u: 0, v: 1 },
    { u: 1, v: 1 }
  ];

  cornersUV.forEach((c, idx) => {
    const cx2 = -1.35 + (c.u - 0.5) * d.planeSize;
    const cy2 = (c.v - 0.5) * d.planeSize;
    const cz2 = 0;

    const cTheta = baseAngle + c.u * d.cylArc;
    const cx3 = 0.95 + d.cylRadius * Math.cos(cTheta);
    const cy3 = (c.v - 0.5) * d.cylHeight;
    const cz3 = d.cylRadius * Math.sin(cTheta);

    cAttr.setXYZ(idx * 2, cx2, cy2, cz2);
    cAttr.setXYZ(idx * 2 + 1, cx3, cy3, cz3);
  });
  cAttr.needsUpdate = true;
  d.cornerLines.computeLineDistances();

  // Leve flutuação do badge de amostragem
  d.samplingBadge.position.y = 0.55 + Math.sin(t * 2) * 0.04;
}
