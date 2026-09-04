export function createMesh(THREE) {
  const group = new THREE.Group();

  // Terreno do mapa com relevo base
  const groundGeom = new THREE.PlaneGeometry(3.2, 3.2, 16, 16);
  const groundMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.8,
    metalness: 0.1
  });
  const ground = new THREE.Mesh(groundGeom, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.7;
  group.add(ground);

  // Grade de ruas do mapa
  const grid = new THREE.GridHelper(3.2, 16, 0x38bdf8, 0x1e293b);
  grid.position.y = -0.69;
  group.add(grid);

  // Edifícios urbanos com extrusão 3D (estilo Mapbox 3D Buildings)
  const buildingsGroup = new THREE.Group();
  const buildingCount = 28;
  const buildings = [];

  for (let i = 0; i < buildingCount; i++) {
    const w = 0.2 + Math.random() * 0.22;
    const d = 0.2 + Math.random() * 0.22;
    const h = 0.3 + Math.random() * 1.1;

    const bGeom = new THREE.BoxGeometry(w, h, d);
    const bMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.3,
      metalness: 0.7,
      transparent: true,
      opacity: 0.88
    });
    const b = new THREE.Mesh(bGeom, bMat);

    // Posicionamento nas quadras
    const x = (Math.random() - 0.5) * 2.4;
    const z = (Math.random() - 0.5) * 2.4;
    b.position.set(x, -0.7 + h / 2, z);

    // Borda wireframe luminosa para cada edifício
    const edgesGeom = new THREE.EdgesGeometry(bGeom);
    const edges = new THREE.LineSegments(
      edgesGeom,
      new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.75 })
    );
    b.add(edges);

    buildingsGroup.add(b);
    buildings.push({ mesh: b, baseHeight: h });
  }
  group.add(buildingsGroup);

  // Marcador de Geolocalização (Pin GPS pulsante no centro da cidade)
  const pinGeom = new THREE.ConeGeometry(0.12, 0.35, 16);
  const pinMat = new THREE.MeshStandardMaterial({
    color: 0xef4444, // Vermelho Mapbox
    emissive: 0xb91c1c,
    emissiveIntensity: 0.6,
    roughness: 0.2,
    metalness: 0.8
  });
  const pin = new THREE.Mesh(pinGeom, pinMat);
  pin.rotation.x = Math.PI; // Apontando para o chão
  pin.position.set(0, 0.45, 0);
  group.add(pin);

  // Radar / Ondas de pulso GPS concêntricas no solo
  const radarGeom = new THREE.RingGeometry(0.1, 0.15, 32);
  const radarMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8
  });
  const radar = new THREE.Mesh(radarGeom, radarMat);
  radar.rotation.x = -Math.PI / 2;
  radar.position.y = -0.68;
  group.add(radar);

  group.userData = {
    buildings,
    pin,
    radar,
    elapsed: 0
  };

  return group;
}

export function update(mesh, dt) {
  const data = mesh.userData;
  data.elapsed += dt;
  const t = data.elapsed;

  // Pulso do Pin GPS
  data.pin.position.y = 0.45 + Math.sin(t * 3.0) * 0.08;

  // Expansão da onda de radar GPS
  const wave = (t * 0.8) % 1.0;
  const scale = 0.5 + wave * 4.0;
  data.radar.scale.set(scale, scale, scale);
  data.radar.material.opacity = Math.max(0, 0.9 - wave * 0.9);

  // Respiração sutil dos edifícios (extrusão dinâmica)
  data.buildings.forEach((b, idx) => {
    const factor = 1.0 + Math.sin(t * 1.5 + idx) * 0.05;
    b.mesh.scale.y = factor;
  });

  mesh.rotation.y += dt * 0.15;
}
