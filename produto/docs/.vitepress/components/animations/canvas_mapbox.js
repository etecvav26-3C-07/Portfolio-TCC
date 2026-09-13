// canvas_mapbox.js - Didactic Mapbox GL Vector Tiles and Web Mercator Projection
import { COLORS, drawLabel, drawRoundedRect } from './canvas_utils.js';

export default function sketch(ctx, w, h, time, dt) {
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  drawLabel(ctx, 'MAPBOX GL: PIRÂMIDE DE TILES E PROJEÇÃO MERCATOR', cx, 24, COLORS.textMuted, 11, 'center', true);
  drawLabel(ctx, 'Dados geoespaciais particionados em quadtrees hierárquicas por nível de zoom (Z/X/Y)', cx, 44, COLORS.cyan, 13, 'center', true);

  // Tile Grid visualization
  const gridW = Math.min(240, w * 0.45);
  const gridH = 120;
  const startX = cx - gridW * 0.5;
  const startY = 75;

  const rows = 3;
  const cols = 4;
  const cw = gridW / cols;
  const ch = gridH / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const bx = startX + c * cw;
      const by = startY + r * ch;
      const active = (r === 1 && c === 2);

      drawRoundedRect(ctx, bx + 2, by + 2, cw - 4, ch - 4, 3, active ? 'rgba(58,154,217,0.3)' : COLORS.cardBg, active ? COLORS.gold : COLORS.cardBorder, 1);
      drawLabel(ctx, `tile/${r}/${c}`, bx + cw * 0.5, by + ch * 0.5, active ? COLORS.gold : COLORS.textMuted, 8, 'center');
    }
  }

  // Footer info
  drawLabel(ctx, 'Zoom Level 14: Polígonos de Edifícios 3D Extrudados', cx, h - 22, COLORS.gold, 10, 'center', true);
}
