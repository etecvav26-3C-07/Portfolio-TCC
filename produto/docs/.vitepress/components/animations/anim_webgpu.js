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
  const count = 220;
  const geometry = new THREE.IcosahedronGeometry(0.08, 0);
  const material = new THREE.MeshStandardMaterial({
    color: 0x22d3ee,
    roughness: 0.25,
    metalness: 0.55,
    emissive: 0x0891b2,
    emissiveIntensity: 0.35
  });
  const instanced = new THREE.InstancedMesh(geometry, material, count);
  const dummy = new THREE.Object3D();
  const seeds = [];

  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const radius = 0.6 + Math.random() * 1.6;
    seeds.push({ theta, phi, radius, spin: 0.4 + Math.random() * 1.4 });
    dummy.position.set(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
    dummy.updateMatrix();
    instanced.setMatrixAt(i, dummy.matrix);
  }
  group.add(instanced);

  const core = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.42, 0),
    new THREE.MeshStandardMaterial({
      color: 0xe0f2fe,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.7,
      roughness: 0.2,
      metalness: 0.6
    })
  );
  group.add(core);

  // Badges conceituais
  const titleBadge = createTextBadge(THREE, "WebGPU: Compute Pipelines & WGSL Shaders", "#38bdf8", 480, 60);
  titleBadge.position.set(0, 1.7, 0);
  titleBadge.scale.set(2.4, 0.3, 1);
  group.add(titleBadge);

  const statusBadge = createTextBadge(THREE, "Adapter → GPUDevice → GPUQueue → CommandEncoder", "#fbbf24", 500, 60);
  statusBadge.position.set(0, -1.5, 0);
  statusBadge.scale.set(2.5, 0.3, 1);
  group.add(statusBadge);

  group.userData = {
    instanced,
    dummy,
    seeds,
    core,
    elapsed: 0
  };
  return group;
}

export function update(mesh, dt) {
  const data = mesh.userData;
  data.elapsed += dt;
  data.core.rotation.y += dt * 0.8;
  data.core.rotation.x += dt * 0.25;
  const dummy = data.dummy;
  data.seeds.forEach((seed, i) => {
    const theta = seed.theta + data.elapsed * 0.35 * seed.spin;
    const phi = seed.phi + Math.sin(data.elapsed * 0.7 + i) * 0.08;
    dummy.position.set(
      seed.radius * Math.sin(phi) * Math.cos(theta),
      seed.radius * Math.cos(phi) * 0.75,
      seed.radius * Math.sin(phi) * Math.sin(theta)
    );
    dummy.rotation.y = theta;
    dummy.updateMatrix();
    data.instanced.setMatrixAt(i, dummy.matrix);
  });
  data.instanced.instanceMatrix.needsUpdate = true;
}
