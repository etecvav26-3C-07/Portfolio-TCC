export function createMesh(THREE) {
  const group = new THREE.Group();

  // Malha hexagonal de densidade de dados (Deck.gl HexagonLayer)
  const hexRadius = 0.16;
  const hexGeom = new THREE.CylinderGeometry(hexRadius, hexRadius, 1.0, 6);
  hexGeom.translate(0, 0.5, 0); // Base no chão

  const rows = 7;
  const cols = 7;
  const hexList = [];

  const colorStart = new THREE.Color(0x38bdf8); // Ciano
  const colorEnd = new THREE.Color(0xf43f5e);   // Vermelho/Magenta intenso

  for (let r = -rows / 2; r <= rows / 2; r++) {
    for (let c = -cols / 2; c <= cols / 2; c++) {
      const x = c * hexRadius * 1.75;
      const z = r * hexRadius * 2.0 + (c % 2 !== 0 ? hexRadius : 0);

      // Distância do centro determina a densidade de dados padrão
      const dist = Math.sqrt(x * x + z * z);
      if (dist > 1.4) continue;

      const normDist = dist / 1.4;
      const mat = new THREE.MeshStandardMaterial({
        color: colorStart.clone().lerp(colorEnd, 1 - normDist),
        roughness: 0.3,
        metalness: 0.4
      });

      const hex = new THREE.Mesh(hexGeom, mat);
      hex.position.set(x, -0.7, z);
      hex.scale.set(1, 0.2 + (1 - normDist) * 0.8, 1);
      group.add(hex);

      hexList.push({
        mesh: hex,
        dist,
        baseScale: 0.2 + (1 - normDist) * 0.9,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  // Arcos de fluxo de dados conectando pontos distantes (Deck.gl ArcLayer)
  const arcCurves = [];
  const arcMat = new THREE.LineBasicMaterial({
    color: 0xfbbf24,
    linewidth: 2,
    transparent: true,
    opacity: 0.75
  });

  const arcCoords = [
    [[-1.0, -0.7, -0.5], [0.8, -0.7, 0.6]],
    [[-0.6, -0.7, 0.8], [0.7, -0.7, -0.7]],
    [[0.0, -0.7, -1.0], [0.1, -0.7, 0.9]]
  ];

  arcCoords.forEach(([p1, p2]) => {
    const v1 = new THREE.Vector3(...p1);
    const v2 = new THREE.Vector3(...p2);
    const mid = new THREE.Vector3().addVectors(v1, v2).multiplyScalar(0.5);
    mid.y = 0.5 + Math.random() * 0.4; // Altura do arco parabólico

    const curve = new THREE.QuadraticBezierCurve3(v1, mid, v2);
    const points = curve.getPoints(36);
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geom, arcMat);
    group.add(line);
    arcCurves.push(curve);
  });

  // Chão da projeção geográfica
  const groundGeom = new THREE.PlaneGeometry(3.2, 3.2);
  const groundMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.9,
    metalness: 0.1
  });
  const ground = new THREE.Mesh(groundGeom, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.71;
  group.add(ground);

  group.userData = {
    hexList,
    elapsed: 0
  };

  return group;
}

export function update(mesh, dt) {
  const data = mesh.userData;
  data.elapsed += dt;
  const t = data.elapsed;

  // Animação volumétrica dos hexágonos conforme os dados oscilam
  data.hexList.forEach((item) => {
    const wave = Math.sin(t * 2.5 - item.dist * 3.0 + item.phase) * 0.35;
    const s = Math.max(0.08, item.baseScale + wave);
    item.mesh.scale.y = s;
  });

  mesh.rotation.y += dt * 0.15;
}
