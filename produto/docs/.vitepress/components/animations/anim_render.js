export function createMesh(THREE) {
  const geometry = new THREE.PlaneGeometry(2.0, 2.0, 32, 32);
  const material = new THREE.MeshStandardMaterial({
    color: 0x90caf9,
    roughness: 0.6,
    metalness: 0.0
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}
