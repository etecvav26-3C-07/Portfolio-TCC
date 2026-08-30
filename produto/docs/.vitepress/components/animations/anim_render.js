export function createMesh(THREE) {
  const group = new THREE.Group();

  const mesh = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.72, 0.24, 160, 24),
    new THREE.MeshStandardMaterial({
      color: 0x90caf9,
      roughness: 0.28,
      metalness: 0.55
    })
  );
  group.add(mesh);

  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(2.1, 48),
    new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.95,
      metalness: 0.05
    })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1.15;
  group.add(ground);

  group.userData.knot = mesh;
  return group;
}

export function update(mesh, dt) {
  mesh.userData.knot.rotation.y += dt * 0.55;
  mesh.userData.knot.rotation.x += dt * 0.12;
}
