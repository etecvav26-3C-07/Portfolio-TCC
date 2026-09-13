// canvas_webgpu_pipeline.js - Didactic WebGPU Architecture & API flow
import { COLORS, drawLabel, drawArrow, drawRoundedRect } from './canvas_utils.js';

export default function sketch(ctx, w, h, time, dt) {
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  drawLabel(ctx, 'ARQUITETURA WEBGPU: DO NAVEGADOR À GPU', cx, 24, COLORS.textMuted, 11, 'center', true);
  drawLabel(ctx, 'navigator.gpu → GPUAdapter → GPUDevice → GPUCommandEncoder → GPUQueue', cx, 44, COLORS.cyan, 13, 'center', true);

  const steps = [
    { title: 'navigator.gpu', sub: 'Ponto de Entrada', col: COLORS.gold },
    { title: 'GPUAdapter', sub: 'Identifica Hardware', col: COLORS.cyan },
    { title: 'GPUDevice', sub: 'Conexão Lógica', col: COLORS.blueLight },
    { title: 'CommandEncoder', sub: 'Grava Passes', col: COLORS.green },
    { title: 'GPUQueue', sub: 'Submissão Direta', col: COLORS.red }
  ];

  const count = steps.length;
  const cardW = Math.min(105, (w - 110) / count);
  const cardH = 75;
  const gap = (w - 60 - count * cardW) / (count - 1);
  const startX = 30;
  const centerY = h * 0.58;

  // Flow arrows
  for (let i = 0; i < count - 1; i++) {
    const x1 = startX + i * (cardW + gap) + cardW;
    const x2 = x1 + gap;
    drawArrow(ctx, x1 + 2, centerY, x2 - 2, centerY, 'rgba(255,255,255,0.35)', 6, 2);
  }

  // Draw nodes
  steps.forEach((st, i) => {
    const bx = startX + i * (cardW + gap);
    const by = centerY - cardH * 0.5;

    drawRoundedRect(ctx, bx, by, cardW, cardH, 8, COLORS.cardBg, st.col, 1.5);
    drawLabel(ctx, st.title, bx + cardW * 0.5, by + 24, COLORS.white, 9.5, 'center', true);
    drawLabel(ctx, st.sub, bx + cardW * 0.5, by + 48, COLORS.textMuted, 8.5, 'center');
  });

  // Animated packet token traveling along pipeline
  const period = 4;
  const p = (time % period) / period;
  const totalW = (count - 1) * (cardW + gap) + cardW;
  const tokenX = startX + p * totalW;

  ctx.beginPath();
  ctx.arc(tokenX, centerY, 6, 0, Math.PI * 2);
  ctx.fillStyle = COLORS.gold;
  ctx.shadowColor = COLORS.gold;
  ctx.shadowBlur = 10;
  ctx.fill();
  ctx.shadowBlur = 0;
}
