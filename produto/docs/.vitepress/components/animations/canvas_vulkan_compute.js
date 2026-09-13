// canvas_vulkan_compute.js - Didactic Compute Shader & GPGPU particle wave simulation
import { COLORS, drawLabel, drawRoundedRect } from './canvas_utils.js';

export default function sketch(ctx, w, h, time, dt) {
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  drawLabel(ctx, 'VULKAN: COMPUTE SHADERS E SIMULAÇÃO GPGPU', cx, 24, COLORS.textMuted, 11, 'center', true);
  drawLabel(ctx, 'Despacho de Workgroups paralelos (vkCmdDispatch) operando diretamente na memória de vídeo', cx, 44, COLORS.cyan, 13, 'center', true);

  // Particle grid
  const cols = 28;
  const rows = 12;
  const gridW = w * 0.8;
  const gridH = h * 0.45;
  const startX = cx - gridW * 0.5;
  const startY = h * 0.38;

  const dx = gridW / (cols - 1);
  const dy = gridH / (rows - 1);

  let totalParticles = cols * rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const baseX = startX + c * dx;
      const baseY = startY + r * dy;

      // Mathematical wave displacement (computed on virtual GPU thread)
      const dist = Math.hypot(c - cols * 0.5, r - rows * 0.5);
      const wave = Math.sin(dist * 0.6 - time * 3.5) * 12;
      const py = baseY + wave;

      // Color mapping by displacement
      const normWave = (wave + 12) / 24;
      const alpha = 0.4 + 0.6 * normWave;

      ctx.beginPath();
      ctx.arc(baseX, py, 2.8, 0, Math.PI * 2);
      ctx.fillStyle = normWave > 0.6 ? COLORS.cyan : COLORS.gold;
      ctx.globalAlpha = alpha;
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1.0;

  // Footer badge with compute dispatch parameters
  drawRoundedRect(ctx, cx - 180, h - 38, 360, 24, 6, COLORS.cardBg, COLORS.cardBorder, 1);
  drawLabel(ctx, `vkCmdDispatch(x=${cols}, y=${rows}, z=1) • ${totalParticles} Vértices em Paralelo`, cx, h - 26, COLORS.gold, 10, 'center', true);
}
