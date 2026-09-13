// canvas_p5js.js - Didactic P5.js Creative Coding & Lissajous Curves
import { COLORS, drawLabel } from './canvas_utils.js';

export default function sketch(ctx, w, h, time, dt) {
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  drawLabel(ctx, 'P5.JS: ARTE GENERATIVA E PROGRAMAÇÃO CRIATIVA', cx, 24, COLORS.textMuted, 11, 'center', true);
  drawLabel(ctx, 'setup() inicializa o ambiente • draw() executa o ciclo procedimental contínuo', cx, 44, COLORS.cyan, 13, 'center', true);

  const cy = h * 0.6;
  const a = 3;
  const b = 4;
  const delta = time * 0.8;
  const A = Math.min(w * 0.35, 110);
  const B = 55;

  ctx.beginPath();
  const samples = 140;
  for (let i = 0; i <= samples; i++) {
    const theta = (i / samples) * Math.PI * 2;
    const px = cx + A * Math.sin(a * theta + delta);
    const py = cy + B * Math.sin(b * theta);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.strokeStyle = COLORS.gold;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Current drawing pen
  const penTheta = (time * 1.5) % (Math.PI * 2);
  const penX = cx + A * Math.sin(a * penTheta + delta);
  const penY = cy + B * Math.sin(b * penTheta);
  ctx.beginPath();
  ctx.arc(penX, penY, 5, 0, Math.PI * 2);
  ctx.fillStyle = COLORS.cyan;
  ctx.fill();

  drawLabel(ctx, 'Curva Paramétrica de Lissajous: x = A·sin(at + δ), y = B·sin(bt)', cx, h - 22, COLORS.textMuted, 10, 'center');
}
