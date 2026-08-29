export function createMesh(THREE) {
  const group = new THREE.Group();

  const target = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.55, 1),
    new THREE.MeshStandardMaterial({
      color: 0x4fc3f7,
      roughness: 0.4,
      metalness: 0.2
    })
  );
  group.add(target);

  const cameraRig = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.ConeGeometry(0.22, 0.55, 16),
    new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.35,
      metalness: 0.15
    })
  );
  body.rotation.x = Math.PI / 2;
  cameraRig.add(body);

  const frustum = new THREE.Mesh(
    new THREE.ConeGeometry(0.55, 1.1, 4, 1, true),
    new THREE.MeshBasicMaterial({
      color: 0x7dd3fc,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
      wireframe: true
    })
  );
  frustum.rotation.x = Math.PI / 2;
  frustum.position.z = 0.7;
  cameraRig.add(frustum);

  group.add(cameraRig);

  const lineGeom = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, 0)
  ]);
  const lookLine = new THREE.Line(
    lineGeom,
    new THREE.LineBasicMaterial({ color: 0xbae6fd })
  );
  group.add(lookLine);

  group.userData.cameraRig = cameraRig;
  group.userData.lookLine = lookLine;
  group.userData.elapsed = 0;
  return group;
}

export function update(mesh, dt) {
  mesh.userData.elapsed += dt;
  const t = mesh.userData.elapsed;
  const radius = 2.15;
  const x = Math.cos(t * 0.7) * radius;
  const z = Math.sin(t * 0.7) * radius;
  const y = 0.55 + Math.sin(t * 0.9) * 0.35;

  const rig = mesh.userData.cameraRig;
  rig.position.set(x, y, z);
  rig.lookAt(0, 0, 0);

  const positions = mesh.userData.lookLine.geometry.attributes.position;
  positions.setXYZ(0, x, y, z);
  positions.setXYZ(1, 0, 0, 0);
  positions.needsUpdate = true;
}
