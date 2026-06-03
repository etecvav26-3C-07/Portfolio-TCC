export function createMesh(THREE) {
  const geometry = new THREE.TorusKnotGeometry(0.8, 0.22, 140, 20);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffb74d,
    roughness: 0.28,
    metalness: 0.4
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}
