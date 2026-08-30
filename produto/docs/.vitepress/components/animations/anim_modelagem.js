export function createMesh(THREE) {
  const group = new THREE.Group();

  const geometry = new THREE.IcosahedronGeometry(1.05, 0);
  const solid = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({
      color: 0x7e57c2,
      roughness: 0.38,
      metalness: 0.45,
      transparent: true,
      opacity: 0.78
    })
  );
  group.add(solid);

  const wire = new THREE.LineSegments(
    new THREE.WireframeGeometry(geometry),
    new THREE.LineBasicMaterial({ color: 0xe9d5ff })
  );
  group.add(wire);

  const positions = geometry.getAttribute("position");
  const seen = new Set();
  const vertexGeom = new THREE.SphereGeometry(0.055, 10, 10);
  const vertexMat = new THREE.MeshStandardMaterial({
    color: 0xf5d0fe,
    emissive: 0x6d28d9,
    emissiveIntensity: 0.4
  });

  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    const z = positions.getZ(i);
    const key = `${x.toFixed(3)}|${y.toFixed(3)}|${z.toFixed(3)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const vertex = new THREE.Mesh(vertexGeom, vertexMat);
    vertex.position.set(x, y, z);
    group.add(vertex);
  }

  return group;
}

export function update(mesh, dt) {
  mesh.rotation.y += dt * 0.45;
  mesh.rotation.x += dt * 0.12;
}
