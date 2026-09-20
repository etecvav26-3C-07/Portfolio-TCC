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

  // Matriz de Sprites 2D em lote acelerados por hardware (estilo PixiJS Sprite Batching)
  const count = 120;
  const geom = new THREE.PlaneGeometry(0.18, 0.18);
  const mat = new THREE.MeshBasicMaterial({
    color: 0xe91e63, // Rosa/Magenta característico do PixiJS
    side: THREE.DoubleSide
  });

  const instanced = new THREE.InstancedMesh(geom, mat, count);
  const dummy = new THREE.Object3D();
  const spriteData = [];

  const colors = [0xe91e63, 0x00e5ff, 0xffeb3b, 0x76ff03, 0xd500f9, 0xff6d00];

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = 0.3 + Math.random() * 1.5;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    const z = (Math.random() - 0.5) * 0.4;

    dummy.position.set(x, y, z);
    dummy.rotation.z = Math.random() * Math.PI;
    dummy.updateMatrix();
    instanced.setMatrixAt(i, dummy.matrix);

    const c = new THREE.Color(colors[i % colors.length]);
    instanced.setColorAt(i, c);

    spriteData.push({
      x,
      y,
      z,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      rotSpeed: (Math.random() - 0.5) * 4.0
    });
  }

  instanced.instanceMatrix.needsUpdate = true;
  if (instanced.instanceColor) instanced.instanceColor.needsUpdate = true;
  group.add(instanced);

  // Moldura do Canvas 2D
  const frameGeom = new THREE.PlaneGeometry(3.2, 3.2);
  const frameEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(frameGeom),
    new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.5 })
  );
  group.add(frameEdges);

  // Badges conceituais didáticos
  const titleBadge = createTextBadge(THREE, "PixiJS: Renderizador 2D com Aceleração por Hardware", "#38bdf8", 480, 60);
  titleBadge.position.set(0, 1.7, 0);
  titleBadge.scale.set(2.4, 0.3, 1);
  group.add(titleBadge);

  const statusBadge = createTextBadge(THREE, "Sprite Batching: 120 Sprites Agrupados em 1 Única Draw Call", "#fbbf24", 510, 60);
  statusBadge.position.set(0, -1.5, 0);
  statusBadge.scale.set(2.55, 0.3, 1);
  group.add(statusBadge);

  group.userData = {
    instanced,
    dummy,
    spriteData,
    count,
    statusBadge,
    elapsed: 0
  };

  return group;
}

export function update(mesh, dt) {
  const data = mesh.userData;
  data.elapsed += dt;

  const dummy = data.dummy;
  const instanced = data.instanced;

  // Atualização em lote dos 120 sprites em 60 FPS
  for (let i = 0; i < data.count; i++) {
    const s = data.spriteData[i];
    s.x += s.vx * dt;
    s.y += s.vy * dt;

    // Rebate nas bordas da tela 2D
    if (Math.abs(s.x) > 1.4) s.vx *= -1;
    if (Math.abs(s.y) > 1.4) s.vy *= -1;

    dummy.position.set(s.x, s.y, s.z);
    dummy.rotation.z += s.rotSpeed * dt;
    dummy.updateMatrix();
    instanced.setMatrixAt(i, dummy.matrix);
  }
  instanced.instanceMatrix.needsUpdate = true;

  mesh.rotation.y = Math.sin(data.elapsed * 0.4) * 0.15;
}
