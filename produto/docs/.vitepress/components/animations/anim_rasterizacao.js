export function createMesh(THREE) {
  // Simple grid-like plane to represent rasterization/pixelization
  const geometry = new THREE.PlaneGeometry(2.0, 2.0, 16, 16);
  const material = new THREE.MeshStandardMaterial({
    color: 0x89a7b8,
    roughness: 0.7,
    metalness: 0.0
  });
  const mesh = new THREE.Mesh(geometry, material);
  // add a slight rotation to make the plane visible
  mesh.rotation.x = -0.35;
  return mesh;
}
