export function createMesh(THREE) {
  const group = new THREE.Group();

  // Plataforma isométrica de game (estilo PlayCanvas Level)
  const platformGeom = new THREE.CylinderGeometry(1.6, 1.8, 0.25, 6);
  const platformMat = new THREE.MeshStandardMaterial({
    color: 0xe94e1b, // Laranja característico do PlayCanvas
    roughness: 0.35,
    metalness: 0.4
  });
  const platform = new THREE.Mesh(platformGeom, platformMat);
  platform.position.y = -0.8;
  group.add(platform);

  // Grade hexagonal no topo da plataforma
  const gridGeom = new THREE.WireframeGeometry(platformGeom);
  const grid = new THREE.LineSegments(gridGeom, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 }));
  grid.position.y = -0.8;
  group.add(grid);

  // Personagem / Esfera física saltitante (Physics simulation)
  const ballGeom = new THREE.SphereGeometry(0.3, 32, 32);
  const ballMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.15,
    metalness: 0.8
  });
  const ball = new THREE.Mesh(ballGeom, ballMat);
  ball.position.set(0, 0.2, 0);
  group.add(ball);

  // Sombra de oclusão no chão
  const shadowGeom = new THREE.CircleGeometry(0.35, 24);
  const shadowMat = new THREE.MeshBasicMaterial({ color: 0x111827, transparent: true, opacity: 0.6 });
  const shadow = new THREE.Mesh(shadowGeom, shadowMat);
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -0.67;
  group.add(shadow);

  // Três cristais colecionáveis rotativos (Game pickups)
  const crystalGeom = new THREE.OctahedronGeometry(0.2, 0);
  const crystalMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x0284c7,
    emissiveIntensity: 0.5,
    roughness: 0.1,
    metalness: 0.8
  });

  const crystals = [];
  for (let i = 0; i < 3; i++) {
    const crystal = new THREE.Mesh(crystalGeom, crystalMat);
    group.add(crystal);
    crystals.push(crystal);
  }

  // Luz pontual dinâmica anexada à esfera do jogo
  const gameLight = new THREE.PointLight(0xffedd5, 1.8, 6);
  ball.add(gameLight);

  group.userData = {
    platform,
    ball,
    shadow,
    crystals,
    elapsed: 0
  };

  return group;
}

export function update(mesh, dt) {
  const data = mesh.userData;
  data.elapsed += dt;
  const t = data.elapsed;

  // Salto da esfera com física simulada (gravidade senoidal com amortecimento)
  const bounce = Math.abs(Math.sin(t * 3.2));
  data.ball.position.y = -0.37 + bounce * 0.9;
  data.ball.rotation.x += dt * 2.0;
  data.ball.rotation.z += dt * 1.5;

  // Sombra cresce e diminui proporcionalmente à altura da bola
  const shadowScale = 1.0 - bounce * 0.45;
  data.shadow.scale.set(shadowScale, shadowScale, 1);

  // Cristais orbitando a arena
  data.crystals.forEach((c, i) => {
    const angle = (i / 3) * Math.PI * 2 + t * 1.2;
    const r = 1.0;
    c.position.set(Math.cos(angle) * r, -0.2 + Math.sin(t * 2.5 + i) * 0.15, Math.sin(angle) * r);
    c.rotation.y += dt * 2.5;
    c.rotation.x += dt * 1.2;
  });

  mesh.rotation.y += dt * 0.2;
}
