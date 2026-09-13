// canvas_opengl_normais.js - Didactic Vertex Normals and Light Incidence Angle
import { COLORS, drawLabel, drawArrow } from './canvas_utils.js';

export default function sketch(ctx, w, h, time, dt) {
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  drawLabel(ctx, 'OPENGL: VETORES NORMAIS E SOMBREAMENTO DE PHONG', cx, 24, COLORS.textMuted, 11, 'center', true);
  drawLabel(ctx, 'As normais definem a orientação da superfície para cálculo da luz por vértice ou pixel', cx, 44, COLORS.cyan, 13, 'center', true);

  // Moving light source
  const lx = cx + Math.cos(time * 1.5) * (w * 0.32);
  const ly = h * 0.26 + Math.sin(time * 0.8) * 15;

  ctx.beginPath();
  ctx.arc(lx, ly, 13, 0, Math.PI * 2);
  ctx.fillStyle = COLORS.gold;
  ctx.shadowColor = COLORS.gold;
  ctx.shadowBlur = 18;
  ctx.fill();
  ctx.shadowBlur = 0;
  drawLabel(ctx, 'Fonte de Luz', lx, ly - 20, COLORS.gold, 10, 'center', true);

  // Curved terrain / polygon surface
  const pts = 7;
  const surfW = w * 0.75;
  const startX = cx - surfW * 0.5;
  const baseY = h * 0.72;

  const vertices = [];
  for (let i = 0; i < pts; i++) {
    const x = startX + (i / (pts - 1)) * surfW;
    const y = baseY + Math.sin(i * 1.1 + time * 0.5) * 22;
    vertices.push({ x, y });
  }

  // Draw Surface line
  ctx.beginPath();
  ctx.moveTo(vertices[0].x, vertices[0].y);
  for (let i = 1; i < pts; i++) {
    ctx.lineTo(vertices[i].x, vertices[i].y);
  }
  ctx.strokeStyle = COLORS.blueLight;
  ctx.lineWidth = 3;
  ctx.stroke();

  // Draw Normals and Light vectors at each vertex
  for (let i = 0; i < pts; i++) {
    const v = vertices[i];

    // Compute tangent from neighbors
    const prev = vertices[Math.max(0, i - 1)];
    const next = vertices[Math.min(pts - 1, i + 1)];
    const tx = next.x - prev.x;
    const ty = next.y - prev.y;
    const tlen = Math.hypot(tx, ty);

    // Normal is perpendicular (-ty, tx) pointing upwards
    const nx = -ty / tlen;
    const ny = tx / tlen;

    const normLen = 42;
    const endNx = v.x + nx * normLen;
    const endNy = v.y + ny * normLen;

    // Normal arrow
    drawArrow(ctx, v.x, v.y, endNx, endNy, COLORS.cyan, 6, 2);

    // Vertex dot
    ctx.beginPath();
    ctx.arc(v.x, v.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = COLORS.white;
    ctx.fill();

    // Incident light vector
    const ldx = lx - v.x;
    const ldy = ly - v.y;
    const llen = Math.hypot(ldx, ldy);
    const inLightX = ldx / llen;
    const inLightY = ldy / llen;

    // Dot product (N dot L)
    const dot = Math.max(0, nx * inLightX + ny * inLightY);

    // Draw small angle arc or intensity label
    if (i === Math.floor(pts / 2)) {
      drawLabel(ctx, `N·L = ${(dot * 100).toFixed(0)}%`, v.x, v.y + 20, COLORS.gold, 11, 'center', true);
    }
  }
}
