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

  // Plataformas de nível 2D / 2.5D
  const platMat = new THREE.MeshStandardMaterial({
    color: 0x22c55e, // Verde grama
    roughness: 0.5,
    metalness: 0.1
  });

  const mainPlat = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.25, 0.4), platMat);
  mainPlat.position.set(0, -0.9, 0);
  group.add(mainPlat);

  const leftPlat = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.2, 0.4), platMat);
  leftPlat.position.set(-0.9, -0.3, 0);
  group.add(leftPlat);

  const rightPlat = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.2, 0.4), platMat);
  rightPlat.position.set(0.9, 0.2, 0);
  group.add(rightPlat);

  // Moedas colecionáveis douradas giratórias
  const coinGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.04, 16);
  const coinMat = new THREE.MeshStandardMaterial({
    color: 0xfacc15,
    emissive: 0xeab308,
    emissiveIntensity: 0.4,
    metalness: 0.9,
    roughness: 0.2
  });

  const coins = [];
  const coinPositions = [
    [-0.9, 0.05, 0],
    [0.9, 0.55, 0],
    [0.0, -0.5, 0]
  ];

  coinPositions.forEach((pos) => {
    const coin = new THREE.Mesh(coinGeom, coinMat);
    coin.rotation.x = Math.PI / 2;
    coin.position.set(...pos);
    group.add(coin);
    coins.push(coin);
  });

  // Personagem herói do jogo (estilo pixel art / voxel 3D)
  const heroGroup = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.28, 0.35, 0.2),
    new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.3 })
  );
  heroGroup.add(body);

  const head = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, 0.22, 0.22),
    new THREE.MeshStandardMaterial({ color: 0xfbcfe8, roughness: 0.4 })
  );
  head.position.y = 0.28;
  heroGroup.add(head);

  heroGroup.position.set(-0.9, 0.05, 0);
  group.add(heroGroup);

  // Badges conceituais didáticos
  const titleBadge = createTextBadge(THREE, "Phaser: Motor de Jogos 2D / 2.5D (Arcade Physics)", "#38bdf8", 480, 60);
  titleBadge.position.set(0, 1.7, 0);
  titleBadge.scale.set(2.4, 0.3, 1);
  group.add(titleBadge);

  const statusBadge = createTextBadge(THREE, "Máquina de Estados: Salto Parabólico + Colisão AABB de Plataforma", "#fbbf24", 510, 60);
  statusBadge.position.set(0, -1.5, 0);
  statusBadge.scale.set(2.55, 0.3, 1);
  group.add(statusBadge);

  group.userData = {
    heroGroup,
    coins,
    statusBadge,
    elapsed: 0
  };

  return group;
}

export function update(mesh, dt) {
  const data = mesh.userData;
  data.elapsed += dt;
  const t = data.elapsed;

  // Rotação contínua das moedas de jogo
  data.coins.forEach((coin) => {
    coin.rotation.z += dt * 3.5;
  });

  // Salto cíclico do personagem entre plataformas (máquina de estados do Phaser)
  const cycle = (t * 0.7) % 3.0;
  let targetX = 0;
  let targetY = 0;

  if (cycle < 1.0) {
    // Da esquerda para o centro
    const p = cycle;
    targetX = -0.9 + p * 0.9;
    targetY = -0.05 + Math.sin(p * Math.PI) * 0.7 - p * 0.5;
  } else if (cycle < 2.0) {
    // Do centro para a direita
    const p = cycle - 1.0;
    targetX = 0.0 + p * 0.9;
    targetY = -0.55 + Math.sin(p * Math.PI) * 1.1 + p * 0.95;
  } else {
    // Da direita de volta para a esquerda
    const p = cycle - 2.0;
    targetX = 0.9 - p * 1.8;
    targetY = 0.45 + Math.sin(p * Math.PI) * 0.6 - p * 0.45;
  }

  data.heroGroup.position.set(targetX, targetY, 0);

  mesh.rotation.y = Math.sin(t * 0.3) * 0.15;
}
