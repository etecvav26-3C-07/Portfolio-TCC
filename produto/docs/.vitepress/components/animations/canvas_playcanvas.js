// canvas_playcanvas.js - Didactic Web Game Engine Architecture (PlayCanvas)
import { COLORS, drawLabel, drawArrow, drawRoundedRect } from './canvas_utils.js';

export default function sketch(ctx, w, h, time, dt) {
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  drawLabel(ctx, 'PLAYCANVAS: ARQUITETURA DE GAME ENGINE WEB', cx, 24, COLORS.textMuted, 11, 'center', true);
  drawLabel(ctx, 'Loop de Jogo desacoplado: Input → Simulação Física (Wasm/Ammo) → Renderizador WebGL/WebGPU', cx, 44, COLORS.cyan, 13, 'center', true);

  const loopStages = [
    { name: '1. Entrada (Input)', sub: 'Teclado / Touch / Gamepad', col: COLORS.gold },
    { name: '2. Física (Ammo.js)', sub: 'Colisões Rígidas (Wasm)', col: COLORS.cyan },
    { name: '3. Renderizador', sub: 'Forward+ / Clustered', col: COLORS.green }
  ];

  const count = loopStages.length;
  const boxW = Math.min(160, (w - 100) / count);
  const boxH = 80;
  const gap = (w - 80 - count * boxW) / (count - 1);
  const startX = 40;
  const centerY = h * 0.6;

  for (let i = 0; i < count - 1; i++) {
    const x1 = startX + i * (boxW + gap) + boxW;
    const x2 = x1 + gap;
    drawArrow(ctx, x1 + 4, centerY, x2 - 4, centerY, 'rgba(255,255,255,0.4)', 6, 2);
  }

  loopStages.forEach((st, i) => {
    const bx = startX + i * (boxW + gap);
    const by = centerY - boxH * 0.5;
    drawRoundedRect(ctx, bx, by, boxW, boxH, 8, COLORS.cardBg, st.col, 1.5);
    drawLabel(ctx, st.name, bx + boxW * 0.5, by + 24, COLORS.white, 11, 'center', true);
    drawLabel(ctx, st.sub, bx + boxW * 0.5, by + 50, st.col, 9, 'center');
  });

  // Flow return arrow
  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(startX + (count - 1) * (boxW + gap) + boxW * 0.5, centerY + boxH * 0.5 + 4);
  ctx.lineTo(startX + (count - 1) * (boxW + gap) + boxW * 0.5, centerY + boxH * 0.5 + 24);
  ctx.lineTo(startX + boxW * 0.5, centerY + boxH * 0.5 + 24);
  ctx.lineTo(startX + boxW * 0.5, centerY + boxH * 0.5 + 4);
  ctx.stroke();
  ctx.setLineDash([]);
  drawLabel(ctx, 'Próximo Frame (requestAnimationFrame)', cx, centerY + boxH * 0.5 + 22, COLORS.textMuted, 9, 'center');
}
