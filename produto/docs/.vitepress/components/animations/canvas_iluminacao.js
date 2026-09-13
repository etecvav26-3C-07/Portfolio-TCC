// canvas_iluminacao.js - Didactic illumination model (Phong / Lambert / Blinn)
import { COLORS, drawLabel, drawArrow, drawRoundedRect } from './canvas_utils.js';

export default function sketch(ctx, w, h, time, dt) {
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  drawLabel(ctx, 'MODELO DE ILUMINAÇÃO (PHONG / LAMBERT)', cx, 24, COLORS.textMuted, 11, 'center', true);
  drawLabel(ctx, 'Equação: I = Ambiente + Difusa (N·L) + Especular (R·V)^n', cx, 44, COLORS.gold, 13, 'center', true);

  // Surface point
  const surfX = cx;
  const surfY = h * 0.72;

  // Surface line
  ctx.strokeStyle = COLORS.blueLight;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(w * 0.15, surfY);
  ctx.lineTo(w * 0.85, surfY);
  ctx.stroke();

  // Surface label
  drawLabel(ctx, 'Superfície do Material', w * 0.22, surfY + 18, COLORS.textMuted, 11);

  // Moving light source
  const lightOrbit = time * 1.2;
  const lightX = cx + Math.cos(lightOrbit) * (w * 0.3);
  const lightY = h * 0.28 + Math.sin(lightOrbit * 0.5) * 20;

  // Draw Light Bulb
  ctx.beginPath();
  ctx.arc(lightX, lightY, 14, 0, Math.PI * 2);
  ctx.fillStyle = COLORS.gold;
  ctx.shadowColor = COLORS.gold;
  ctx.shadowBlur = 20;
  ctx.fill();
  ctx.shadowBlur = 0; // reset
  drawLabel(ctx, 'Luz (Fonte)', lightX, lightY - 24, COLORS.gold, 11, 'center', true);

  // Normal vector N (pointing straight up)
  const normLen = 70;
  const normX = surfX;
  const normY = surfY - normLen;
  drawArrow(ctx, surfX, surfY, normX, normY, COLORS.cyan, 8, 2.5);
  drawLabel(ctx, 'Normal (N)', normX, normY - 14, COLORS.cyan, 12, 'center', true);

  // Incident Light Vector L (from surf to light)
  drawArrow(ctx, surfX, surfY, lightX, lightY, COLORS.gold, 8, 2);
  drawLabel(ctx, 'Vetor Luz (L)', (surfX + lightX) * 0.5 - 20, (surfY + lightY) * 0.5, COLORS.gold, 11, 'right');

  // Math: Cosine theta (N dot L)
  const dx = lightX - surfX;
  const dy = lightY - surfY;
  const len = Math.hypot(dx, dy);
  const lx = dx / len;
  const ly = dy / len;
  // dot with normal (0, -1)
  const nDotL = Math.max(0, -ly);

  // Reflected Vector R
  // R = 2 * (N . L) * N - L
  const rx = -lx;
  const ry = ly; // reflection over Y
  const refLen = 65;
  const refX = surfX + rx * refLen;
  const refY = surfY + ry * refLen;
  drawArrow(ctx, surfX, surfY, refX, refY, COLORS.red, 8, 2);
  drawLabel(ctx, 'Reflexão (R)', refX + (rx > 0 ? 15 : -15), refY - 10, COLORS.red, 11, 'center');

  // Eye / Viewer position (fixed on right)
  const eyeX = w * 0.82;
  const eyeY = h * 0.35;
  ctx.beginPath();
  ctx.arc(eyeX, eyeY, 10, 0, Math.PI * 2);
  ctx.fillStyle = COLORS.blue;
  ctx.fill();
  drawArrow(ctx, surfX, surfY, eyeX, eyeY, COLORS.blueLight, 8, 2);
  drawLabel(ctx, 'Visão (V)', (surfX + eyeX) * 0.5 + 20, (surfY + eyeY) * 0.5, COLORS.blueLight, 11, 'left');

  // Specular intensity calculation
  const edx = eyeX - surfX;
  const edy = eyeY - surfY;
  const elen = Math.hypot(edx, edy);
  const rDotV = Math.max(0, (rx * (edx / elen) + ry * (edy / elen)));
  const spec = Math.pow(rDotV, 16);

  // Real-time Intensity Monitor Card
  drawRoundedRect(ctx, w * 0.65, h - 55, w * 0.32, 42, 6, COLORS.cardBg, COLORS.cardBorder, 1);
  drawLabel(ctx, `Difusa (N·L): ${(nDotL * 100).toFixed(0)}%`, w * 0.81, h - 42, COLORS.gold, 11, 'center', true);
  drawLabel(ctx, `Especular (R·V)ⁿ: ${(spec * 100).toFixed(0)}%`, w * 0.81, h - 24, COLORS.cyan, 11, 'center', true);
}
