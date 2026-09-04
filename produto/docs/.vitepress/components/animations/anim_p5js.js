export function createMesh(THREE) {
  const group = new THREE.Group();

  // Curvas paramétricas generativas (estilo P5.js Generative Art / Processing)
  const curveCount = 6;
  const pointsPerCurve = 140;
  const curves = [];

  const colors = [0xed225d, 0x38bdf8, 0xfacc15, 0xa855f7, 0x4ade80, 0xf472b6]; // Inclui o rosa do P5.js

  for (let c = 0; c < curveCount; c++) {
    const points = [];
    for (let i = 0; i < pointsPerCurve; i++) {
      points.push(new THREE.Vector3(0, 0, 0));
    }
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({
      color: colors[c % colors.length],
      linewidth: 2,
      transparent: true,
      opacity: 0.85
    });
    const line = new THREE.Line(geom, mat);
    group.add(line);
    curves.push({ line, points, freqA: 1 + c * 0.5, freqB: 2 + c * 0.3 });
  }

  // Círculo central pulsante (o cursor do Processing / P5)
  const brushGeom = new THREE.SphereGeometry(0.08, 16, 16);
  const brushMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const brush = new THREE.Mesh(brushGeom, brushMat);
  group.add(brush);

  group.userData = {
    curves,
    brush,
    pointsPerCurve,
    elapsed: 0
  };

  return group;
}

export function update(mesh, dt) {
  const data = mesh.userData;
  data.elapsed += dt;
  const t = data.elapsed;

  // Atualizar pontos das curvas de Lissajous tridimensionais
  data.curves.forEach((curveObj, cIdx) => {
    const positions = curveObj.line.geometry.attributes.position;
    const count = data.pointsPerCurve;

    for (let i = 0; i < count; i++) {
      const u = (i / count) * Math.PI * 2;
      const wave = t * 0.8 + cIdx * 0.4;

      const x = Math.sin(u * curveObj.freqA + wave) * (1.1 + Math.sin(wave * 0.5) * 0.2);
      const y = Math.cos(u * curveObj.freqB + wave) * (0.8 + Math.cos(wave * 0.7) * 0.2);
      const z = Math.sin((u + wave) * 2.0) * 0.6;

      positions.setXYZ(i, x, y, z);
    }
    positions.needsUpdate = true;
  });

  // Posição do "pincel" no topo da primeira curva
  const leadX = Math.sin(t * 1.5) * 1.1;
  const leadY = Math.cos(t * 2.0) * 0.8;
  const leadZ = Math.sin(t * 2.5) * 0.6;
  data.brush.position.set(leadX, leadY, leadZ);

  mesh.rotation.y += dt * 0.25;
  mesh.rotation.x = Math.sin(t * 0.4) * 0.15;
}
