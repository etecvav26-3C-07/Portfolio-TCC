export function createMesh(THREE) {
  const geometry = new THREE.SphereGeometry(0.9, 32, 32);
  const material = new THREE.MeshStandardMaterial({
    color: 0xfff176,
    emissive: new THREE.Color(0xfff59d),
    emissiveIntensity: 0.6,
    roughness: 0.2,
    metalness: 0.1
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}
