export function createMesh(THREE) {
  const group = new THREE.Group();

  // Torus com material customizado / shaders conceituais
  const geom = new THREE.TorusKnotGeometry(0.75, 0.22, 128, 32);

  // Criamos atributos de cores dinâmicas para simular processamento de vertex & fragment shader
  const count = geom.attributes.position.count;
  const colors = new Float32Array(count * 3);
  const basePositions = geom.attributes.position.clone();

  for (let i = 0; i < count; i++) {
    colors[i * 3] = 0.2;
    colors[i * 3 + 1] = 0.7;
    colors[i * 3 + 2] = 1.0;
  }
  geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.25,
    metalness: 0.5,
    wireframe: false
  });

  const mesh = new THREE.Mesh(geom, mat);
  group.add(mesh);

  // Adicionamos um wireframe orbital para simbolizar a malha do vertex shader
  const wireGeom = new THREE.IcosahedronGeometry(1.4, 1);
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x818cf8,
    wireframe: true,
    transparent: true,
    opacity: 0.25
  });
  const wireMesh = new THREE.Mesh(wireGeom, wireMat);
  group.add(wireMesh);

  group.userData = {
    mesh,
    wireMesh,
    basePositions,
    geom,
    elapsed: 0
  };

  return group;
}

export function update(mesh, dt) {
  const data = mesh.userData;
  data.elapsed += dt;
  const t = data.elapsed;

  data.mesh.rotation.y += dt * 0.4;
  data.mesh.rotation.x += dt * 0.25;
  data.wireMesh.rotation.y -= dt * 0.15;

  const positions = data.geom.attributes.position;
  const colors = data.geom.attributes.color;
  const base = data.basePositions;
  const count = positions.count;

  // Ondulação de vértices (Vertex Shader em ação) e gradiente procedural (Fragment Shader)
  for (let i = 0; i < count; i += 3) {
    const bx = base.getX(i);
    const by = base.getY(i);
    const bz = base.getZ(i);

    const wave = Math.sin(bx * 2.5 + t * 3.0) * Math.cos(by * 2.5 + t * 3.0) * 0.08;
    positions.setXYZ(i, bx + wave, by + wave, bz + wave);

    // Cores calculadas dinamicamente
    const r = 0.5 + 0.5 * Math.sin(bx * 2.0 + t * 2.0);
    const g = 0.5 + 0.5 * Math.sin(by * 2.0 + t * 2.5);
    const b = 0.5 + 0.5 * Math.cos(bz * 2.0 + t * 1.5);
    colors.setXYZ(i, r, g, b);
  }

  positions.needsUpdate = true;
  colors.needsUpdate = true;
}
