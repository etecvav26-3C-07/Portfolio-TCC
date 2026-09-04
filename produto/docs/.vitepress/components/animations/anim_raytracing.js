export function createMesh(THREE) {
  const group = new THREE.Group();

  // Esfera reflexiva central
  const sphereGeom = new THREE.SphereGeometry(0.7, 32, 32);
  const sphereMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    roughness: 0.1,
    metalness: 0.85
  });
  const sphere = new THREE.Mesh(sphereGeom, sphereMat);
  sphere.position.set(0, 0, 0);
  group.add(sphere);

  // Segunda esfera secundária (vidro/refrativa fictícia)
  const sphere2Geom = new THREE.SphereGeometry(0.35, 24, 24);
  const sphere2Mat = new THREE.MeshStandardMaterial({
    color: 0xf472b6,
    roughness: 0.2,
    metalness: 0.6
  });
  const sphere2 = new THREE.Mesh(sphere2Geom, sphere2Mat);
  sphere2.position.set(1.2, 0.4, -0.4);
  group.add(sphere2);

  // Piso quadriculado / receptor
  const floorGeom = new THREE.PlaneGeometry(3.5, 3.5, 12, 12);
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.4,
    metalness: 0.1,
    wireframe: true
  });
  const floor = new THREE.Mesh(floorGeom, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.9;
  group.add(floor);

  // Câmera / emissor fictício
  const emitterGeom = new THREE.ConeGeometry(0.18, 0.4, 16);
  const emitterMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
  const emitter = new THREE.Mesh(emitterGeom, emitterMat);
  emitter.rotation.x = Math.PI / 2;
  emitter.position.set(-1.8, 0.6, 1.4);
  emitter.lookAt(0, 0, 0);
  group.add(emitter);

  // Raios primários e refletidos (linhas)
  const numRays = 14;
  const rayLines = [];
  const rayPoints = [];

  for (let i = 0; i < numRays; i++) {
    const points = [
      new THREE.Vector3(-1.8, 0.6, 1.4), // Origem
      new THREE.Vector3(0, 0, 0),         // Ponto de impacto na esfera
      new THREE.Vector3(0, 0, 0)          // Reflexão no chão ou no ar
    ];
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    const color = i % 2 === 0 ? 0x38bdf8 : 0xfbbf24;
    const mat = new THREE.LineBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.75,
      linewidth: 2
    });
    const line = new THREE.Line(geom, mat);
    group.add(line);
    rayLines.push(line);
    rayPoints.push(points);
  }

  group.userData = {
    sphere,
    sphere2,
    emitter,
    rayLines,
    rayPoints,
    elapsed: 0
  };

  return group;
}

export function update(mesh, dt) {
  const data = mesh.userData;
  data.elapsed += dt;
  const t = data.elapsed;

  // Movimento orbital suave da esfera secundária
  data.sphere2.position.set(
    Math.cos(t * 0.8) * 1.3,
    0.3 + Math.sin(t * 1.2) * 0.3,
    Math.sin(t * 0.8) * 1.3
  );

  // Atualização dinâmica dos raios de luz refletidos
  const origin = new THREE.Vector3(-1.8 + Math.sin(t * 0.5) * 0.2, 0.6 + Math.cos(t * 0.6) * 0.2, 1.4);
  data.emitter.position.copy(origin);
  data.emitter.lookAt(0, 0, 0);

  const spherePos = data.sphere.position;
  const r = 0.7;

  data.rayLines.forEach((line, i) => {
    const angle = (i / data.rayLines.length) * Math.PI * 0.8 - Math.PI * 0.4;
    const elevation = Math.sin(t * 1.5 + i) * 0.25;

    // Ponto na superfície da esfera central
    const hitPoint = new THREE.Vector3(
      Math.sin(angle) * r * 0.9,
      elevation * r,
      Math.cos(angle) * r * 0.9
    );

    // Vetor de incidência
    const incident = new THREE.Vector3().subVectors(hitPoint, origin).normalize();
    // Vetor normal aproximado
    const normal = new THREE.Vector3().subVectors(hitPoint, spherePos).normalize();
    // Vetor refletido: R = I - 2*(I.N)*N
    const reflected = incident.clone().sub(normal.clone().multiplyScalar(2 * incident.dot(normal)));

    // Ponto final após reflexão
    const bouncePoint = hitPoint.clone().add(reflected.multiplyScalar(1.6));

    const positions = line.geometry.attributes.position;
    positions.setXYZ(0, origin.x, origin.y, origin.z);
    positions.setXYZ(1, hitPoint.x, hitPoint.y, hitPoint.z);
    positions.setXYZ(2, bouncePoint.x, bouncePoint.y, bouncePoint.z);
    positions.needsUpdate = true;
  });

  mesh.rotation.y += dt * 0.1;
}
