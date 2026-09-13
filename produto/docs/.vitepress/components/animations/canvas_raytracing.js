// canvas_raytracing.js - Didactic Ray Tracing & BVH Acceleration
import { COLORS, drawLabel, drawArrow, drawRoundedRect } from './canvas_utils.js';

export default function sketch(ctx, w, h, time, dt) {
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  drawLabel(ctx, 'RAY TRACING E ESTRUTURA ACELERADORA (BVH)', cx, 24, COLORS.textMuted, 11, 'center', true);
  drawLabel(ctx, 'Raios primários da câmera testam caixas delimitadoras (AABB) antes da geometria', cx, 44, COLORS.cyan, 13, 'center', true);

  // Camera / Eye position
  const eyeX = w * 0.12;
  const eyeY = h * 0.56;

  // Virtual Image Plane (Screen pixels)
  const planeX = w * 0.28;
  const planeH = 100;
  ctx.strokeStyle = COLORS.textMuted;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(planeX, eyeY - planeH * 0.5);
  ctx.lineTo(planeX, eyeY + planeH * 0.5);
  ctx.stroke();
  drawLabel(ctx, 'Plano de Imagem (Pixels)', planeX, eyeY - planeH * 0.5 - 14, COLORS.textMuted, 10, 'center');

  // Sphere Geometry
  const sphereX = w * 0.68;
  const sphereY = eyeY + Math.sin(time * 1.5) * 15;
  const sphereR = 40;

  // BVH Bounding Box (AABB)
  const bvhPadding = 16;
  const bvhX = sphereX - sphereR - bvhPadding;
  const bvhY = sphereY - sphereR - bvhPadding;
  const bvhW = (sphereR + bvhPadding) * 2;
  const bvhH = (sphereR + bvhPadding) * 2;

  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = COLORS.gold;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(bvhX, bvhY, bvhW, bvhH);
  ctx.setLineDash([]);
  drawLabel(ctx, 'BVH Box (AABB)', sphereX, bvhY - 10, COLORS.gold, 10, 'center', true);

  // Render Sphere
  const sphereGrad = ctx.createRadialGradient(
    sphereX - sphereR * 0.35, sphereY - sphereR * 0.35, sphereR * 0.1,
    sphereX, sphereY, sphereR
  );
  sphereGrad.addColorStop(0, '#ffffff');
  sphereGrad.addColorStop(0.3, COLORS.blue);
  sphereGrad.addColorStop(1, '#0c1a2d');
  ctx.beginPath();
  ctx.arc(sphereX, sphereY, sphereR, 0, Math.PI * 2);
  ctx.fillStyle = sphereGrad;
  ctx.fill();
  ctx.strokeStyle = COLORS.cyan;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Primary Ray calculation
  // Shoot rays through image plane at varying angles
  const rayAngle = (Math.sin(time * 2) * 0.25);
  const targetPlaneY = eyeY + rayAngle * (planeX - eyeX) * 3;

  // Intersection point with sphere
  // Line: Eye + t * D
  const hitX = sphereX - sphereR * 0.95;
  const hitY = sphereY + (targetPlaneY - eyeY) * 0.8;

  // 1. Primary Ray (Eye -> Intersection)
  drawArrow(ctx, eyeX, eyeY, hitX, hitY, COLORS.gold, 7, 2);
  drawLabel(ctx, 'Raio Primário', (eyeX + hitX) * 0.45, (eyeY + hitY) * 0.5 - 12, COLORS.gold, 11, 'center', true);

  // Pixel on image plane
  ctx.beginPath();
  ctx.arc(planeX, targetPlaneY, 4, 0, Math.PI * 2);
  ctx.fillStyle = COLORS.cyan;
  ctx.fill();

  // 2. Secondary Reflected Ray
  const refEndX = hitX + 70;
  const refEndY = hitY - 80;
  drawArrow(ctx, hitX, hitY, refEndX, refEndY, COLORS.cyan, 7, 2);
  drawLabel(ctx, 'Raio Refletido', refEndX + 10, refEndY - 5, COLORS.cyan, 11, 'left', true);

  // 3. Shadow Ray to Light Source
  const lightX = w * 0.88;
  const lightY = h * 0.22;
  // Draw Light Source
  ctx.beginPath();
  ctx.arc(lightX, lightY, 12, 0, Math.PI * 2);
  ctx.fillStyle = COLORS.gold;
  ctx.shadowColor = COLORS.gold;
  ctx.shadowBlur = 15;
  ctx.fill();
  ctx.shadowBlur = 0;
  drawLabel(ctx, 'Fonte de Luz', lightX, lightY - 18, COLORS.gold, 10, 'center', true);

  // Shadow ray line
  drawArrow(ctx, hitX, hitY, lightX, lightY, 'rgba(240, 194, 127, 0.5)', 6, 1.5);
  drawLabel(ctx, 'Shadow Ray', (hitX + lightX) * 0.5, (hitY + lightY) * 0.5 - 10, 'rgba(240, 194, 127, 0.8)', 10, 'center');

  // Draw Camera
  ctx.beginPath();
  ctx.arc(eyeX, eyeY, 12, 0, Math.PI * 2);
  ctx.fillStyle = COLORS.brown;
  ctx.fill();
  ctx.strokeStyle = COLORS.cyan;
  ctx.lineWidth = 2;
  ctx.stroke();
  drawLabel(ctx, 'Câmera', eyeX, eyeY + 24, COLORS.white, 11, 'center', true);
}
