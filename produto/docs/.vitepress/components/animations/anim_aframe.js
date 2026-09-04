export function createMesh(THREE) {
  const group = new THREE.Group();

  // Headset VR estilizado
  const visorGeom = new THREE.BoxGeometry(0.75, 0.45, 0.4, 4, 4, 4);
  const visorMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.2,
    metalness: 0.8
  });
  const visor = new THREE.Mesh(visorGeom, visorMat);
  visor.position.set(0, 0.2, 0);
  group.add(visor);

  // Lentes / Face frontal brilhante
  const faceplateGeom = new THREE.PlaneGeometry(0.65, 0.35);
  const faceplateMat = new THREE.MeshStandardMaterial({
    color: 0xef4444, // Vermelho característico do logo A-Frame
    emissive: 0xd97706,
    emissiveIntensity: 0.45,
    roughness: 0.1,
    metalness: 0.9
  });
  const faceplate = new THREE.Mesh(faceplateGeom, faceplateMat);
  faceplate.position.set(0, 0.2, 0.205);
  group.add(faceplate);

  // Faixa do headset
  const strapGeom = new THREE.TorusGeometry(0.5, 0.04, 8, 32);
  const strapMat = new THREE.MeshBasicMaterial({ color: 0x334155 });
  const strap = new THREE.Mesh(strapGeom, strapMat);
  strap.rotation.x = Math.PI / 2;
  strap.position.set(0, 0.2, -0.2);
  group.add(strap);

  // Controladores manuais com raios laser
  const controllerGeom = new THREE.CylinderGeometry(0.04, 0.05, 0.25, 12);
  const controllerMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.5, roughness: 0.3 });

  const leftController = new THREE.Mesh(controllerGeom, controllerMat);
  const rightController = new THREE.Mesh(controllerGeom, controllerMat);
  leftController.position.set(-0.7, -0.4, 0.4);
  rightController.position.set(0.7, -0.4, 0.4);
  group.add(leftController);
  group.add(rightController);

  // Raios Laser dos controladores (Point-and-click interativo em VR)
  const laserMat = new THREE.LineBasicMaterial({ color: 0xef4444, linewidth: 2 });

  const leftLaserGeom = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0.12, 0),
    new THREE.Vector3(0, 1.6, 1.2)
  ]);
  const leftLaser = new THREE.Line(leftLaserGeom, laserMat);
  leftController.add(leftLaser);

  const rightLaserGeom = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0.12, 0),
    new THREE.Vector3(0, 1.6, 1.2)
  ]);
  const rightLaser = new THREE.Line(rightLaserGeom, laserMat);
  rightController.add(rightLaser);

  // Cubos holográficos flutuantes alvos de interação no espaço 360°
  const targetCount = 5;
  const targets = [];
  const targetGeom = new THREE.IcosahedronGeometry(0.14, 0);
  for (let i = 0; i < targetCount; i++) {
    const mat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.3,
      wireframe: true
    });
    const target = new THREE.Mesh(targetGeom, mat);
    group.add(target);
    targets.push(target);
  }

  // Redoma / Grid esférico de horizonte VR
  const domeGeom = new THREE.SphereGeometry(2.4, 16, 12);
  const domeMat = new THREE.MeshBasicMaterial({
    color: 0x1e293b,
    wireframe: true,
    transparent: true,
    opacity: 0.25
  });
  const dome = new THREE.Mesh(domeGeom, domeMat);
  group.add(dome);

  group.userData = {
    visor,
    faceplate,
    leftController,
    rightController,
    targets,
    elapsed: 0
  };

  return group;
}

export function update(mesh, dt) {
  const data = mesh.userData;
  data.elapsed += dt;
  const t = data.elapsed;

  // Movimento de rotação do headset (observador explorando o ambiente VR)
  data.visor.rotation.y = Math.sin(t * 1.2) * 0.35;
  data.visor.rotation.x = Math.sin(t * 0.9) * 0.15;
  data.faceplate.rotation.y = data.visor.rotation.y;
  data.faceplate.rotation.x = data.visor.rotation.x;

  // Movimentação sutil das mãos com controladores
  data.leftController.position.y = -0.4 + Math.sin(t * 2.0) * 0.08;
  data.leftController.rotation.x = -0.3 + Math.sin(t * 1.5) * 0.2;
  data.leftController.rotation.z = Math.sin(t * 1.8) * 0.15;

  data.rightController.position.y = -0.4 + Math.cos(t * 2.0) * 0.08;
  data.rightController.rotation.x = -0.3 + Math.cos(t * 1.5) * 0.2;
  data.rightController.rotation.z = -Math.sin(t * 1.8) * 0.15;

  // Alvos interativos em órbita espacial
  data.targets.forEach((target, i) => {
    const angle = (i / data.targets.length) * Math.PI * 2 + t * 0.4;
    const r = 1.6;
    target.position.set(Math.cos(angle) * r, 0.4 + Math.sin(t * 2.0 + i) * 0.2, Math.sin(angle) * r);
    target.rotation.x += dt * 1.5;
    target.rotation.y += dt * 1.5;
  });

  mesh.rotation.y += dt * 0.15;
}
