export function createMesh(THREE) {
  const group = new THREE.Group();

  const rows = 3;
  const cols = 3;
  const spacing = 0.72;
  const spheres = [];

  const baseGeom = new THREE.SphereGeometry(0.24, 32, 32);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const roughness = Math.max(0.04, r / (rows - 1));
      const metalness = c / (cols - 1);

      const mat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        roughness: roughness,
        metalness: metalness
      });

      const sphere = new THREE.Mesh(baseGeom, mat);
      sphere.position.set(
        (c - (cols - 1) / 2) * spacing,
        ((rows - 1) / 2 - r) * spacing,
        0
      );

      group.add(sphere);
      spheres.push(sphere);
    }
  }

  // Luz pontual orbital em torno das esferas PBR para evidenciar reflexos especulares
  const pointLight = new THREE.PointLight(0xfff7ed, 2.0, 8);
  group.add(pointLight);

  const lightHelper = new THREE.Mesh(
    new THREE.SphereGeometry(0.06, 12, 12),
    new THREE.MeshBasicMaterial({ color: 0xffedd5 })
  );
  group.add(lightHelper);

  group.userData = {
    spheres,
    pointLight,
    lightHelper,
    elapsed: 0
  };

  return group;
}

export function update(mesh, dt) {
  const data = mesh.userData;
  data.elapsed += dt;
  const t = data.elapsed;

  // Movimento da luz para destacar o specular highlight em cada nível de rugosidade
  const lx = Math.cos(t * 1.2) * 1.5;
  const ly = Math.sin(t * 1.5) * 0.8;
  const lz = 1.0 + Math.sin(t * 0.9) * 0.5;

  data.pointLight.position.set(lx, ly, lz);
  data.lightHelper.position.set(lx, ly, lz);

  mesh.rotation.y = Math.sin(t * 0.3) * 0.2;
}
