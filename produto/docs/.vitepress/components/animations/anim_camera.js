export function createMesh(THREE) {
  const geometry = new THREE.ConeGeometry(0.9, 1.8, 32);
  const material = new THREE.MeshStandardMaterial({
    color: 0x4fc3f7,
    roughness: 0.32,
    metalness: 0.3
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}
