// canvas_modelagem.js - Didactic 3Blue1Brown-style modeling concept
import { COLORS, drawLabel, drawRoundedRect } from './canvas_utils.js';

export default function sketch(ctx, w, h, time, dt) {
  // Clear background
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.52;
  const size = Math.min(w, h) * 0.35;

  // Cycle through 3 phases: 0=Vertices (0-3s), 1=Edges (3-6s), 2=Faces (6-9s)
  const cycle = 9;
  const t = time % cycle;
  const phase = t < 3 ? 0 : t < 6 ? 1 : 2;
  const phaseT = (t % 3) / 3;

  // Title banner
  drawLabel(ctx, 'PIPELINE DE MODELAGEM 3D', cx, 24, COLORS.textMuted, 11, 'center', true);

  let phaseName = 'ETAPA 1: VÉRTICES (Coordenadas X, Y, Z)';
  let phaseDesc = 'Pontos discretos definidos no espaço tridimensional.';
  let phaseColor = COLORS.cyan;

  if (phase === 1) {
    phaseName = 'ETAPA 2: ARESTAS (Topologia e Conexões)';
    phaseDesc = 'Segmentos de reta ligam pares de vértices formando a malha.';
    phaseColor = COLORS.gold;
  } else if (phase === 2) {
    phaseName = 'ETAPA 3: FACES (Superfície Poligonal)';
    phaseDesc = 'Polígonos (triângulos ou quads) fecham a geometria visível.';
    phaseColor = COLORS.blueLight;
  }

  drawLabel(ctx, phaseName, cx, 46, phaseColor, 14, 'center', true);
  drawLabel(ctx, phaseDesc, cx, 66, COLORS.textMuted, 12, 'center');

  // Slow 3D isometric rotation
  const angle = time * 0.5;
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);
  const tilt = 0.5;

  // 8 vertices of a cube
  const rawVerts = [
    [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
    [-1, -1,  1], [1, -1,  1], [1, 1,  1], [-1, 1,  1],
  ];

  // Project vertices
  const proj = rawVerts.map(([vx, vy, vz]) => {
    // rotate Y
    const rx = vx * cosA - vz * sinA;
    const rz = vx * sinA + vz * cosA;
    const ry = vy;
    // isometric projection
    const px = cx + (rx - rz) * size * 0.7;
    const py = cy + (ry * 0.8 + (rx + rz) * tilt * 0.5) * size * 0.7;
    return { x: px, y: py, z: rz };
  });

  // Cube faces (indices into verts)
  const faces = [
    [0, 1, 2, 3], // back
    [4, 5, 6, 7], // front
    [0, 1, 5, 4], // bottom
    [2, 3, 7, 6], // top
    [0, 3, 7, 4], // left
    [1, 2, 6, 5], // right
  ];

  // Edges
  const edges = [
    [0,1],[1,2],[2,3],[3,0],
    [4,5],[5,6],[6,7],[7,4],
    [0,4],[1,5],[2,6],[3,7]
  ];

  // Draw Faces if phase 2
  if (phase === 2) {
    const alpha = Math.min(1, phaseT * 2);
    faces.forEach((f, idx) => {
      ctx.beginPath();
      ctx.moveTo(proj[f[0]].x, proj[f[0]].y);
      for (let i = 1; i < f.length; i++) {
        ctx.lineTo(proj[f[i]].x, proj[f[i]].y);
      }
      ctx.closePath();
      const grad = ctx.createLinearGradient(proj[f[0]].x, proj[f[0]].y, proj[f[2]].x, proj[f[2]].y);
      grad.addColorStop(0, `rgba(90, 62, 43, ${0.4 * alpha})`);
      grad.addColorStop(1, `rgba(58, 154, 217, ${0.5 * alpha})`);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = `rgba(104, 187, 227, ${0.8 * alpha})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });
  }

  // Draw Edges if phase 1 or 2
  if (phase >= 1) {
    const edgeAlpha = phase === 1 ? Math.min(1, phaseT * 1.5) : 1;
    ctx.strokeStyle = `rgba(240, 194, 127, ${edgeAlpha * 0.9})`;
    ctx.lineWidth = 2;
    edges.forEach(([i, j]) => {
      ctx.beginPath();
      ctx.moveTo(proj[i].x, proj[i].y);
      ctx.lineTo(proj[j].x, proj[j].y);
      ctx.stroke();
    });
  }

  // Draw Vertices
  proj.forEach((pt, i) => {
    const pulse = phase === 0 ? 1 + 0.25 * Math.sin(time * 6 + i) : 1;
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 5 * pulse, 0, Math.PI * 2);
    ctx.fillStyle = phase === 0 ? COLORS.cyan : COLORS.white;
    ctx.fill();
    ctx.strokeStyle = COLORS.bg;
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  // Callout tags
  if (phase === 0) {
    const p0 = proj[0];
    drawLabel(ctx, 'Vértice (x, y, z)', p0.x - 14, p0.y - 14, COLORS.cyan, 11, 'right', true);
  } else if (phase === 1) {
    const midX = (proj[0].x + proj[1].x) * 0.5;
    const midY = (proj[0].y + proj[1].y) * 0.5;
    drawLabel(ctx, 'Aresta', midX, midY - 14, COLORS.gold, 11, 'center', true);
  } else if (phase === 2) {
    drawLabel(ctx, 'Face Poligonal', cx, cy, COLORS.white, 12, 'center', true);
  }
}
