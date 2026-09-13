// canvas_opengl_pipeline.js - Didactic OpenGL Fixed & Programmable Pipeline
import { COLORS, drawLabel, drawArrow, drawRoundedRect } from './canvas_utils.js';

export default function sketch(ctx, w, h, time, dt) {
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  drawLabel(ctx, 'PIPELINE CLÁSSICO OPENGL (GLSL)', cx, 24, COLORS.textMuted, 11, 'center', true);
  drawLabel(ctx, 'Fluxo de dados: VBO / VAO → Vertex Shader → Rasterizador → Fragment Shader', cx, 44, COLORS.cyan, 13, 'center', true);

  const stages = [
    { title: '1. VBO / VAO', sub: 'Buffer de Vértices', color: COLORS.green },
    { title: '2. Vertex Shader', sub: 'Transformações MVP', color: COLORS.cyan },
    { title: '3. Rasterização', sub: 'Clipping & Triângulos', color: COLORS.gold },
    { title: '4. Fragment Shader', sub: 'Textura & Cores', color: COLORS.red },
    { title: '5. Framebuffer', sub: 'Tela (RGB + Depth)', color: COLORS.blueLight }
  ];

  const count = stages.length;
  const blockW = Math.min(100, (w - 120) / count);
  const blockH = 70;
  const gap = (w - 70 - count * blockW) / (count - 1);
  const startX = 35;
  const centerY = h * 0.58;

  // Connecting flow arrows
  for (let i = 0; i < count - 1; i++) {
    const x1 = startX + i * (blockW + gap) + blockW;
    const x2 = x1 + gap;
    drawArrow(ctx, x1 + 2, centerY, x2 - 2, centerY, 'rgba(255,255,255,0.3)', 6, 2);
  }

  // Draw blocks
  stages.forEach((st, i) => {
    const bx = startX + i * (blockW + gap);
    const by = centerY - blockH * 0.5;

    drawRoundedRect(ctx, bx, by, blockW, blockH, 8, COLORS.cardBg, st.color, 1.5);
    drawLabel(ctx, st.title, bx + blockW * 0.5, by + 22, COLORS.white, 10, 'center', true);
    drawLabel(ctx, st.sub, bx + blockW * 0.5, by + 45, COLORS.textMuted, 8.5, 'center');
  });

  // Animated triangle geometry transitioning through the stages
  const period = 5;
  const prog = (time % period) / period;
  const totalW = (count - 1) * (blockW + gap) + blockW;
  const triX = startX + prog * totalW;
  const triY = centerY;

  ctx.save();
  ctx.translate(triX, triY);
  ctx.rotate(time * 2);
  ctx.beginPath();
  ctx.moveTo(0, -11);
  ctx.lineTo(10, 8);
  ctx.lineTo(-10, 8);
  ctx.closePath();
  ctx.fillStyle = prog < 0.6 ? COLORS.cyan : COLORS.gold;
  ctx.shadowColor = ctx.fillStyle;
  ctx.shadowBlur = 10;
  ctx.fill();
  ctx.restore();
}
