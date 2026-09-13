// canvas_texturas.js - Didactic UV texture mapping
import { COLORS, drawLabel, drawArrow, drawRoundedRect } from './canvas_utils.js';

export default function sketch(ctx, w, h, time, dt) {
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  drawLabel(ctx, 'MAPEAMENTO DE TEXTURAS E COORDENADAS UV', cx, 24, COLORS.textMuted, 11, 'center', true);
  drawLabel(ctx, 'Associa cada vértice 3D a coordenadas normalizadas [0, 1] no mapa 2D', cx, 44, COLORS.cyan, 13, 'center', true);

  // Left side: 2D Texture Space (UV)
  const uvBoxX = w * 0.12;
  const uvBoxY = h * 0.35;
  const boxSize = Math.min(w * 0.3, h * 0.5);

  drawRoundedRect(ctx, uvBoxX, uvBoxY, boxSize, boxSize, 6, 'rgba(30, 32, 60, 0.6)', COLORS.cyan, 1.5);
  drawLabel(ctx, 'Espaço de Textura 2D (U, V)', uvBoxX + boxSize * 0.5, uvBoxY - 14, COLORS.cyan, 11, 'center', true);

  // Checkerboard pattern inside UV Box
  const cells = 4;
  const cellS = boxSize / cells;
  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      if ((r + c) % 2 === 0) {
        ctx.fillStyle = 'rgba(58, 154, 217, 0.25)';
      } else {
        ctx.fillStyle = 'rgba(90, 62, 43, 0.35)';
      }
      ctx.fillRect(uvBoxX + c * cellS, uvBoxY + r * cellS, cellS, cellS);
    }
  }

  // UV Axis indicators
  drawArrow(ctx, uvBoxX, uvBoxY + boxSize, uvBoxX + boxSize + 15, uvBoxY + boxSize, COLORS.gold, 6, 2);
  drawArrow(ctx, uvBoxX, uvBoxY + boxSize, uvBoxX, uvBoxY - 15, COLORS.green, 6, 2);
  drawLabel(ctx, 'U [0, 1]', uvBoxX + boxSize + 28, uvBoxY + boxSize, COLORS.gold, 10, 'left', true);
  drawLabel(ctx, 'V [0, 1]', uvBoxX - 10, uvBoxY - 18, COLORS.green, 10, 'center', true);

  // Animated UV sampling point
  const sampleU = 0.3 + 0.4 * (0.5 + 0.5 * Math.sin(time * 2));
  const sampleV = 0.3 + 0.4 * (0.5 + 0.5 * Math.cos(time * 1.7));
  const uvPtX = uvBoxX + sampleU * boxSize;
  const uvPtY = uvBoxY + (1 - sampleV) * boxSize;

  ctx.beginPath();
  ctx.arc(uvPtX, uvPtY, 5, 0, Math.PI * 2);
  ctx.fillStyle = COLORS.gold;
  ctx.fill();
  drawLabel(ctx, `(${sampleU.toFixed(2)}, ${sampleV.toFixed(2)})`, uvPtX, uvPtY - 12, COLORS.gold, 10, 'center');

  // Right side: 3D Surface polygon receiving the texture
  const meshCx = w * 0.72;
  const meshCy = h * 0.6;
  const meshSize = boxSize * 0.9;

  drawLabel(ctx, 'Superfície 3D (Malha Renderizada)', meshCx, uvBoxY - 14, COLORS.blueLight, 11, 'center', true);

  // Skewed quad in 3D perspective
  const q1 = { x: meshCx - meshSize * 0.4, y: meshCy - meshSize * 0.45 };
  const q2 = { x: meshCx + meshSize * 0.45, y: meshCy - meshSize * 0.35 };
  const q3 = { x: meshCx + meshSize * 0.35, y: meshCy + meshSize * 0.45 };
  const q4 = { x: meshCx - meshSize * 0.45, y: meshCy + meshSize * 0.35 };

  ctx.beginPath();
  ctx.moveTo(q1.x, q1.y);
  ctx.lineTo(q2.x, q2.y);
  ctx.lineTo(q3.x, q3.y);
  ctx.lineTo(q4.x, q4.y);
  ctx.closePath();
  const meshGrad = ctx.createLinearGradient(q1.x, q1.y, q3.x, q3.y);
  meshGrad.addColorStop(0, COLORS.brown);
  meshGrad.addColorStop(1, COLORS.blue);
  ctx.fillStyle = meshGrad;
  ctx.fill();
  ctx.strokeStyle = COLORS.blueLight;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Corresponding sampled point on 3D quad (bilinear interpolation)
  const u = sampleU;
  const v = sampleV;
  const topX = q1.x + (q2.x - q1.x) * u;
  const topY = q1.y + (q2.y - q1.y) * u;
  const botX = q4.x + (q3.x - q4.x) * u;
  const botY = q4.y + (q3.y - q4.y) * u;
  const meshPtX = topX + (botX - topX) * (1 - v);
  const meshPtY = topY + (botY - topY) * (1 - v);

  ctx.beginPath();
  ctx.arc(meshPtX, meshPtY, 5, 0, Math.PI * 2);
  ctx.fillStyle = COLORS.gold;
  ctx.fill();

  // Mapping Arrow from UV Space to 3D Mesh
  drawArrow(ctx, uvPtX + 8, uvPtY, meshPtX - 8, meshPtY, 'rgba(240, 194, 127, 0.7)', 8, 2);
  drawLabel(ctx, 'Amostragem (Sampler)', cx, h * 0.88, COLORS.gold, 11, 'center', true);
}
