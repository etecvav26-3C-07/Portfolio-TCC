// canvas_transformacoes.js - Didactic transformations: Translation, Rotation, Scale
import { COLORS, drawLabel, drawArrow, easeInOut } from './canvas_utils.js';

export default function sketch(ctx, w, h, time, dt) {
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.55;

  // 12s cycle: 0-3s Translation, 3-6s Rotation, 6-9s Scale, 9-12s Matrix T * R * S
  const cycle = 12;
  const t = time % cycle;
  const stage = Math.floor(t / 3);
  const prog = easeInOut((t % 3) / 3);

  drawLabel(ctx, 'TRANSFORMAÇÕES AFINS (MATRIZES 3D)', cx, 24, COLORS.textMuted, 11, 'center', true);

  let title = '';
  let formula = '';
  let tx = 0, ty = 0, rot = 0, scale = 1;

  if (stage === 0) {
    title = '1. TRANSLAÇÃO [ T(dx, dy) ]';
    formula = 'Move a geometria no espaço cartesiano mantendo orientação e forma.';
    const wave = Math.sin(prog * Math.PI * 2);
    tx = wave * 70;
    ty = Math.cos(prog * Math.PI * 2) * 25;
  } else if (stage === 1) {
    title = '2. ROTAÇÃO [ R(θ) ]';
    formula = 'Gira os vértices em torno do eixo focal por um ângulo radiano θ.';
    rot = prog * Math.PI * 2;
  } else if (stage === 2) {
    title = '3. ESCALA [ S(sx, sy) ]';
    formula = 'Multiplica as coordenadas locais por fatores de ampliação ou redução.';
    scale = 0.6 + 0.8 * Math.sin(prog * Math.PI);
  } else {
    title = '4. COMBINAÇÃO (Model Matrix = T × R × S)';
    formula = 'As operações são combinadas em uma única multiplicação matricial 4×4.';
    tx = Math.sin(time * 2) * 50;
    rot = time * 1.5;
    scale = 0.8 + 0.3 * Math.sin(time * 3);
  }

  drawLabel(ctx, title, cx, 48, COLORS.cyan, 14, 'center', true);
  drawLabel(ctx, formula, cx, 68, COLORS.textMuted, 12, 'center');

  // Background coordinate grid
  ctx.strokeStyle = COLORS.grid;
  ctx.lineWidth = 1;
  const gridSize = 30;
  for (let x = cx % gridSize; x < w; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 90);
    ctx.lineTo(x, h - 20);
    ctx.stroke();
  }
  for (let y = 90; y < h - 20; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(20, y);
    ctx.lineTo(w - 20, y);
    ctx.stroke();
  }

  // Draw Origin Axes
  drawArrow(ctx, cx, cy, cx + 50, cy, 'rgba(229,115,115,0.7)', 6, 1.5);
  drawArrow(ctx, cx, cy, cx, cy - 50, 'rgba(129,199,132,0.7)', 6, 1.5);
  drawLabel(ctx, '+X', cx + 58, cy, 'rgba(229,115,115,0.8)', 10, 'left');
  drawLabel(ctx, '+Y', cx, cy - 58, 'rgba(129,199,132,0.8)', 10, 'center');

  // Draw Transform Vector / Indication
  if (stage === 0) {
    drawArrow(ctx, cx, cy, cx + tx, cy + ty, COLORS.gold, 8, 2);
    drawLabel(ctx, `Δ(${tx.toFixed(0)}, ${(-ty).toFixed(0)})`, cx + tx * 0.5, cy + ty * 0.5 - 14, COLORS.gold, 11, 'center');
  }

  // Transform matrix application
  ctx.save();
  ctx.translate(cx + tx, cy + ty);
  ctx.rotate(rot);
  ctx.scale(scale, scale);

  // Draw Triangle geometry
  const triRadius = 45;
  const p1 = { x: 0, y: -triRadius };
  const p2 = { x: triRadius * 0.866, y: triRadius * 0.5 };
  const p3 = { x: -triRadius * 0.866, y: triRadius * 0.5 };

  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.lineTo(p3.x, p3.y);
  ctx.closePath();

  const triGrad = ctx.createLinearGradient(-30, -30, 30, 30);
  triGrad.addColorStop(0, COLORS.brown);
  triGrad.addColorStop(1, COLORS.blue);
  ctx.fillStyle = triGrad;
  ctx.fill();
  ctx.strokeStyle = COLORS.cyan;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Vertex points
  [p1, p2, p3].forEach((p, idx) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = COLORS.gold;
    ctx.fill();
  });

  ctx.restore();
}
