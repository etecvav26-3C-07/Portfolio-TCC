export function createMesh(THREE) {
  const group = new THREE.Group();

  // Geometria base (Icosaedro com faces facetadas)
  const geom = new THREE.IcosahedronGeometry(0.85, 1);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.4,
    metalness: 0.2,
    flatShading: true
  });
  const coreMesh = new THREE.Mesh(geom, mat);
  group.add(coreMesh);

  // Criar vetores normais visuais (setas apontando na direção normal de cada vértice)
  const posAttr = geom.attributes.position;
  const normalAttr = geom.attributes.normal;
  const count = posAttr.count;

  const normalLines = [];
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.9
  });

  const arrowHeadMat = new THREE.MeshBasicMaterial({ color: 0xf472b6 });
  const coneGeom = new THREE.ConeGeometry(0.035, 0.09, 8);

  const normalLength = 0.35;

  for (let i = 0; i < count; i += 2) {
    const vx = posAttr.getX(i);
    const vy = posAttr.getY(i);
    const vz = posAttr.getZ(i);

    const nx = normalAttr.getX(i);
    const ny = normalAttr.getY(i);
    const nz = normalAttr.getZ(i);

    const start = new THREE.Vector3(vx, vy, vz);
    const end = start.clone().add(new THREE.Vector3(nx, ny, nz).multiplyScalar(normalLength));

    const lineGeom = new THREE.BufferGeometry().setFromPoints([start, end]);
    const line = new THREE.Line(lineGeom, lineMat);
    group.add(line);

    const cone = new THREE.Mesh(coneGeom, arrowHeadMat);
    cone.position.copy(end);
    cone.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(nx, ny, nz));
    group.add(cone);
  }

  group.userData = {
    coreMesh,
    elapsed: 0
  };

  return group;
}

export function update(mesh, dt) {
  mesh.userData.elapsed += dt;
  mesh.rotation.y += dt * 0.4;
  mesh.rotation.x += dt * 0.2;
}
