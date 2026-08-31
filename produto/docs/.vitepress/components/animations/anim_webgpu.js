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

  group.userData.instanced = instanced;
  group.userData.dummy = dummy;
  group.userData.seeds = seeds;
  group.userData.core = core;
  group.userData.elapsed = 0;
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
