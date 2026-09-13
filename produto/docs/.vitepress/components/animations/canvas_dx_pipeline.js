// canvas_dx_pipeline.js - Didactic DirectX 12 & Metal Command Submission Architecture
import { COLORS, drawLabel, drawArrow, drawRoundedRect } from './canvas_utils.js';

export default function sketch(ctx, w, h, time, dt) {
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  drawLabel(ctx, 'DIRECTX 12 / METAL: PIPELINE EXPLÍCITO DE COMANDOS', cx, 24, COLORS.textMuted, 11, 'center', true);
  drawLabel(ctx, 'Record (Command List) → Submit (Command Queue) → Execute (GPU Engine)', cx, 44, COLORS.cyan, 13, 'center', true);

  const steps = [
    { title: '1. Gravação', sub: 'ID3D12GraphicsCommandList\nMTLCommandBuffer', col: COLORS.cyan },
    { title: '2. Submissão', sub: 'ID3D12CommandQueue\nMTLCommandQueue', col: COLORS.gold },
    { title: '3. Execução', sub: 'GPU DirectStorage / UMA\nNúcleos de Render', col: COLORS.green }
  ];

  const count = steps.length;
  const cardW = Math.min(170, (w - 120) / count);
  const cardH = 90;
  const gap = (w - 80 - count * cardW) / (count - 1);
  const startX = 40;
  const centerY = h * 0.6;

  // Connecting arrows
  for (let i = 0; i < count - 1; i++) {
    const x1 = startX + i * (cardW + gap) + cardW;
    const x2 = x1 + gap;
    drawArrow(ctx, x1 + 4, centerY, x2 - 4, centerY, 'rgba(255,255,255,0.4)', 7, 2);
  }

  // Draw stage cards
  steps.forEach((st, i) => {
    const bx = startX + i * (cardW + gap);
    const by = centerY - cardH * 0.5;

    drawRoundedRect(ctx, bx, by, cardW, cardH, 8, COLORS.cardBg, st.col, 1.5);
    drawLabel(ctx, st.title, bx + cardW * 0.5, by + 22, COLORS.white, 11, 'center', true);

    const lines = st.sub.split('\n');
    drawLabel(ctx, lines[0], bx + cardW * 0.5, by + 50, st.col, 8.5, 'center');
    drawLabel(ctx, lines[1], bx + cardW * 0.5, by + 68, COLORS.textMuted, 8.5, 'center');
  });

  // Animated packet token
  const period = 3.5;
  const p = (time % period) / period;
  const totalW = (count - 1) * (cardW + gap) + cardW;
  const tokenX = startX + p * totalW;

  ctx.beginPath();
  ctx.arc(tokenX, centerY, 6, 0, Math.PI * 2);
  ctx.fillStyle = COLORS.gold;
  ctx.shadowColor = COLORS.gold;
  ctx.shadowBlur = 12;
  ctx.fill();
  ctx.shadowBlur = 0;
}
