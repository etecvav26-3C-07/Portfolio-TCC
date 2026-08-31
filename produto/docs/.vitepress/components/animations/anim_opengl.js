export function createMesh(THREE) {
  const group = new THREE.Group();
  const stages = [
    { label: "VBO", color: 0x38bdf8 },
    { label: "VS", color: 0x818cf8 },
    { label: "Raster", color: 0xf472b6 },
    { label: "FS", color: 0xfbbf24 }
  ];

  stages.forEach((stage, index) => {
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(0.85, 0.42, 0.85),
      new THREE.MeshStandardMaterial({
        color: stage.color,
        roughness: 0.35,
        metalness: 0.25,
        transparent: true,
        opacity: 0.82
      })
    );
    box.position.y = 1.35 - index * 0.85;
    group.add(box);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.52, 0.03, 10, 32),
      new THREE.MeshBasicMaterial({ color: 0xe2e8f0 })
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = box.position.y;
    group.add(ring);
  });

  const tri = new THREE.Mesh(
    new THREE.ConeGeometry(0.18, 0.32, 3),
    new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.55,
      roughness: 0.25,
      metalness: 0.4
    })
  );
  group.add(tri);

  group.userData.tri = tri;
  group.userData.elapsed = 0;
  return group;
}

export function update(mesh, dt) {
  mesh.userData.elapsed += dt;
  const t = mesh.userData.elapsed;
  const y = 1.55 - ((t * 0.55) % 3.2);
  mesh.userData.tri.position.set(Math.sin(t * 1.6) * 0.18, y, 0);
  mesh.userData.tri.rotation.y += dt * 2.4;
  mesh.rotation.y += dt * 0.12;
}
