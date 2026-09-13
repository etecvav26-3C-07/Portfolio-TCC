// canvas_pbr.js - Didactic Physically Based Rendering (Roughness × Metalness)
import { COLORS, drawLabel, drawArrow } from './canvas_utils.js';

export default function sketch(ctx, w, h, time, dt) {
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  drawLabel(ctx, 'MATERIAIS PBR (PHYSICALLY BASED RENDERING)', cx, 24, COLORS.textMuted, 11, 'center', true);
  drawLabel(ctx, 'Matriz Microfacetária: Metalness (Eixo X) vs Roughness (Eixo Y)', cx, 44, COLORS.cyan, 13, 'center', true);

  const cols = 3;
  const rows = 3;
  const radius = Math.min(24, (h - 110) / (rows * 2.5));
  const startX = cx - (cols - 1) * 65;
  const startY = h * 0.42 - (rows - 1) * 30;

  // Moving light angle for highlights
  const lightAngle = time * 1.5;
  const lx = Math.cos(lightAngle);
  const ly = Math.sin(lightAngle);

  // Axis Labels
  drawLabel(ctx, 'Rugosidade (Roughness) ↑', startX - 55, h * 0.62, COLORS.gold, 11, 'center', true);
  drawLabel(ctx, 'Metalicidade (Metalness) →', cx, h - 20, COLORS.blueLight, 11, 'center', true);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const sx = startX + c * 65;
      const sy = startY + r * 60;

      // Values from 0 to 1
      const metal = c / (cols - 1);
      const rough = 1 - r / (rows - 1); // Top = rough 1, Bot = rough 0

      // Calculate sphere gradient
      // Metal has tinted reflections and dark base; dielectric has white highlight and colored base
      const baseR = Math.round(90 * (1 - metal) + 218 * metal);
      const baseG = Math.round(62 * (1 - metal) + 165 * metal);
      const baseB = Math.round(43 * (1 - metal) + 32 * metal);

      const grad = ctx.createRadialGradient(
        sx + lx * radius * 0.4, sy + ly * radius * 0.4, Math.max(1, radius * (0.05 + rough * 0.55)),
        sx, sy, radius
      );

      // Specular highlight softness governed by roughness
      if (rough < 0.2) {
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.2, `rgb(${baseR}, ${baseG}, ${baseB})`);
        grad.addColorStop(1, '#0b0c16');
      } else if (rough < 0.6) {
        grad.addColorStop(0, 'rgba(255,255,255,0.8)');
        grad.addColorStop(0.5, `rgb(${baseR}, ${baseG}, ${baseB})`);
        grad.addColorStop(1, '#101222');
      } else {
        grad.addColorStop(0, `rgb(${baseR + 40}, ${baseG + 40}, ${baseB + 40})`);
        grad.addColorStop(0.8, `rgb(${baseR}, ${baseG}, ${baseB})`);
        grad.addColorStop(1, '#15172b');
      }

      ctx.beginPath();
      ctx.arc(sx, sy, radius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Values subtitle
      drawLabel(ctx, `m:${metal.toFixed(1)} r:${rough.toFixed(1)}`, sx, sy + radius + 12, COLORS.textMuted, 9, 'center');
    }
  }
}
