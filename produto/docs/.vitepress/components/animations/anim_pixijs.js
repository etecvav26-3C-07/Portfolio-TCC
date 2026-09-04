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

  group.userData = {
    instanced,
    dummy,
    spriteData,
    count,
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
