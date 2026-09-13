// canvas_chartjs.js - Didactic Chart.js Data Visualization & Bar Transitions
import { COLORS, drawLabel, drawRoundedRect } from './canvas_utils.js';

export default function sketch(ctx, w, h, time, dt) {
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  drawLabel(ctx, 'CHART.JS: RENDERIZAÇÃO DE DADOS EM CANVAS 2D', cx, 24, COLORS.textMuted, 11, 'center', true);
  drawLabel(ctx, 'Animações baseadas em easing cúbico para transição suave de séries numéricas', cx, 44, COLORS.cyan, 13, 'center', true);

  const data = [
    { label: 'OpenGL', val: 75, col: COLORS.cyan },
    { label: 'Vulkan', val: 95, col: COLORS.gold },
    { label: 'DirectX', val: 88, col: COLORS.red },
    { label: 'Metal', val: 82, col: COLORS.blueLight },
    { label: 'WebGPU', val: 90, col: COLORS.green }
  ];

  const count = data.length;
  const chartW = w * 0.72;
  const startX = cx - chartW * 0.5;
  const baseY = h * 0.78;
  const maxH = 110;
  const barW = chartW / (count * 1.6);
  const gap = (chartW - count * barW) / (count - 1);

  // Baseline axis
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(startX - 10, baseY);
  ctx.lineTo(startX + chartW + 10, baseY);
  ctx.stroke();

  // Draw Bars
  data.forEach((d, i) => {
    const bx = startX + i * (barW + gap);
    // Dynamic height oscillation
    const animatedH = (d.val / 100) * maxH * (0.8 + 0.2 * Math.sin(time * 2 + i));
    const by = baseY - animatedH;

    drawRoundedRect(ctx, bx, by, barW, animatedH, 4, d.col, null);

    // Value label on top of bar
    drawLabel(ctx, `${(d.val * (0.8 + 0.2 * Math.sin(time * 2 + i))).toFixed(0)}%`, bx + barW * 0.5, by - 10, COLORS.white, 9.5, 'center', true);

    // Category label under bar
    drawLabel(ctx, d.label, bx + barW * 0.5, baseY + 18, COLORS.textMuted, 10, 'center');
  });
}
