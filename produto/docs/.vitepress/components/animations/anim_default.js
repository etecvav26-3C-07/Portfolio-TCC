export function createMesh(THREE) {
  const geometry = new THREE.IcosahedronGeometry(1.0, 1);
  const material = new THREE.MeshStandardMaterial({
    color: 0x90a4ae,
    roughness: 0.5,
    metalness: 0.2
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}
