function createTextBadge(THREE, text, color = "#38bdf8", width = 480, height = 70) {
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

export function createMesh(THREE) {
  const group = new THREE.Group();

  // Curvas paramétricas generativas (estilo P5.js Generative Art / Processing)
  const curveCount = 6;
  const pointsPerCurve = 140;
  const curves = [];

  const colors = [0xed225d, 0x38bdf8, 0xfacc15, 0xa855f7, 0x4ade80, 0xf472b6]; // Inclui o rosa do P5.js

  for (let c = 0; c < curveCount; c++) {
    const points = [];
    for (let i = 0; i < pointsPerCurve; i++) {
      points.push(new THREE.Vector3(0, 0, 0));
    }
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({
      color: colors[c % colors.length],
      linewidth: 2,
      transparent: true,
      opacity: 0.85
    });
    const line = new THREE.Line(geom, mat);
    group.add(line);
    curves.push({ line, points, freqA: 1 + c * 0.5, freqB: 2 + c * 0.3 });
  }

  // Círculo central pulsante (o cursor do Processing / P5)
  const brushGeom = new THREE.SphereGeometry(0.08, 16, 16);
  const brushMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const brush = new THREE.Mesh(brushGeom, brushMat);
  group.add(brush);

  // Badges conceituais didáticos
  const titleBadge = createTextBadge(THREE, "p5.js & Processing: Arte Generativa & Código Criativo", "#38bdf8", 480, 60);
  titleBadge.position.set(0, 1.7, 0);
  titleBadge.scale.set(2.4, 0.3, 1);
  group.add(titleBadge);

  const statusBadge = createTextBadge(THREE, "Curvas Paramétricas de Lissajous 3D + Pincel Procedural", "#fbbf24", 510, 60);
  statusBadge.position.set(0, -1.5, 0);
  statusBadge.scale.set(2.55, 0.3, 1);
  group.add(statusBadge);

  group.userData = {
    curves,
    brush,
    pointsPerCurve,
    statusBadge,
    elapsed: 0
  };

  return group;
}

export function update(mesh, dt) {
  const data = mesh.userData;
  data.elapsed += dt;
  const t = data.elapsed;

  // Atualizar pontos das curvas de Lissajous tridimensionais
  data.curves.forEach((curveObj, cIdx) => {
    const positions = curveObj.line.geometry.attributes.position;
    const count = data.pointsPerCurve;

    for (let i = 0; i < count; i++) {
      const u = (i / count) * Math.PI * 2;
      const wave = t * 0.8 + cIdx * 0.4;

      const x = Math.sin(u * curveObj.freqA + wave) * (1.1 + Math.sin(wave * 0.5) * 0.2);
      const y = Math.cos(u * curveObj.freqB + wave) * (0.8 + Math.cos(wave * 0.7) * 0.2);
      const z = Math.sin((u + wave) * 2.0) * 0.6;

      positions.setXYZ(i, x, y, z);
    }
    positions.needsUpdate = true;
  });

  // Posição do "pincel" no topo da primeira curva
  const leadX = Math.sin(t * 1.5) * 1.1;
  const leadY = Math.cos(t * 2.0) * 0.8;
  const leadZ = Math.sin(t * 2.5) * 0.6;
  data.brush.position.set(leadX, leadY, leadZ);

  mesh.rotation.y += dt * 0.25;
  mesh.rotation.x = Math.sin(t * 0.4) * 0.15;
}
