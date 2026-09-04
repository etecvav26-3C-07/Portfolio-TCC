export function createMesh(THREE) {
  const group = new THREE.Group();

  // Chão receptor
  const floorGeom = new THREE.PlaneGeometry(3.2, 3.2);
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.8,
    metalness: 0.1
  });
  const floor = new THREE.Mesh(floorGeom, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.8;
  group.add(floor);

  // Colunas / objetos oclusores
  const boxGeom = new THREE.BoxGeometry(0.45, 0.9, 0.45);
  const boxMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    roughness: 0.3,
    metalness: 0.3
  });
  const box = new THREE.Mesh(boxGeom, boxMat);
  box.position.set(-0.6, -0.35, 0);
  group.add(box);

  const torusGeom = new THREE.TorusGeometry(0.35, 0.12, 16, 32);
  const torusMat = new THREE.MeshStandardMaterial({
    color: 0xf472b6,
    roughness: 0.25,
    metalness: 0.5
  });
  const torus = new THREE.Mesh(torusGeom, torusMat);
  torus.position.set(0.6, 0.1, 0);
  group.add(torus);

  // Silhuetas de sombra projetadas geometricamente no piso (garante efeito mesmo sem shadow map nativo ativado)
  const shadowMat = new THREE.MeshBasicMaterial({
    color: 0x050811,
    transparent: true,
    opacity: 0.65
  });

  const shadowBoxGeom = new THREE.PlaneGeometry(0.45, 0.45);
  const shadowBox = new THREE.Mesh(shadowBoxGeom, shadowMat);
  shadowBox.rotation.x = -Math.PI / 2;
  shadowBox.position.y = -0.79;
  group.add(shadowBox);

  const shadowTorusGeom = new THREE.CircleGeometry(0.38, 24);
  const shadowTorus = new THREE.Mesh(shadowTorusGeom, shadowMat);
  shadowTorus.rotation.x = -Math.PI / 2;
  shadowTorus.position.y = -0.79;
  group.add(shadowTorus);

  // Luz indicadora (sol / lâmpada direcional)
  const lightMarker = new THREE.Mesh(
    new THREE.SphereGeometry(0.08, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xfef08a })
  );
  group.add(lightMarker);

  group.userData = {
    box,
    torus,
    shadowBox,
    shadowTorus,
    lightMarker,
    elapsed: 0
  };

  return group;
}

export function update(mesh, dt) {
  const data = mesh.userData;
  data.elapsed += dt;
  const t = data.elapsed;

  // Movimento dos objetos
  data.torus.rotation.x += dt * 1.5;
  data.torus.rotation.y += dt * 0.8;
  data.torus.position.y = 0.1 + Math.sin(t * 2.0) * 0.15;

  // Trajetória da fonte de luz
  const lx = Math.cos(t * 0.8) * 1.8;
  const lz = Math.sin(t * 0.8) * 1.8;
  const ly = 1.6 + Math.sin(t * 1.2) * 0.3;
  data.lightMarker.position.set(lx, ly, lz);

  // Projeção dinâmica da sombra baseada na direção da luz
  const lightDirX = -lx / ly;
  const lightDirZ = -lz / ly;

  data.shadowBox.position.x = data.box.position.x + lightDirX * 0.5;
  data.shadowBox.position.z = data.box.position.z + lightDirZ * 0.5;
  data.shadowBox.scale.set(1 + Math.abs(lightDirX) * 0.6, 1 + Math.abs(lightDirZ) * 0.6, 1);

  data.shadowTorus.position.x = data.torus.position.x + lightDirX * (data.torus.position.y + 0.8);
  data.shadowTorus.position.z = data.torus.position.z + lightDirZ * (data.torus.position.y + 0.8);
  data.shadowTorus.scale.set(1 + Math.abs(lightDirX) * 0.5, 1 + Math.abs(lightDirZ) * 0.5, 1);

  mesh.rotation.y += dt * 0.08;
}
