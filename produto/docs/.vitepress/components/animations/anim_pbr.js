function createTextBadge(THREE, text, color = "#38bdf8", width = 460, height = 70) {
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

  const rows = 3;
  const cols = 3;
  const spacing = 0.76;
  const spheres = [];

  const baseGeom = new THREE.SphereGeometry(0.25, 32, 32);

  // 1. Matriz de Esferas PBR: Roughness (Linhas) x Metalness (Colunas)
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Linha 0 (topo) = rugosidade baixa (polido); Linha 2 (base) = rugosidade alta (fosco)
      const roughness = Math.max(0.05, (rows - 1 - r) / (rows - 1));
      const metalness = c / (cols - 1);

      const mat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        roughness: roughness,
        metalness: metalness
      });

      const sphere = new THREE.Mesh(baseGeom, mat);
      const posX = (c - (cols - 1) / 2) * spacing;
      const posY = (r - (rows - 1) / 2) * spacing;
      sphere.position.set(posX, posY, 0);

      group.add(sphere);
      spheres.push({ mesh: sphere, r, c, roughness, metalness });
    }
  }

  // 2. Setas dos Eixos Conceituais
  // Eixo X: Metalicidade (Dielétrico 0.0 → Condutor 1.0)
  const xArrowGeom = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-spacing - 0.25, -spacing - 0.42, 0),
    new THREE.Vector3(spacing + 0.35, -spacing - 0.42, 0)
  ]);
  const xArrow = new THREE.Line(
    xArrowGeom,
    new THREE.LineBasicMaterial({ color: 0xfbbf24, linewidth: 2.5 })
  );
  group.add(xArrow);

  const xCone = new THREE.Mesh(
    new THREE.ConeGeometry(0.04, 0.12, 12),
    new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
  );
  xCone.rotation.z = -Math.PI / 2;
  xCone.position.set(spacing + 0.35, -spacing - 0.42, 0);
  group.add(xCone);

  // Eixo Y: Rugosidade (Polido/Espelho ↑ Fosco)
  const yArrowGeom = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-spacing - 0.45, -spacing - 0.25, 0),
    new THREE.Vector3(-spacing - 0.45, spacing + 0.35, 0)
  ]);
  const yArrow = new THREE.Line(
    yArrowGeom,
    new THREE.LineBasicMaterial({ color: 0xf472b6, linewidth: 2.5 })
  );
  group.add(yArrow);

  const yCone = new THREE.Mesh(
    new THREE.ConeGeometry(0.04, 0.12, 12),
    new THREE.MeshBasicMaterial({ color: 0xf472b6 })
  );
  yCone.position.set(-spacing - 0.45, spacing + 0.35, 0);
  group.add(yCone);

  // 3. Luz pontual orbital dinâmica
  const pointLight = new THREE.PointLight(0xfff7ed, 3.2, 10);
  group.add(pointLight);

  const lightHelper = new THREE.Mesh(
    new THREE.SphereGeometry(0.07, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xfef08a })
  );
  group.add(lightHelper);

  // 4. Badges conceituais
  const titleBadge = createTextBadge(THREE, "Materiais PBR: Cook-Torrance (BRDF = D · F · G)", "#38bdf8", 460, 60);
  titleBadge.position.set(0, 1.7, 0);
  titleBadge.scale.set(2.3, 0.3, 1);
  group.add(titleBadge);

  const statusBadge = createTextBadge(THREE, "Eixo X: Metalicidade (0→1) | Eixo Y: Rugosidade (0→1)", "#fbbf24", 480, 60);
  statusBadge.position.set(0, -1.5, 0);
  statusBadge.scale.set(2.4, 0.3, 1);
  group.add(statusBadge);

  group.userData = {
    spheres,
    pointLight,
    lightHelper,
    statusBadge,
    elapsed: 0
  };

  return group;
}

export function update(mesh, dt) {
  const d = mesh.userData;
  d.elapsed += dt;
  const t = d.elapsed;

  // Órbita da luz evidenciando o comportamento dos lóbulos especulares GGX
  const lx = Math.cos(t * 1.1) * 1.6;
  const ly = Math.sin(t * 1.3) * 1.1;
  const lz = 1.1 + Math.sin(t * 0.9) * 0.45;

  d.pointLight.position.set(lx, ly, lz);
  d.lightHelper.position.set(lx, ly, lz);

  // Rotação sutil da matriz para apreciação de profundidade
  mesh.rotation.y = Math.sin(t * 0.35) * 0.18;

  // Identifica a esfera mais próxima da luz para telemetria em tempo real
  let closest = d.spheres[0];
  let minDist = Infinity;
  const lightPos = d.pointLight.position;

  d.spheres.forEach((s) => {
    const dist = s.mesh.position.distanceTo(lightPos);
    if (dist < minDist) {
      minDist = dist;
      closest = s;
    }
  });

  const typeStr = closest.metalness > 0.5 ? "Condutor (Metálico)" : "Dielétrico (Isolante)";
  const roughStr = closest.roughness < 0.3 ? "Especular Nítido" : "Difuso Suave";
  updateBadgeText(
    d.statusBadge,
    `Foco: M=${closest.metalness.toFixed(1)}, R=${closest.roughness.toFixed(1)} | ${typeStr} • ${roughStr}`,
    closest.metalness > 0.5 ? "#f472b6" : "#38bdf8"
  );
}
