// canvas_utils.js - Shared utilities for sophisticated 3Blue1Brown-style didactic 2D animations

export const COLORS = {
  bg: '#0f111e',
  bgCard: 'rgba(21, 25, 44, 0.82)',
  cardBorder: 'rgba(56, 189, 248, 0.22)',
  brown: '#5A3E2B',
  brownLight: '#8D5B4C',
  blue: '#3A9AD9',
  blueLight: '#68BBE3',
  neonCyan: '#38bdf8',
  neonGold: '#fbbf24',
  neonPink: '#f43f5e',
  neonGreen: '#34d399',
  neonPurple: '#a855f7',
  gold: '#fbbf24',
  cyan: '#38bdf8',
  red: '#f43f5e',
  green: '#34d399',
  purple: '#a855f7',
  white: '#ffffff',
  textMuted: '#94a3b8',
  grid: 'rgba(255, 255, 255, 0.05)',
  gridDot: 'rgba(255, 255, 255, 0.12)',
};

export function easeInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function drawGridBackground(ctx, w, h, gridSize = 32) {
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, w, h);

  // Subtle Cartesian dot grid
  ctx.fillStyle = COLORS.gridDot;
  for (let x = gridSize * 0.5; x < w; x += gridSize) {
    for (let y = gridSize * 0.5; y < h; y += gridSize) {
      ctx.fillRect(x - 0.75, y - 0.75, 1.5, 1.5);
    }
  }

  // Vignette gradient
  const vignette = ctx.createRadialGradient(w * 0.5, h * 0.5, w * 0.2, w * 0.5, h * 0.5, w * 0.7);
  vignette.addColorStop(0, 'rgba(15, 17, 30, 0)');
  vignette.addColorStop(1, 'rgba(10, 12, 22, 0.65)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, w, h);
}

export function drawAmbientParticles(ctx, w, h, time, count = 22) {
  ctx.save();
  for (let i = 0; i < count; i++) {
    const seed = i * 137.5;
    const speed = 0.2 + (i % 5) * 0.1;
    const px = (seed * 19 + time * speed * 25) % w;
    const py = (seed * 29 + Math.sin(time * speed + i) * 20 + h) % h;
    const size = 1 + (i % 3) * 0.8;
    const alpha = 0.15 + 0.2 * Math.sin(time * 2 + i);

    ctx.fillStyle = i % 2 === 0 ? COLORS.neonCyan : COLORS.neonGold;
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(px, py, size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

export function drawRoundedRect(ctx, x, y, w, h, r = 8, fill = null, stroke = null, strokeWidth = 1) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
  }
}

export function drawGlowCircle(ctx, x, y, r, color, glowRadius = 12) {
  ctx.save();
  ctx.shadowColor = color;
  ctx.shadowBlur = glowRadius;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

export function drawGlowLine(ctx, x1, y1, x2, y2, color, lineWidth = 2, glowRadius = 10) {
  ctx.save();
  ctx.shadowColor = color;
  ctx.shadowBlur = glowRadius;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
  ctx.restore();
}

export function drawArrow(ctx, x1, y1, x2, y2, color = COLORS.neonCyan, headLen = 10, lineWidth = 2, glow = true) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  ctx.save();
  if (glow) {
    ctx.shadowColor = color;
    ctx.shadowBlur = 8;
  }
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - headLen * Math.cos(angle - Math.PI / 6), y2 - headLen * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(x2 - headLen * Math.cos(angle + Math.PI / 6), y2 - headLen * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

export function drawLabel(ctx, text, x, y, color = COLORS.white, fontSize = 13, align = 'center', fontBold = false) {
  ctx.font = `${fontBold ? 'bold ' : ''}${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", sans-serif`;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y);
}

export function drawBadge(ctx, text, x, y, bgColor = 'rgba(56, 189, 248, 0.15)', textColor = COLORS.neonCyan) {
  ctx.font = '11px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
  const metrics = ctx.measureText(text);
  const padH = 8;
  const padV = 4;
  const w = metrics.width + padH * 2;
  const h = 20;
  drawRoundedRect(ctx, x - w / 2, y - h / 2, w, h, 5, bgColor, textColor, 1);
  drawLabel(ctx, text, x, y, textColor, 11, 'center', true);
}

export function drawTimeline(ctx, cx, y, steps, activeIndex, totalW = 420) {
  const count = steps.length;
  const startX = cx - totalW * 0.5;
  const stepW = totalW / (count - 1);

  // Background connecting track
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(startX, y);
  ctx.lineTo(startX + totalW, y);
  ctx.stroke();

  // Active track up to current step
  const activeEndX = startX + activeIndex * stepW;
  ctx.save();
  ctx.strokeStyle = COLORS.neonCyan;
  ctx.shadowColor = COLORS.neonCyan;
  ctx.shadowBlur = 8;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(startX, y);
  ctx.lineTo(activeEndX, y);
  ctx.stroke();
  ctx.restore();

  // Draw Step Nodes
  steps.forEach((name, i) => {
    const nx = startX + i * stepW;
    const isActive = i === Math.floor(activeIndex);
    const isPast = i <= activeIndex;

    ctx.save();
    if (isActive) {
      drawGlowCircle(ctx, nx, y, 6, COLORS.neonCyan, 12);
      ctx.fillStyle = COLORS.white;
      ctx.beginPath();
      ctx.arc(nx, y, 3, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = isPast ? COLORS.neonCyan : 'rgba(255,255,255,0.25)';
      ctx.beginPath();
      ctx.arc(nx, y, 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    drawLabel(ctx, name, nx, y + 15, isActive ? COLORS.neonCyan : COLORS.textMuted, 10, 'center', isActive);
  });
}
