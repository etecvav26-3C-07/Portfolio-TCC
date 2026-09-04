export function createMesh(THREE) {
  const group = new THREE.Group();

  // Gerar textura procedural checkerboard / UV grid via Canvas 2D
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  const size = 32;
  for (let y = 0; y < 256; y += size) {
    for (let x = 0; x < 256; x += size) {
      const isEven = (x / size + y / size) % 2 === 0;
      ctx.fillStyle = isEven ? "#38bdf8" : "#0f172a";
      ctx.fillRect(x, y, size, size);

      // Linhas de grade UV
      ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
      ctx.strokeRect(x, y, size, size);
    }
  }

  // Texto UV para fins didáticos
  ctx.fillStyle = "#f8fafc";
  ctx.font = "bold 20px monospace";
  ctx.fillText("U V", 110, 135);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  // Cubo texturizado central
  const cubeGeom = new THREE.BoxGeometry(1.2, 1.2, 1.2);
  const cubeMat = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.3,
    metalness: 0.1
  });
  const cube = new THREE.Mesh(cubeGeom, cubeMat);
  group.add(cube);

  // Plano desdobrado (Unwrapped UV representation)
  const planeGeom = new THREE.PlaneGeometry(1.1, 1.1);
  const planeMat = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.85
  });
  const plane = new THREE.Mesh(planeGeom, planeMat);
  plane.position.set(1.4, 0.6, -0.6);
  plane.rotation.y = -0.4;
  group.add(plane);

  // Borda do plano UV
  const wireGeom = new THREE.WireframeGeometry(planeGeom);
  const wire = new THREE.LineSegments(wireGeom, new THREE.LineBasicMaterial({ color: 0x38bdf8 }));
  plane.add(wire);

  group.userData = {
    cube,
    plane,
    texture,
    elapsed: 0
  };

  return group;
}

export function update(mesh, dt) {
  const data = mesh.userData;
  data.elapsed += dt;
  const t = data.elapsed;

  data.cube.rotation.y += dt * 0.45;
  data.cube.rotation.x += dt * 0.25;

  // Animar o offset da textura para ilustrar amostragem UV (UV scrolling / mapping)
  data.texture.offset.x = (t * 0.15) % 1;
  data.texture.offset.y = (t * 0.1) % 1;

  data.plane.position.y = 0.6 + Math.sin(t * 1.5) * 0.12;
}
