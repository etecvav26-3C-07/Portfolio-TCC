export function createMesh(THREE) {
  const group = new THREE.Group();

  const geometry = new THREE.PlaneGeometry(2.2, 2.2, 10, 10);
  const material = new THREE.MeshBasicMaterial({
    color: 0x89a7b8,
    wireframe: false,
    vertexColors: true,
    side: THREE.DoubleSide
  });

  const colors = [];
  const colorA = new THREE.Color(0x0f172a);
  const colorB = new THREE.Color(0x38bdf8);
  const pos = geometry.getAttribute("position");
  for (let i = 0; i < pos.count; i++) {
    const mix = ((pos.getX(i) + 1.1) / 2.2 + (pos.getY(i) + 1.1) / 2.2) * 0.5;
    const c = colorA.clone().lerp(colorB, mix);
    colors.push(c.r, c.g, c.b);
  }
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  const plane = new THREE.Mesh(geometry, material);
  plane.rotation.x = -0.55;
  group.add(plane);

  const grid = new THREE.LineSegments(
    new THREE.WireframeGeometry(geometry),
    new THREE.LineBasicMaterial({ color: 0xe2e8f0, transparent: true, opacity: 0.7 })
  );
  grid.rotation.copy(plane.rotation);
  group.add(grid);

  const triangleGeom = new THREE.BufferGeometry();
  triangleGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute([-0.7, 0.55, 0.35, 0.75, 0.2, 0.35, 0.05, -0.65, 0.35], 3)
  );
  const triangle = new THREE.Mesh(
    triangleGeom,
    new THREE.MeshBasicMaterial({
      color: 0xf472b6,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide
    })
  );
  triangle.rotation.x = -0.55;
  group.add(triangle);

  group.userData.plane = plane;
  group.userData.grid = grid;
  return group;
}

export function update(mesh, dt) {
  mesh.userData.plane.rotation.z += dt * 0.08;
  mesh.userData.grid.rotation.z = mesh.userData.plane.rotation.z;
}
