export function createMesh(THREE) {
  const group = new THREE.Group();

  const axes = new THREE.AxesHelper(1.6);
  group.add(axes);

  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.85, 0.85, 0.85),
    new THREE.MeshStandardMaterial({
      color: 0xffb74d,
      roughness: 0.32,
      metalness: 0.28
    })
  );
  group.add(mesh);
  group.userData.box = mesh;
  group.userData.elapsed = 0;
  return group;
}

export function update(mesh, dt) {
  const data = mesh.userData;
  data.elapsed += dt;
  const cycle = 7.5;
  const t = data.elapsed % cycle;
  const box = data.box;
  box.position.set(0, 0, 0);
  box.rotation.set(0, 0, 0);
  box.scale.set(1, 1, 1);

  if (t < 2.5) {
    const p = t / 2.5;
    box.position.x = Math.sin(p * Math.PI * 2) * 0.85;
  } else if (t < 5) {
    const p = (t - 2.5) / 2.5;
    box.rotation.y = p * Math.PI * 2;
    box.rotation.x = p * Math.PI * 0.35;
  } else {
    const p = (t - 5) / 2.5;
    const s = 0.55 + Math.abs(Math.sin(p * Math.PI)) * 0.7;
    box.scale.set(s, s, s);
  }
}
