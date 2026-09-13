// canvas_render.js - Didactic complete render composition
import { COLORS, drawLabel, drawArrow, drawRoundedRect } from './canvas_utils.js';

export default function sketch(ctx, w, h, time, dt) {
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  drawLabel(ctx, 'RENDERIZAÇÃO: SÍNTESE FINAL DA IMAGEM', cx, 24, COLORS.textMuted, 11, 'center', true);
  drawLabel(ctx, 'Combinação sinérgica de Geometria, Câmera, Iluminação e Shaders no Framebuffer', cx, 44, COLORS.cyan, 13, 'center', true);

  // 4 Input Streams on Left
  const inputs = [
    { label: 'Geometria (Malha)', color: COLORS.cyan },
    { label: 'Câmera (Matriz VP)', color: COLORS.gold },
    { label: 'Luzes & Sombras', color: COLORS.red },
    { label: 'Materiais & Texturas', color: COLORS.green }
  ];

  const leftX = w * 0.16;
  const startY = h * 0.35;
  const gapY = 32;

  inputs.forEach((inp, idx) => {
    const iy = startY + idx * gapY;
    drawRoundedRect(ctx, leftX - 60, iy - 11, 120, 22, 4, COLORS.cardBg, inp.color, 1);
    drawLabel(ctx, inp.label, leftX, iy, inp.color, 10, 'center', true);

    // Flow line to central render core
    const flowT = (time * 1.5 + idx * 0.25) % 1;
    drawArrow(ctx, leftX + 62, iy, w * 0.48, h * 0.56, 'rgba(255,255,255,0.25)', 5, 1.5);
  });

  // Central Render Engine Core
  const coreX = w * 0.52;
  const coreY = h * 0.56;
  const coreW = 100;
  const coreH = 100;
  drawRoundedRect(ctx, coreX - coreW * 0.5, coreY - coreH * 0.5, coreW, coreH, 12, COLORS.cardBg, COLORS.blueLight, 2);
  drawLabel(ctx, 'MOTOR DE', coreX, coreY - 14, COLORS.white, 11, 'center', true);
  drawLabel(ctx, 'RENDER', coreX, coreY + 2, COLORS.cyan, 13, 'center', true);
  drawLabel(ctx, '(GPU Pipeline)', coreX, coreY + 18, COLORS.textMuted, 9, 'center');

  // Output Arrow to Final Monitor
  drawArrow(ctx, coreX + coreW * 0.5 + 4, coreY, w * 0.74, coreY, COLORS.gold, 8, 2.5);

  // Final Output Display (Screen)
  const screenX = w * 0.76;
  const screenY = coreY - 45;
  const screenW = w * 0.18;
  const screenH = 90;
  drawRoundedRect(ctx, screenX, screenY, screenW, screenH, 6, '#0b0c16', COLORS.gold, 2);

  // Animated rendered image preview inside display
  const p = Math.sin(time * 2);
  const cubeCx = screenX + screenW * 0.5;
  const cubeCy = screenY + screenH * 0.5;
  ctx.save();
  ctx.translate(cubeCx, cubeCy);
  ctx.rotate(time);
  ctx.fillStyle = COLORS.blue;
  ctx.fillRect(-14, -14, 28, 28);
  ctx.strokeStyle = COLORS.cyan;
  ctx.strokeRect(-14, -14, 28, 28);
  ctx.restore();

  drawLabel(ctx, 'Quadro Final (60 FPS)', screenX + screenW * 0.5, screenY + screenH + 14, COLORS.gold, 10, 'center', true);
}
