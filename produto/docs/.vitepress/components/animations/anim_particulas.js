export function createMesh(THREE) {
  const group = new THREE.Group();

  const particleCount = 450;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const velocities = [];

  const color1 = new THREE.Color(0x38bdf8); // Ciano
  const color2 = new THREE.Color(0xf472b6); // Rosa
  const color3 = new THREE.Color(0xfbbf24); // Dourado

  for (let i = 0; i < particleCount; i++) {
    // Posição inicial no emissor central
    const angle = Math.random() * Math.PI * 2;
    const r = Math.random() * 0.3;
    positions[i * 3] = Math.cos(angle) * r;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
    positions[i * 3 + 2] = Math.sin(angle) * r;

    // Velocidades aleatórias com componente ascendente
    velocities.push({
      vx: (Math.random() - 0.5) * 0.8,
      vy: 0.8 + Math.random() * 1.2,
      vz: (Math.random() - 0.5) * 0.8,
      life: Math.random()
    });

    const mix = Math.random();
    const c = mix < 0.5 ? color1.clone().lerp(color2, mix * 2) : color2.clone().lerp(color3, (mix - 0.5) * 2);
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.065,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(geometry, material);
  group.add(particleSystem);

  // Emissor no chão
  const baseGeom = new THREE.CylinderGeometry(0.4, 0.45, 0.12, 24);
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.8,
    roughness: 0.3
  });
  const emitterBase = new THREE.Mesh(baseGeom, baseMat);
  emitterBase.position.y = -1.1;
  group.add(emitterBase);

  // Anel de luz
  const ringGeom = new THREE.TorusGeometry(0.42, 0.03, 12, 32);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
  const ring = new THREE.Mesh(ringGeom, ringMat);
  ring.rotation.x = Math.PI / 2;
  ring.position.y = -1.04;
  group.add(ring);

  group.userData = {
    particleSystem,
    velocities,
    particleCount,
    elapsed: 0
  };

  return group;
}

export function update(mesh, dt) {
  const data = mesh.userData;
  data.elapsed += dt;

  const positions = data.particleSystem.geometry.attributes.position;
  const count = data.particleCount;

  for (let i = 0; i < count; i++) {
    const v = data.velocities[i];
    v.life += dt * 0.6;

    if (v.life > 1.0) {
      // Reiniciar no emissor
      v.life = 0;
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 0.25;
      positions.setXYZ(i, Math.cos(angle) * r, -1.0, Math.sin(angle) * r);
    } else {
      let x = positions.getX(i);
      let y = positions.getY(i);
      let z = positions.getZ(i);

      // Vórtice espiral
      const theta = dt * 1.8;
      const newX = x * Math.cos(theta) - z * Math.sin(theta);
      const newZ = x * Math.sin(theta) + z * Math.cos(theta);

      x = newX + v.vx * dt;
      y += v.vy * dt;
      z = newZ + v.vz * dt;

      positions.setXYZ(i, x, y, z);
    }
  }

  positions.needsUpdate = true;
  mesh.rotation.y += dt * 0.15;
}
