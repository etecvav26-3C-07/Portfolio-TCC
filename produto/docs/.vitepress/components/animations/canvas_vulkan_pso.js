// canvas_vulkan_pso.js - Didactic Pipeline State Object (PSO)
import { COLORS, drawLabel, drawArrow, drawRoundedRect } from './canvas_utils.js';

export default function sketch(ctx, w, h, time, dt) {
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  drawLabel(ctx, 'VULKAN: PIPELINE STATE OBJECT (PSO)', cx, 24, COLORS.textMuted, 11, 'center', true);
  drawLabel(ctx, 'Elimina travamentos (hiccups) compilando todos os estados em um único objeto imutável', cx, 44, COLORS.cyan, 13, 'center', true);

  // Left side: Sub-state components
  const states = [
    { name: 'SPIR-V Vertex Shader', col: COLORS.cyan },
    { name: 'SPIR-V Fragment Shader', col: COLORS.red },
    { name: 'Blend State & Depth Stencil', col: COLORS.gold },
    { name: 'Rasterizer State & Viewport', col: COLORS.green }
  ];

  const leftX = w * 0.12;
  const cardW = 160;
  const cardH = 24;
  const startY = 75;
  const gapY = 32;

  states.forEach((st, idx) => {
    const cy = startY + idx * gapY;
    drawRoundedRect(ctx, leftX, cy, cardW, cardH, 5, COLORS.cardBg, st.col, 1);
    drawLabel(ctx, st.name, leftX + cardW * 0.5, cy + 12, st.col, 10, 'center', true);

    // Converging Arrow to Compiler
    drawArrow(ctx, leftX + cardW + 4, cy + 12, w * 0.5 - 40, h * 0.54, 'rgba(255,255,255,0.3)', 6, 1.5);
  });

  // Central Ahead-Of-Time Compiler block
  const compX = w * 0.5 - 35;
  const compY = h * 0.44;
  const compW = 70;
  const compH = 65;
  drawRoundedRect(ctx, compX, compY, compW, compH, 8, COLORS.cardBg, COLORS.gold, 2);
  drawLabel(ctx, 'Driver', compX + compW * 0.5, compY + 22, COLORS.white, 10, 'center', true);
  drawLabel(ctx, 'Compiler', compX + compW * 0.5, compY + 38, COLORS.gold, 10, 'center', true);

  // Arrow from Compiler to Final PSO
  drawArrow(ctx, compX + compW + 6, compY + compH * 0.5, w * 0.72 - 6, compY + compH * 0.5, COLORS.blueLight, 8, 2);
  drawLabel(ctx, 'Compile Once', compX + compW + 35, compY + compH * 0.5 - 14, COLORS.textMuted, 9, 'center');

  // Final Immutable PSO Monolith
  const psoX = w * 0.72;
  const psoY = 70;
  const psoW = 130;
  const psoH = 130;
  drawRoundedRect(ctx, psoX, psoY, psoW, psoH, 12, 'rgba(58,154,217,0.15)', COLORS.cyan, 2.5);
  drawLabel(ctx, 'VkPipeline', psoX + psoW * 0.5, psoY + 35, COLORS.white, 13, 'center', true);
  drawLabel(ctx, '(Imutável na VRAM)', psoX + psoW * 0.5, psoY + 55, COLORS.cyan, 10, 'center');
  drawLabel(ctx, '✓ Sem recompilação', psoX + psoW * 0.5, psoY + 82, COLORS.green, 10, 'center', true);
  drawLabel(ctx, '✓ Zero Stuttering', psoX + psoW * 0.5, psoY + 100, COLORS.gold, 10, 'center', true);
}
