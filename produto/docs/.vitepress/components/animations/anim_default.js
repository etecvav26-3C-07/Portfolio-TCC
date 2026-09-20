function createTextBadge(THREE, text, color = "#38bdf8", width = 480, height = 70) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;

  ctx.beginPath();
  ctx.roundRect(4, 4, width - 8, height - 8, 12);
  ctx.fill();
  ctx.stroke();

  ctx.font = "bold 20px sans-serif";
  ctx.fillStyle = "#f8fafc";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, width / 2, height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(spriteMat);
  sprite.scale.set(width / 200, height / 200, 1);
  sprite.userData = { canvas, ctx, texture, width, height, color };
  return sprite;
}

export function createMesh(THREE) {
  const group = new THREE.Group();

  const geometry = new THREE.IcosahedronGeometry(0.95, 1);
  const material = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    roughness: 0.25,
    metalness: 0.7,
    flatShading: true
  });
  const mesh = new THREE.Mesh(geometry, material);
  group.add(mesh);

  const wireGeom = new THREE.WireframeGeometry(geometry);
  const wireMat = new THREE.LineBasicMaterial({
    color: 0xbae6fd,
    transparent: true,
    opacity: 0.4
  });
  const wire = new THREE.LineSegments(wireGeom, wireMat);
  group.add(wire);

  // Badges conceituais
  const titleBadge = createTextBadge(THREE, "Computação Gráfica 3D: Geometria • Wireframe • Sombreamento", "#38bdf8", 500, 60);
  titleBadge.position.set(0, 1.7, 0);
  titleBadge.scale.set(2.5, 0.3, 1);
  group.add(titleBadge);

  const statusBadge = createTextBadge(THREE, "Interativo: Arraste para Orbitar | Alternar Wireframe no Topo", "#fbbf24", 500, 60);
  statusBadge.position.set(0, -1.5, 0);
  statusBadge.scale.set(2.5, 0.3, 1);
  group.add(statusBadge);

  return group;
}

export function update(mesh, dt) {
  mesh.rotation.y += dt * 0.4;
  mesh.rotation.x += dt * 0.15;
}
