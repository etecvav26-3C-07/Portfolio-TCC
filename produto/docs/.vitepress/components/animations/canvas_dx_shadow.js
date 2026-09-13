// canvas_dx_shadow.js - Didactic Multi-Pass Shadow Mapping
import { COLORS, drawLabel, drawArrow, drawRoundedRect } from './canvas_utils.js';

export default function sketch(ctx, w, h, time, dt) {
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  drawLabel(ctx, 'RENDER PASSES: MAPEAMENTO DE SOMBRAS EM DUAS ETAPAS', cx, 24, COLORS.textMuted, 11, 'center', true);
  drawLabel(ctx, 'Passo 1 grava o Depth Buffer do ponto de vista da luz; Passo 2 compara profundidades', cx, 44, COLORS.cyan, 13, 'center', true);

  const passW = Math.min(220, w * 0.38);
  const passH = 130;
  const passY = 75;

  // Pass 1: Shadow Map Pass
  const p1X = cx - passW - 30;
  drawRoundedRect(ctx, p1X, passY, passW, passH, 8, COLORS.cardBg, COLORS.gold, 1.5);
  drawLabel(ctx, 'PASS 1: SHADOW MAP PASS', p1X + passW * 0.5, passY + 22, COLORS.gold, 10, 'center', true);
  drawLabel(ctx, 'Câmera virtual posicionada na Luz', p1X + passW * 0.5, passY + 45, COLORS.textMuted, 9, 'center');
  drawLabel(ctx, 'Saída: Depth Texture (Profundidade)', p1X + passW * 0.5, passY + 70, COLORS.white, 9.5, 'center');
  drawLabel(ctx, '• Desliga Fragment Shader de cor', p1X + passW * 0.5, passY + 95, 'rgba(255,255,255,0.5)', 8.5, 'center');

  // Connecting arrow: Shadow Map texture bound as SRV
  drawArrow(ctx, p1X + passW + 4, passY + passH * 0.5, cx + 30 - 4, passY + passH * 0.5, COLORS.cyan, 8, 2);
  drawLabel(ctx, 'Texture SRV', cx, passY + passH * 0.5 - 14, COLORS.cyan, 9, 'center', true);

  // Pass 2: Main Camera Lighting Pass
  const p2X = cx + 30;
  drawRoundedRect(ctx, p2X, passY, passW, passH, 8, COLORS.cardBg, COLORS.blueLight, 1.5);
  drawLabel(ctx, 'PASS 2: COLOR / LIGHTING PASS', p2X + passW * 0.5, passY + 22, COLORS.blueLight, 10, 'center', true);
  drawLabel(ctx, 'Câmera principal do jogador', p2X + passW * 0.5, passY + 45, COLORS.textMuted, 9, 'center');
  drawLabel(ctx, 'Compara zAtual > zSombra', p2X + passW * 0.5, passY + 70, COLORS.white, 9.5, 'center');
  drawLabel(ctx, 'Saída: Framebuffer RGB final', p2X + passW * 0.5, passY + 95, COLORS.green, 9, 'center', true);
}
