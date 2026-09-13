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

export function createMesh(THREE) {
  const group = new THREE.Group();

  // 1. Grade discreta de pixels do Framebuffer (fundo x = 0, y = 0, z = -0.2)
  const cols = 12;
  const rows = 12;
  const cellSize = 0.18;
  const gap = 0.015;
  const step = cellSize + gap;
  const originX = -((cols - 1) * step) / 2;
  const originY = ((rows - 1) * step) / 2;

  const pixelMeshes = [];
  const pixelGeom = new THREE.PlaneGeometry(cellSize, cellSize);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const px = originX + c * step;
      const py = originY - r * step;

      const pMat = new THREE.MeshBasicMaterial({
        color: 0x1e293b,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide
      });
      const pixel = new THREE.Mesh(pixelGeom, pMat);
      pixel.position.set(px, py, -0.05);
      group.add(pixel);

      pixelMeshes.push({ mesh: pixel, col: c, row: r, x: px, y: py, mat: pMat });
    }
  }

  // Moldura do Framebuffer
  const frameWidth = cols * step + 0.1;
  const frameHeight = rows * step + 0.1;
  const frameGeom = new THREE.PlaneGeometry(frameWidth, frameHeight);
  const frameWire = new THREE.LineSegments(
    new THREE.EdgesGeometry(frameGeom),
    new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2 })
  );
  frameWire.position.set(0, 0, -0.055);
  group.add(frameWire);

  // 2. Triângulo Vetorial Contínuo flutuando à frente (z = 0.35)
  // Vértices do triângulo normalizados
  const v0 = new THREE.Vector3(-0.75, -0.65, 0.35);
  const v1 = new THREE.Vector3(0.8, -0.45, 0.35);
  const v2 = new THREE.Vector3(-0.15, 0.85, 0.35);

  const triGeom = new THREE.BufferGeometry().setFromPoints([v0, v1, v2, v0]);
  const triWire = new THREE.Line(triGeom, new THREE.LineBasicMaterial({ color: 0xf472b6, linewidth: 3 }));
  group.add(triWire);

  // Superfície translúcida do triângulo
  const triFaceGeom = new THREE.BufferGeometry();
  triFaceGeom.setFromPoints([v0, v1, v2]);
  triFaceGeom.setIndex([0, 1, 2]);
  const triFaceMat = new THREE.MeshBasicMaterial({
    color: 0xf472b6,
    transparent: true,
    opacity: 0.25,
    side: THREE.DoubleSide
  });
  const triFace = new THREE.Mesh(triFaceGeom, triFaceMat);
  group.add(triFace);

  // Esferas nos vértices do triângulo (V0, V1, V2)
  const vertGeom = new THREE.SphereGeometry(0.05, 16, 16);
  const vertMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
  [v0, v1, v2].forEach((v) => {
    const s = new THREE.Mesh(vertGeom, vertMat);
    s.position.copy(v);
    group.add(s);
  });

  // Linhas de projeção conectando os 3 vértices ao plano do Framebuffer
  [v0, v1, v2].forEach((v) => {
    const projLineGeom = new THREE.BufferGeometry().setFromPoints([
      v,
      new THREE.Vector3(v.x, v.y, -0.05)
    ]);
    const projLine = new THREE.Line(
      projLineGeom,
      new THREE.LineDashedMaterial({ color: 0x94a3b8, dashSize: 0.05, gapSize: 0.04, transparent: true, opacity: 0.5 })
    );
    projLine.computeLineDistances();
    group.add(projLine);
  });

  // 3. Scanline / Linha de varredura do rasterizador
  const scanGeom = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-frameWidth / 2, 0, 0.36),
    new THREE.Vector3(frameWidth / 2, 0, 0.36)
  ]);
  const scanLine = new THREE.Line(
    scanGeom,
    new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2.5 })
  );
  group.add(scanLine);

  // 4. Badges conceituais
  const titleBadge = createTextBadge(THREE, "Rasterização: Primitiva 2D → Fragmentos de Pixel", "#38bdf8", 440, 60);
  titleBadge.position.set(0, 1.6, 0);
  titleBadge.scale.set(2.2, 0.3, 1);
  group.add(titleBadge);

  const statusBadge = createTextBadge(THREE, "Edge Function: Teste de Inclusão no Centro do Fragmento", "#fbbf24", 460, 60);
  statusBadge.position.set(0, -1.55, 0);
  statusBadge.scale.set(2.3, 0.3, 1);
  group.add(statusBadge);

  group.userData = {
    pixelMeshes,
    scanLine,
    v0,
    v1,
    v2,
    triFace,
    triWire,
    frameHeight,
    elapsed: 0
  };

  return group;
}

// Teste matemático de ponto dentro de triângulo 2D (Edge function / Baricêntrico)
function pointInTriangle(px, py, ax, ay, bx, by, cx, cy) {
  const v0x = cx - ax;
  const v0y = cy - ay;
  const v1x = bx - ax;
  const v1y = by - ay;
  const v2x = px - ax;
  const v2y = py - ay;

  const dot00 = v0x * v0x + v0y * v0y;
  const dot01 = v0x * v1x + v0y * v1y;
  const dot02 = v0x * v2x + v0y * v2y;
  const dot11 = v1x * v1x + v1y * v1y;
  const dot12 = v1x * v2x + v1y * v2y;

  const invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
  const u = (dot11 * dot02 - dot01 * dot12) * invDenom;
  const v = (dot00 * dot12 - dot01 * dot02) * invDenom;

  return u >= 0 && v >= 0 && u + v <= 1;
}

export function update(mesh, dt) {
  const d = mesh.userData;
  d.elapsed += dt;
  const t = d.elapsed;

  // Scanline varre de cima a baixo no ciclo de 3.5s
  const cycle = 3.5;
  const progress = (t % cycle) / cycle;
  const scanY = (0.5 - progress) * d.frameHeight;
  d.scanLine.position.y = scanY;

  // Leve pulso oscilante do triângulo vetorial
  const triPulse = 1 + Math.sin(t * 2) * 0.03;
  d.triFace.scale.set(triPulse, triPulse, 1);
  d.triWire.scale.set(triPulse, triPulse, 1);

  const ax = d.v0.x * triPulse;
  const ay = d.v0.y * triPulse;
  const bx = d.v1.x * triPulse;
  const by = d.v1.y * triPulse;
  const cx = d.v2.x * triPulse;
  const cy = d.v2.y * triPulse;

  // Atualiza cada pixel: se estiver dentro do triângulo e a scanline já tiver passado, acende!
  d.pixelMeshes.forEach((p) => {
    const isInside = pointInTriangle(p.x, p.y, ax, ay, bx, by, cx, cy);

    if (isInside) {
      if (p.y >= scanY) {
        // Pixel já rasterizado pela scanline neste ciclo
        p.mat.color.setHex(0xf472b6); // Rosa vibrante do fragmento
        p.mat.opacity = 0.88;
        p.mesh.scale.set(1, 1, 1);
      } else {
        // Dentro do triângulo mas ainda esperando a varredura
        p.mat.color.setHex(0x38bdf8);
        p.mat.opacity = 0.35;
        p.mesh.scale.set(0.9, 0.9, 1);
      }
    } else {
      // Fora da primitiva
      p.mat.color.setHex(0x0f172a);
      p.mat.opacity = 0.4;
      p.mesh.scale.set(0.85, 0.85, 1);
    }
  });
}
