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

function updateBadgeText(sprite, text, color = null) {
  const { canvas, ctx, texture, width, height } = sprite.userData;
  const strokeColor = color || sprite.userData.color;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
  ctx.strokeStyle = strokeColor;
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

  texture.needsUpdate = true;
}

export function createMesh(THREE) {
  const group = new THREE.Group();
  const stages = [
    { label: "VBO / VAO", color: 0x38bdf8, name: "Entrada de Vértices" },
    { label: "Vertex Shader", color: 0x818cf8, name: "gl_Position = MVP * pos" },
    { label: "Rasterizador", color: 0xf472b6, name: "Geração de Fragmentos" },
    { label: "Fragment Shader", color: 0xfbbf24, name: "Cálculo de Cor / Framebuffer" }
  ];

  stages.forEach((stage, index) => {
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(1.0, 0.38, 1.0),
      new THREE.MeshStandardMaterial({
        color: stage.color,
        roughness: 0.35,
        metalness: 0.25,
        transparent: true,
        opacity: 0.85
      })
    );
    box.position.y = 1.25 - index * 0.82;
    group.add(box);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.58, 0.025, 10, 32),
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

  // Badges conceituais
  const titleBadge = createTextBadge(THREE, "Pipeline OpenGL: VBO/VAO → VS → Raster → FS", "#38bdf8", 480, 60);
  titleBadge.position.set(0, 1.75, 0);
  titleBadge.scale.set(2.4, 0.3, 1);
  group.add(titleBadge);

  const statusBadge = createTextBadge(THREE, "Estágio: VBO → Carregando Atributos", "#fbbf24", 480, 60);
  statusBadge.position.set(0, -1.6, 0);
  statusBadge.scale.set(2.4, 0.3, 1);
  group.add(statusBadge);

  group.userData = {
    tri,
    stages,
    statusBadge,
    elapsed: 0
  };
  return group;
}

export function update(mesh, dt) {
  const d = mesh.userData;
  d.elapsed += dt;
  const t = d.elapsed;
  const progress = (t * 0.45) % 1.0;
  const y = 1.45 - progress * 3.1;

  d.tri.position.set(Math.sin(t * 1.6) * 0.18, y, 0);
  d.tri.rotation.y += dt * 2.4;
  mesh.rotation.y += dt * 0.12;

  // Atualiza telemetria do estágio ativo
  let stageName = "VBO/VAO (Dados Brutos na GPU)";
  let color = "#38bdf8";
  if (progress > 0.75) {
    stageName = "Fragment Shader (Coloração Final do Pixel)";
    color = "#fbbf24";
  } else if (progress > 0.5) {
    stageName = "Rasterizador (Interpolação de Primitivas)";
    color = "#f472b6";
  } else if (progress > 0.25) {
    stageName = "Vertex Shader (Transformação de Coordenadas MVP)";
    color = "#818cf8";
  }

  updateBadgeText(d.statusBadge, `Estágio Ativo: ${stageName}`, color);
}
