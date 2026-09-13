// canvas_phaser.js - Didactic Phaser 2D Game Physics (Arcade AABB Collision)
import { COLORS, drawLabel, drawRoundedRect } from './canvas_utils.js';

export default function sketch(ctx, w, h, time, dt) {
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  drawLabel(ctx, 'PHASER: FÍSICA ARCADE E COLISÃO AABB', cx, 24, COLORS.textMuted, 11, 'center', true);
  drawLabel(ctx, 'Cálculo de gravidade, velocidade vetorial e intersecção de caixas delimitadoras', cx, 44, COLORS.cyan, 13, 'center', true);

  // Platform at bottom
  const platW = w * 0.6;
  const platH = 14;
  const platX = cx - platW * 0.5;
  const platY = h * 0.75;

  drawRoundedRect(ctx, platX, platY, platW, platH, 4, COLORS.brown, COLORS.gold, 1.5);
  drawLabel(ctx, 'Plataforma Estática (Immovable Body)', cx, platY + 7, COLORS.gold, 9, 'center', true);

  // Bouncing sprite box
  const boxSize = 28;
  const t = (time * 2.2) % (Math.PI * 2);
  const bounce = Math.abs(Math.sin(t));
  const boxY = platY - boxSize - bounce * 70;
  const boxX = cx + Math.cos(time * 1.2) * 50;

  drawRoundedRect(ctx, boxX - boxSize * 0.5, boxY, boxSize, boxSize, 4, COLORS.cardBg, COLORS.cyan, 2);
  drawLabel(ctx, 'Player', boxX, boxY + boxSize * 0.5, COLORS.cyan, 8.5, 'center', true);

  // AABB bounding outline
  ctx.strokeStyle = bounce < 0.05 ? COLORS.red : COLORS.green;
  ctx.lineWidth = 1;
  ctx.setLineDash([2, 2]);
  ctx.strokeRect(boxX - boxSize * 0.5 - 3, boxY - 3, boxSize + 6, boxSize + 6);
  ctx.setLineDash([]);

  drawLabel(ctx, bounce < 0.05 ? 'STATUS: COLISÃO DETECTADA (arcade.collide)' : 'STATUS: GRAVIDADE ATIVA (velocity.y += gravity)', cx, h - 22, bounce < 0.05 ? COLORS.red : COLORS.green, 10, 'center', true);
}
