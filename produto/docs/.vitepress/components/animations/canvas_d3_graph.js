// canvas_d3_graph.js - Didactic D3.js Force Simulation & Data Binding
import { COLORS, drawLabel } from './canvas_utils.js';

export default function sketch(ctx, w, h, time, dt) {
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  drawLabel(ctx, 'D3.JS: SIMULAÇÃO DE FORÇAS E DATA-DRIVEN GRAPHS', cx, 24, COLORS.textMuted, 11, 'center', true);
  drawLabel(ctx, 'Equilíbrio físico entre atração de elos (Links) e repulsão eletrostática de nós (Many-Body)', cx, 44, COLORS.cyan, 13, 'center', true);

  const cy = h * 0.58;

  // 6 nodes oscillating in orbital force equilibrium
  const numNodes = 6;
  const nodes = [];
  const baseR = 55;

  for (let i = 0; i < numNodes; i++) {
    const angle = time * 0.8 + i * (Math.PI * 2 / numNodes);
    const wobble = Math.sin(time * 2 + i * 2) * 15;
    const nx = cx + Math.cos(angle) * (baseR + wobble);
    const ny = cy + Math.sin(angle) * (baseR + wobble);
    nodes.push({ x: nx, y: ny, id: i });
  }

  // Central Hub Node
  const hub = { x: cx, y: cy };

  // Draw links
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.lineWidth = 1.5;
  nodes.forEach((n, i) => {
    ctx.beginPath();
    ctx.moveTo(hub.x, hub.y);
    ctx.lineTo(n.x, n.y);
    ctx.stroke();

    // Connect to next neighbor
    const next = nodes[(i + 1) % numNodes];
    ctx.beginPath();
    ctx.moveTo(n.x, n.y);
    ctx.lineTo(next.x, next.y);
    ctx.stroke();
  });

  // Draw Hub
  ctx.beginPath();
  ctx.arc(hub.x, hub.y, 14, 0, Math.PI * 2);
  ctx.fillStyle = COLORS.gold;
  ctx.fill();
  drawLabel(ctx, 'Root', hub.x, hub.y, COLORS.bg, 9, 'center', true);

  // Draw satellite nodes
  nodes.forEach((n, i) => {
    ctx.beginPath();
    ctx.arc(n.x, n.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = COLORS.cyan;
    ctx.fill();
    drawLabel(ctx, `N${i + 1}`, n.x, n.y, COLORS.bg, 8.5, 'center', true);
  });

  drawLabel(ctx, 'Força de Atração (Links)', cx - 140, h - 22, COLORS.textMuted, 10, 'center');
  drawLabel(ctx, 'Repulsão de Cargas (Nodes)', cx + 140, h - 22, COLORS.gold, 10, 'center');
}
