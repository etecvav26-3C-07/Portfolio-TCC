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
  const count = 48;
  const geometry = new THREE.BoxGeometry(0.18, 0.18, 0.18);
  const material = new THREE.MeshStandardMaterial({
    color: 0x67e8f9,
    roughness: 0.3,
    metalness: 0.45
  });
  const instanced = new THREE.InstancedMesh(geometry, material, count);
  const dummy = new THREE.Object3D();
  const lanes = [-1.15, 0, 1.15];
  const colors = [0x38bdf8, 0xa78bfa, 0xf472b6];

  for (let i = 0; i < count; i++) {
    const lane = i % 3;
    dummy.position.set(lanes[lane], ((i / 3) % 8) * 0.28 - 1.1, 0);
    dummy.updateMatrix();
    instanced.setMatrixAt(i, dummy.matrix);
    instanced.setColorAt(i, new THREE.Color(colors[lane]));
  }
  instanced.instanceMatrix.needsUpdate = true;
  if (instanced.instanceColor) instanced.instanceColor.needsUpdate = true;
  group.add(instanced);

  // GPU Queue de recepção dos comandos
  const gpu = new THREE.Mesh(
    new THREE.CylinderGeometry(0.55, 0.7, 0.28, 24),
    new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.4,
      metalness: 0.7
    })
  );
  gpu.position.set(0, -1.45, 0);
  group.add(gpu);

  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(2.4, 1.35),
    new THREE.MeshStandardMaterial({
      color: 0x082f49,
      emissive: 0x0369a1,
      emissiveIntensity: 0.35,
      roughness: 0.6,
      metalness: 0.1,
      side: THREE.DoubleSide
    })
  );
  screen.position.set(0, 0.15, -1.35);
  group.add(screen);

  // Badges conceituais didáticos
  const titleBadge = createTextBadge(THREE, "Vulkan: Filas Assíncronas (Graphics • Compute • Transfer)", "#38bdf8", 480, 60);
  titleBadge.position.set(0, 1.7, 0);
  titleBadge.scale.set(2.4, 0.3, 1);
  group.add(titleBadge);

  const statusBadge = createTextBadge(THREE, "CPU Threads → Command Buffers → Submissão GPU Sem Trava", "#fbbf24", 480, 60);
  statusBadge.position.set(0, -1.5, 0);
  statusBadge.scale.set(2.4, 0.3, 1);
  group.add(statusBadge);

  group.userData = {
    instanced,
    dummy,
    count,
    lanes,
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
  for (let i = 0; i < data.count; i++) {
    const lane = i % 3;
    const speed = 0.55 + lane * 0.22;
    const y = ((data.elapsed * speed + i * 0.18) % 2.6) - 1.2;
    dummy.position.set(data.lanes[lane], y, Math.sin(data.elapsed * 2 + i) * 0.08);
    dummy.rotation.y = data.elapsed * (1 + lane * 0.4);
    dummy.updateMatrix();
    instanced.setMatrixAt(i, dummy.matrix);
  }
  instanced.instanceMatrix.needsUpdate = true;
}
