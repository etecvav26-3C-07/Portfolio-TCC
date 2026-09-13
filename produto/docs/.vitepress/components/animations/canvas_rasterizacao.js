// canvas_rasterizacao.js - Didactic rasterization and fragment generation
import { COLORS, drawLabel, drawRoundedRect } from './canvas_utils.js';

export default function sketch(ctx, w, h, time, dt) {
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  drawLabel(ctx, 'RASTERIZAÇÃO E GERAÇÃO DE FRAGMENTOS', cx, 24, COLORS.textMuted, 11, 'center', true);
  drawLabel(ctx, 'A GPU testa quais centros de pixels estão contidos dentro das primitivas vetoriais', cx, 44, COLORS.cyan, 13, 'center', true);

  // Pixel grid configuration
  const cols = 18;
  const rows = 10;
  const cellSize = Math.min((w * 0.75) / cols, (h * 0.58) / rows);
  const gridW = cols * cellSize;
  const gridH = rows * cellSize;
  const startX = cx - gridW * 0.5;
  const startY = h * 0.58 - gridH * 0.5;

  // Triangle vertices in grid coords (slowly floating)
  const t = time * 0.8;
  const v1 = { x: 3 + Math.sin(t) * 1.2, y: 1.5 + Math.cos(t * 1.1) * 0.5 };
  const v2 = { x: 15 + Math.cos(t * 0.9) * 1.5, y: 3.5 + Math.sin(t * 1.3) * 0.8 };
  const v3 = { x: 8 + Math.sin(t * 1.2) * 1.5, y: 8.5 + Math.cos(t * 0.8) * 0.6 };

  // Point in triangle test (barycentric / edge cross product)
  function pointInTriangle(px, py, a, b, c) {
    const area = 0.5 * (-b.y * c.x + a.y * (-b.x + c.x) + a.x * (b.y - c.y) + b.x * c.y);
    const s = 1 / (2 * area) * (a.y * c.x - a.x * c.y + (c.y - a.y) * px + (a.x - c.x) * py);
    const t = 1 / (2 * area) * (a.x * b.y - a.y * b.x + (a.y - b.y) * px + (b.x - a.x) * py);
    return s >= 0 && t >= 0 && (s + t) <= 1;
  }

  let activeFragments = 0;

  // Draw Pixel Grid & Raster test
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const px = startX + c * cellSize;
      const py = startY + r * cellSize;
      const sampleX = c + 0.5;
      const sampleY = r + 0.5;

      const inside = pointInTriangle(sampleX, sampleY, v1, v2, v3);

      if (inside) {
        activeFragments++;
        // Gradient color for rasterized fragments
        const normX = c / cols;
        const normY = r / rows;
        ctx.fillStyle = `rgba(58, 154, 217, ${0.75 + 0.2 * Math.sin(normX * 3 + time * 3)})`;
        ctx.fillRect(px + 1, py + 1, cellSize - 2, cellSize - 2);
      } else {
        ctx.fillStyle = 'rgba(30, 32, 60, 0.4)';
        ctx.fillRect(px + 1, py + 1, cellSize - 2, cellSize - 2);
      }

      // Sample center dot
      ctx.beginPath();
      ctx.arc(px + cellSize * 0.5, py + cellSize * 0.5, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = inside ? COLORS.white : 'rgba(255,255,255,0.15)';
      ctx.fill();

      // Grid line border
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1;
      ctx.strokeRect(px, py, cellSize, cellSize);
    }
  }

  // Draw original continuous vector triangle edges
  ctx.beginPath();
  ctx.moveTo(startX + v1.x * cellSize, startY + v1.y * cellSize);
  ctx.lineTo(startX + v2.x * cellSize, startY + v2.y * cellSize);
  ctx.lineTo(startX + v3.x * cellSize, startY + v3.y * cellSize);
  ctx.closePath();
  ctx.strokeStyle = COLORS.gold;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Highlight triangle vertices
  [v1, v2, v3].forEach((v, i) => {
    const vx = startX + v.x * cellSize;
    const vy = startY + v.y * cellSize;
    ctx.beginPath();
    ctx.arc(vx, vy, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = COLORS.gold;
    ctx.fill();
    drawLabel(ctx, `V${i + 1}`, vx, vy - 12, COLORS.gold, 10, 'center', true);
  });

  // Footer Stats
  drawLabel(ctx, `Fragmentos Rasterizados Ativos: ${activeFragments} pixels`, cx, h - 22, COLORS.cyan, 11, 'center', true);
}
