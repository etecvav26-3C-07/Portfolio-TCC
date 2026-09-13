// canvas_deckgl.js - Didactic Deck.gl Hexagonal Aggregation and Geospatial 3D Arcs
import { COLORS, drawLabel, drawRoundedRect } from './canvas_utils.js';

export default function sketch(ctx, w, h, time, dt) {
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  drawLabel(ctx, 'DECK.GL: VISUALIZAÇÃO EM GRANDE ESCALA (HEXAGON LAYER)', cx, 24, COLORS.textMuted, 11, 'center', true);
  drawLabel(ctx, 'Agrupamento espacial de milhões de pontos geográficos em prismas 3D acelerados por GPU', cx, 44, COLORS.cyan, 13, 'center', true);

  const cy = h * 0.65;
  const hexCols = 5;
  const hexRadius = 24;
  const startX = cx - (hexCols - 1) * 35;

  // Draw 5 Hexagonal columns with dynamic heights
  for (let i = 0; i < hexCols; i++) {
    const hx = startX + i * 70;
    const wave = Math.sin(time * 2 + i * 1.2);
    const colHeight = 35 + wave * 25;
    const hy = cy - colHeight;

    // Hexagon 3D prism simulation
    drawRoundedRect(ctx, hx - 18, hy, 36, colHeight, 4, COLORS.cardBg, COLORS.cyan, 1.5);
    drawLabel(ctx, `${(colHeight * 32).toFixed(0)}`, hx, hy - 12, COLORS.gold, 9, 'center', true);
  }

  // 3D Arc Layer between column 1 and column 4
  const p1X = startX + 70;
  const p2X = startX + 210;
  ctx.beginPath();
  ctx.moveTo(p1X, cy - 40);
  ctx.quadraticCurveTo((p1X + p2X) * 0.5, cy - 110, p2X, cy - 40);
  ctx.strokeStyle = COLORS.gold;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  drawLabel(ctx, 'ArcLayer (Fluxo de Origem → Destino)', cx, cy - 85, COLORS.gold, 9.5, 'center', true);
  drawLabel(ctx, 'HexagonLayer: Densidade de Pontos / Métricas Urbanas', cx, h - 22, COLORS.textMuted, 10, 'center');
}
