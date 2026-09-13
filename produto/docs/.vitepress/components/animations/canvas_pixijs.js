// canvas_pixijs.js - Didactic PixiJS 2D WebGL Sprite Batching
import { COLORS, drawLabel, drawArrow, drawRoundedRect } from './canvas_utils.js';

export default function sketch(ctx, w, h, time, dt) {
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  drawLabel(ctx, 'PIXIJS: SPRITE BATCHING E PERFORMANCE 2D', cx, 24, COLORS.textMuted, 11, 'center', true);
  drawLabel(ctx, 'Múltiplos sprites da mesma textura são agrupados e desenhados em uma única Draw Call', cx, 44, COLORS.cyan, 13, 'center', true);

  // Left side: Spritesheet Texture Atlas
  const atlasX = w * 0.12;
  const atlasY = 75;
  const atlasSize = 120;

  drawRoundedRect(ctx, atlasX, atlasY, atlasSize, atlasSize, 6, COLORS.cardBg, COLORS.gold, 1.5);
  drawLabel(ctx, 'Texture Atlas (Spritesheet)', atlasX + atlasSize * 0.5, atlasY - 12, COLORS.gold, 10, 'center', true);

  // 4 cells inside atlas
  const half = atlasSize * 0.5;
  const colors = [COLORS.cyan, COLORS.red, COLORS.green, COLORS.gold];
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 2; c++) {
      ctx.fillStyle = colors[r * 2 + c];
      ctx.globalAlpha = 0.6;
      ctx.fillRect(atlasX + c * half + 4, atlasY + r * half + 4, half - 8, half - 8);
    }
  }
  ctx.globalAlpha = 1.0;

  // Arrow connecting Atlas to Batcher
  drawArrow(ctx, atlasX + atlasSize + 10, atlasY + half, w * 0.5 - 20, atlasY + half, 'rgba(255,255,255,0.4)', 6, 2);

  // Right side: Active Scene with batched moving sprites
  const sceneX = w * 0.52;
  const sceneY = 75;
  const sceneW = w * 0.38;
  const sceneH = 120;

  drawRoundedRect(ctx, sceneX, sceneY, sceneW, sceneH, 8, '#0d0f1a', COLORS.blueLight, 1.5);
  drawLabel(ctx, 'Cena 2D (60 FPS)', sceneX + sceneW * 0.5, sceneY - 12, COLORS.blueLight, 10, 'center', true);

  // 12 moving sprites in scene
  const numSprites = 12;
  for (let i = 0; i < numSprites; i++) {
    const angle = time * 2 + i * (Math.PI * 2 / numSprites);
    const rad = 32 + Math.sin(time * 3 + i) * 12;
    const sx = sceneX + sceneW * 0.5 + Math.cos(angle) * rad;
    const sy = sceneY + sceneH * 0.5 + Math.sin(angle) * rad;

    ctx.fillStyle = colors[i % 4];
    ctx.fillRect(sx - 5, sy - 5, 10, 10);
  }

  // Footer status badge
  drawRoundedRect(ctx, cx - 120, h - 35, 240, 24, 6, COLORS.cardBg, COLORS.green, 1.5);
  drawLabel(ctx, '✓ Total Draw Calls: 1 (GPU Batched)', cx, h - 23, COLORS.green, 11, 'center', true);
}
