export function createMesh(THREE) {
  const group = new THREE.Group();

  const knot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.7, 0.22, 180, 28),
    new THREE.MeshStandardMaterial({
      color: 0x7dd3fc,
      roughness: 0.22,
      metalness: 0.62
    })
  );
  group.add(knot);

  const moons = [];
  const shapes = [
    new THREE.IcosahedronGeometry(0.22, 0),
    new THREE.OctahedronGeometry(0.2, 0),
    new THREE.TetrahedronGeometry(0.24, 0)
  ];
  const colors = [0xf472b6, 0xfbbf24, 0x34d399];
  shapes.forEach((geometry, index) => {
    const moon = new THREE.Mesh(
      geometry,
      new THREE.MeshStandardMaterial({
        color: colors[index],
        roughness: 0.3,
        metalness: 0.4
      })
    );
    group.add(moon);
    moons.push(moon);
  });

  const particles = new THREE.BufferGeometry();
  const count = 160;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 5.2;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 3.2;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 5.2;
  }
  particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const cloud = new THREE.Points(
    particles,
    new THREE.PointsMaterial({ color: 0xcbd5e1, size: 0.035 })
  );
  group.add(cloud);

  group.userData.knot = knot;
  group.userData.moons = moons;
  group.userData.cloud = cloud;
  group.userData.elapsed = 0;
  return group;
}

export function update(mesh, dt) {
  const data = mesh.userData;
  data.elapsed += dt;
  data.knot.rotation.y += dt * 0.55;
  data.knot.rotation.x += dt * 0.12;
  data.cloud.rotation.y -= dt * 0.08;
  data.moons.forEach((moon, index) => {
    const speed = 0.7 + index * 0.25;
    const radius = 1.35 + index * 0.28;
    const t = data.elapsed * speed;
    moon.position.set(
      Math.cos(t) * radius,
      Math.sin(t * 1.4 + index) * 0.45,
      Math.sin(t) * radius
    );
    moon.rotation.x += dt * (1 + index);
    moon.rotation.y += dt * 1.2;
  });
}
