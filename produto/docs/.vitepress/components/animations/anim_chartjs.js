export function createMesh(THREE) {
  const group = new THREE.Group();

  // Gráfico de Barras Cilíndricas 3D
  const barCount = 5;
  const bars = [];
  const barRadius = 0.14;
  const barGeom = new THREE.CylinderGeometry(barRadius, barRadius, 1.0, 24);
  barGeom.translate(0, 0.5, 0); // Base zero

  const barColors = [0x3b82f6, 0x10b981, 0xf59e0b, 0xef4444, 0x8b5cf6];

  for (let i = 0; i < barCount; i++) {
    const mat = new THREE.MeshStandardMaterial({
      color: barColors[i],
      roughness: 0.25,
      metalness: 0.5
    });
    const bar = new THREE.Mesh(barGeom, mat);
    const x = (i - (barCount - 1) / 2) * 0.45;
    bar.position.set(x, -0.7, -0.3);
    group.add(bar);

    bars.push({
      mesh: bar,
      targetHeight: 0.4 + (i + 1) * 0.22,
      speed: 1.5 + i * 0.4
    });
  }

  // Gráfico de Rosca / Donut em 3D
  const donutGeom = new THREE.TorusGeometry(0.55, 0.16, 16, 48);
  const donutMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    roughness: 0.2,
    metalness: 0.6
  });
  const donut = new THREE.Mesh(donutGeom, donutMat);
  donut.position.set(0, 0.45, 0.4);
  donut.rotation.x = Math.PI / 3;
  group.add(donut);

  // Fatias do Donut com materiais contrastantes
  const sliceGeom = new THREE.TorusGeometry(0.56, 0.165, 16, 24, Math.PI / 2);
  const sliceMat = new THREE.MeshStandardMaterial({
    color: 0xf43f5e,
    roughness: 0.2,
    metalness: 0.6
  });
  const slice = new THREE.Mesh(sliceGeom, sliceMat);
  slice.position.copy(donut.position);
  slice.rotation.copy(donut.rotation);
  group.add(slice);

  // Base / Grid do Gráfico
  const grid = new THREE.GridHelper(2.4, 6, 0x475569, 0x1e293b);
  grid.position.y = -0.7;
  group.add(grid);

  group.userData = {
    bars,
    donut,
    slice,
    elapsed: 0
  };

  return group;
}

export function update(mesh, dt) {
  const data = mesh.userData;
  data.elapsed += dt;
  const t = data.elapsed;

  // Animação das barras subindo e ajustando métricas
  data.bars.forEach((b, i) => {
    const pulse = Math.sin(t * b.speed + i) * 0.25;
    const h = Math.max(0.1, b.targetHeight + pulse);
    b.mesh.scale.y = h;
  });

  // Rotação do gráfico de rosca
  data.donut.rotation.z += dt * 0.5;
  data.slice.rotation.z += dt * 0.5;

  mesh.rotation.y += dt * 0.18;
}
