export function createMesh(THREE) {
  const group = new THREE.Group();

  // Estágios do pipeline em sequência horizontal
  const stages = [
    { name: "CPU / VBO", color: 0x38bdf8, geom: new THREE.IcosahedronGeometry(0.2, 0) },
    { name: "Vertex Shader", color: 0x818cf8, geom: new THREE.BoxGeometry(0.3, 0.3, 0.3) },
    { name: "Rasterização", color: 0xf472b6, geom: new THREE.PlaneGeometry(0.35, 0.35) },
    { name: "Fragment Shader", color: 0xfbbf24, geom: new THREE.OctahedronGeometry(0.22, 0) },
    { name: "Framebuffer", color: 0x34d399, geom: new THREE.CylinderGeometry(0.22, 0.22, 0.08, 16) }
  ];

  const stageNodes = [];
  const spacing = 0.82;
  const startX = -((stages.length - 1) * spacing) / 2;

  stages.forEach((stage, idx) => {
    const x = startX + idx * spacing;

    // Base do estágio
    const baseGeom = new THREE.CylinderGeometry(0.28, 0.32, 0.12, 16);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.6,
      roughness: 0.3
    });
    const base = new THREE.Mesh(baseGeom, baseMat);
    base.position.set(x, -0.65, 0);
    group.add(base);

    // Anel emissor do estágio
    const ringGeom = new THREE.TorusGeometry(0.3, 0.02, 8, 24);
    const ringMat = new THREE.MeshBasicMaterial({ color: stage.color });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(x, -0.58, 0);
    group.add(ring);

    // Objeto representativo de dados no estágio
    const mat = new THREE.MeshStandardMaterial({
      color: stage.color,
      roughness: 0.25,
      metalness: 0.5,
      wireframe: idx === 0 || idx === 2
    });
    const node = new THREE.Mesh(stage.geom, mat);
    node.position.set(x, 0.1, 0);
    group.add(node);
    stageNodes.push(node);
  });

  // Linha transportadora que une os estágios
  const linePoints = [
    new THREE.Vector3(startX - 0.3, -0.65, 0),
    new THREE.Vector3(-startX + 0.3, -0.65, 0)
  ];
  const conveyor = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(linePoints),
    new THREE.LineBasicMaterial({ color: 0x475569, linewidth: 2 })
  );
  group.add(conveyor);

  // Partícula/token de dados que transita de ponta a ponta
  const token = new THREE.Mesh(
    new THREE.SphereGeometry(0.09, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  group.add(token);

  group.userData = {
    stageNodes,
    token,
    startX,
    totalWidth: (stages.length - 1) * spacing,
    elapsed: 0
  };

  return group;
}

export function update(mesh, dt) {
  const data = mesh.userData;
  data.elapsed += dt;
  const t = data.elapsed;

  // Rotação individual dos símbolos de cada estágio do pipeline
  data.stageNodes.forEach((node, i) => {
    node.rotation.y += dt * (0.8 + i * 0.2);
    node.rotation.x += dt * 0.4;
    node.position.y = 0.1 + Math.sin(t * 2.5 + i) * 0.08;
  });

  // Movimento do pacote de dados percorrendo o pipeline gráfico
  const progress = (t * 0.45) % 1.0;
  data.token.position.x = data.startX + progress * data.totalWidth;
  data.token.position.y = 0.35 + Math.sin(progress * Math.PI * 4) * 0.12;
  data.token.position.z = Math.sin(progress * Math.PI * 2) * 0.15;

  mesh.rotation.y = Math.sin(t * 0.2) * 0.15;
}
