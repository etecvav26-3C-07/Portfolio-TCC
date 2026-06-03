export function createMesh(THREE) {
  const geometry = new THREE.BoxGeometry(1.4, 1.4, 1.4);
  const material = new THREE.MeshStandardMaterial({
    color: 0x7e57c2,
    roughness: 0.35,
    metalness: 0.6
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}
