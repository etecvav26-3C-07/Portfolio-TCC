export function createMesh(THREE, context) {
  const group = new THREE.Group();

  if (context?.defaultLights) {
    context.defaultLights.forEach((light) => {
      light.visible = false;
    });
  }

  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.95, 48, 48),
    new THREE.MeshStandardMaterial({
      color: 0xfde68a,
      roughness: 0.22,
      metalness: 0.08
    })
  );
  group.add(sphere);

  const bulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.12, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xfff7ed })
  );
  group.add(bulb);

  const point = new THREE.PointLight(0xfff1c1, 2.4, 12);
  bulb.add(point);

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(2.4, 48),
    new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.9,
      metalness: 0
    })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.05;
  group.add(floor);

  group.add(new THREE.AmbientLight(0xffffff, 0.12));

  group.userData.bulb = bulb;
  group.userData.elapsed = 0;
  return group;
}

export function update(mesh, dt) {
  mesh.userData.elapsed += dt;
  const t = mesh.userData.elapsed;
  mesh.userData.bulb.position.set(
    Math.cos(t * 0.9) * 1.7,
    0.55 + Math.sin(t * 1.4) * 0.45,
    Math.sin(t * 0.9) * 1.7
  );
}
