// canvas_aframe.js - Didactic A-Frame WebXR Entity-Component-System (ECS)
import { COLORS, drawLabel, drawRoundedRect } from './canvas_utils.js';

export default function sketch(ctx, w, h, time, dt) {
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  drawLabel(ctx, 'A-FRAME: ARQUITETURA ENTITY-COMPONENT-SYSTEM (ECS)', cx, 24, COLORS.textMuted, 11, 'center', true);
  drawLabel(ctx, 'Entidades vazias recebem comportamento e física desacoplados através de componentes', cx, 44, COLORS.cyan, 13, 'center', true);

  // 3 ECS Columns
  const cols = [
    { title: 'Entidade (Entity)', desc: 'Objeto base vazio (<a-entity>)', col: COLORS.cyan },
    { title: 'Componente', desc: 'Dados e atributos (position, geometry)', col: COLORS.gold },
    { title: 'Sistema (System)', desc: 'Lógica e loop global (render, tick)', col: COLORS.green }
  ];

  const colW = Math.min(150, (w - 100) / 3);
  const startX = cx - (3 * colW + 2 * 25) * 0.5;
  const colY = 75;
  const colH = 150;

  cols.forEach((col, idx) => {
    const lx = startX + idx * (colW + 25);
    drawRoundedRect(ctx, lx, colY, colW, colH, 8, COLORS.cardBg, col.col, 1.5);
    drawLabel(ctx, col.title, lx + colW * 0.5, colY + 24, COLORS.white, 11, 'center', true);
    drawLabel(ctx, col.desc, lx + colW * 0.5, colY + 50, COLORS.textMuted, 9, 'center');

    // Visual item inside
    if (idx === 0) {
      drawLabel(ctx, '<a-box />', lx + colW * 0.5, colY + 95, col.col, 12, 'center', true);
    } else if (idx === 1) {
      drawLabel(ctx, 'material="color: red"', lx + colW * 0.5, colY + 85, col.col, 10, 'center');
      drawLabel(ctx, 'animation="property: rot"', lx + colW * 0.5, colY + 110, col.col, 10, 'center');
    } else {
      drawLabel(ctx, 'WebXR Render Loop', lx + colW * 0.5, colY + 90, col.col, 10, 'center', true);
      drawLabel(ctx, '6DOF Tracking', lx + colW * 0.5, colY + 110, col.col, 10, 'center');
    }
  });
}
