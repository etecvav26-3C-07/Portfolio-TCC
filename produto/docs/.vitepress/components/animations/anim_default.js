export function createMesh(THREE) {
  const group = new THREE.Group();

  const geometry = new THREE.IcosahedronGeometry(0.95, 1);
  const material = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    roughness: 0.25,
    metalness: 0.7,
    flatShading: true
  });
  const mesh = new THREE.Mesh(geometry, material);
  group.add(mesh);

  const wireGeom = new THREE.WireframeGeometry(geometry);
  const wireMat = new THREE.LineBasicMaterial({
    color: 0xbae6fd,
    transparent: true,
    opacity: 0.4
  });
  const wire = new THREE.LineSegments(wireGeom, wireMat);
  group.add(wire);

  return group;
}

export function update(mesh, dt) {
  mesh.rotation.y += dt * 0.4;
  mesh.rotation.x += dt * 0.15;
}
