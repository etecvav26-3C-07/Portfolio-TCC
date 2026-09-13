// canvas_camera.js - Didactic camera frustum and perspective projection
import { COLORS, drawLabel, drawArrow, drawRoundedRect } from './canvas_utils.js';

export default function sketch(ctx, w, h, time, dt) {
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  drawLabel(ctx, 'CÂMERA E PROJEÇÃO PERSPECTIVA (FRUSTUM)', cx, 24, COLORS.textMuted, 11, 'center', true);
  drawLabel(ctx, 'Transforma coordenadas de visão em coordenadas de tela normalizadas (NDC)', cx, 44, COLORS.cyan, 13, 'center', true);

  // Eye origin
  const eyeX = w * 0.12;
  const eyeY = h * 0.58;

  // Near & Far plane X coordinates
  const nearX = w * 0.35;
  const farX = w * 0.82;

  // Dynamic FOV angle
  const fov = 0.42 + 0.08 * Math.sin(time * 1.5);
  const nearH = (nearX - eyeX) * Math.tan(fov);
  const farH = (farX - eyeX) * Math.tan(fov);

  // Draw Frustum Volume
  ctx.beginPath();
  ctx.moveTo(nearX, eyeY - nearH);
  ctx.lineTo(farX, eyeY - farH);
  ctx.lineTo(farX, eyeY + farH);
  ctx.lineTo(nearX, eyeY + nearH);
  ctx.closePath();
  const grad = ctx.createLinearGradient(nearX, eyeY, farX, eyeY);
  grad.addColorStop(0, 'rgba(58, 154, 217, 0.15)');
  grad.addColorStop(1, 'rgba(90, 62, 43, 0.05)');
  ctx.fillStyle = grad;
  ctx.fill();

  // Projection Rays from Eye
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(eyeX, eyeY);
  ctx.lineTo(farX, eyeY - farH);
  ctx.moveTo(eyeX, eyeY);
  ctx.lineTo(farX, eyeY + farH);
  ctx.moveTo(eyeX, eyeY);
  ctx.lineTo(farX + 20, eyeY);
  ctx.stroke();
  ctx.setLineDash([]);

  // Near Plane Line
  ctx.strokeStyle = COLORS.gold;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(nearX, eyeY - nearH - 5);
  ctx.lineTo(nearX, eyeY + nearH + 5);
  ctx.stroke();
  drawLabel(ctx, 'Near Plane', nearX, eyeY - nearH - 16, COLORS.gold, 11, 'center', true);

  // Far Plane Line
  ctx.strokeStyle = COLORS.blueLight;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(farX, eyeY - farH - 5);
  ctx.lineTo(farX, eyeY + farH + 5);
  ctx.stroke();
  drawLabel(ctx, 'Far Plane', farX, eyeY - farH - 16, COLORS.blueLight, 11, 'center', true);

  // Geometry inside Frustum (rotating 3D tetrahedron or cube)
  const objX = (nearX + farX) * 0.52 + Math.sin(time * 2) * 25;
  const objY = eyeY + Math.cos(time * 2.5) * 15;
  drawRoundedRect(ctx, objX - 18, objY - 18, 36, 36, 6, 'rgba(79, 195, 247, 0.3)', COLORS.cyan, 2);
  drawLabel(ctx, 'Objeto 3D', objX, objY, COLORS.white, 10, 'center', true);

  // Projected footprint on Near Plane
  const projY = eyeY + (objY - eyeY) * ((nearX - eyeX) / (objX - eyeX));
  ctx.beginPath();
  ctx.arc(nearX, projY, 5, 0, Math.PI * 2);
  ctx.fillStyle = COLORS.gold;
  ctx.fill();
  drawArrow(ctx, objX, objY, nearX, projY, 'rgba(240, 194, 127, 0.6)', 6, 1.5);

  // Camera / Eye Icon
  ctx.beginPath();
  ctx.arc(eyeX, eyeY, 14, 0, Math.PI * 2);
  ctx.fillStyle = COLORS.brown;
  ctx.fill();
  ctx.strokeStyle = COLORS.cyan;
  ctx.lineWidth = 2;
  ctx.stroke();
  // Lens pupil
  ctx.beginPath();
  ctx.arc(eyeX + 4, eyeY, 5, 0, Math.PI * 2);
  ctx.fillStyle = COLORS.cyan;
  ctx.fill();

  drawLabel(ctx, 'Eye / Câmera', eyeX, eyeY + 28, COLORS.white, 11, 'center', true);
  drawLabel(ctx, `FOV: ${(fov * 115).toFixed(0)}°`, eyeX + 35, eyeY - 22, COLORS.cyan, 11, 'left', true);
}
