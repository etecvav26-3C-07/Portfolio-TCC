// canvas_shaders.js - Didactic programmable graphics pipeline (Shaders)
import { COLORS, drawLabel, drawArrow, drawRoundedRect } from './canvas_utils.js';

export default function sketch(ctx, w, h, time, dt) {
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  drawLabel(ctx, 'PIPELINE GRÁFICO PROGRAMÁVEL (SHADERS)', cx, 24, COLORS.textMuted, 11, 'center', true);
  drawLabel(ctx, 'Vértices e Fragmentos são processados em paralelo massivo na GPU', cx, 44, COLORS.cyan, 13, 'center', true);

  const stages = [
    { name: 'Vertex Shader', sub: 'Transforma (MVP)', color: COLORS.cyan },
    { name: 'Rasterizador', sub: 'Interpola Pixels', color: COLORS.gold },
    { name: 'Fragment Shader', sub: 'Calcula Cores (PBR)', color: COLORS.red },
    { name: 'Framebuffer', sub: 'Buffer de Saída', color: COLORS.blueLight }
  ];

  const count = stages.length;
  const blockW = Math.min(110, (w - 120) / count);
  const blockH = 75;
  const gap = (w - 80 - count * blockW) / (count - 1);
  const startX = 40;
  const centerY = h * 0.58;

  // Draw Pipeline connection arrows
  for (let i = 0; i < count - 1; i++) {
    const x1 = startX + i * (blockW + gap) + blockW;
    const x2 = x1 + gap;
    drawArrow(ctx, x1 + 4, centerY, x2 - 4, centerY, 'rgba(255,255,255,0.4)', 6, 2);
  }

  // Draw Stages
  stages.forEach((st, i) => {
    const bx = startX + i * (blockW + gap);
    const by = centerY - blockH * 0.5;

    // Background card
    drawRoundedRect(ctx, bx, by, blockW, blockH, 8, COLORS.cardBg, st.color, 1.5);

    // Label
    drawLabel(ctx, st.name, bx + blockW * 0.5, by + 24, COLORS.white, 11, 'center', true);
    drawLabel(ctx, st.sub, bx + blockW * 0.5, by + 48, COLORS.textMuted, 10, 'center');
  });

  // Animated data packet flowing through pipeline
  const cycleTime = 4; // 4 seconds full loop
  const p = (time % cycleTime) / cycleTime;
  const totalW = (count - 1) * (blockW + gap) + blockW;
  const packetX = startX + p * totalW;
  const packetY = centerY;

  // Determine current packet stage
  let packetColor = COLORS.white;
  let packetShape = 'dot';
  if (p < 0.28) {
    packetColor = COLORS.cyan;
    packetShape = 'vertex';
  } else if (p < 0.55) {
    packetColor = COLORS.gold;
    packetShape = 'triangle';
  } else if (p < 0.82) {
    packetColor = COLORS.red;
    packetShape = 'pixel';
  } else {
    packetColor = COLORS.blueLight;
    packetShape = 'frame';
  }

  // Draw packet
  ctx.save();
  ctx.translate(packetX, packetY);
  ctx.fillStyle = packetColor;
  ctx.shadowColor = packetColor;
  ctx.shadowBlur = 12;

  if (packetShape === 'vertex') {
    ctx.beginPath();
    ctx.arc(0, 0, 7, 0, Math.PI * 2);
    ctx.fill();
    drawLabel(ctx, 'Vértice (x,y,z)', 0, -20, packetColor, 10, 'center', true);
  } else if (packetShape === 'triangle') {
    ctx.beginPath();
    ctx.moveTo(0, -9);
    ctx.lineTo(8, 7);
    ctx.lineTo(-8, 7);
    ctx.closePath();
    ctx.fill();
    drawLabel(ctx, 'Primitiva', 0, -20, packetColor, 10, 'center', true);
  } else {
    ctx.fillRect(-7, -7, 14, 14);
    drawLabel(ctx, 'RGBA Pixel', 0, -20, packetColor, 10, 'center', true);
  }
  ctx.restore();
}
