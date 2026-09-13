// canvas_r3f.js - Didactic React Three Fiber JSX declarative paradigm
import { COLORS, drawLabel, drawRoundedRect } from './canvas_utils.js';

export default function sketch(ctx, w, h, time, dt) {
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  drawLabel(ctx, 'REACT THREE FIBER (R3F): RECONCILIAÇÃO DECLARATIVA', cx, 24, COLORS.textMuted, 11, 'center', true);
  drawLabel(ctx, 'Traduz elementos JSX diretamente para instâncias nativas do Three.js em tempo de execução', cx, 44, COLORS.cyan, 13, 'center', true);

  // Nested JSX Containers
  const canvasW = w * 0.75;
  const canvasH = 170;
  const canvasX = cx - canvasW * 0.5;
  const canvasY = 70;

  // Outer: <Canvas>
  drawRoundedRect(ctx, canvasX, canvasY, canvasW, canvasH, 10, 'rgba(30, 32, 60, 0.4)', COLORS.blueLight, 1.5);
  drawLabel(ctx, '<Canvas>', canvasX + 50, canvasY + 18, COLORS.blueLight, 11, 'left', true);

  // Inner: <mesh>
  const meshW = canvasW - 80;
  const meshH = 110;
  const meshX = canvasX + 40;
  const meshY = canvasY + 38;
  drawRoundedRect(ctx, meshX, meshY, meshW, meshH, 8, 'rgba(58, 154, 217, 0.1)', COLORS.cyan, 1.5);
  drawLabel(ctx, `<mesh rotation={[0, ${(time).toFixed(1)}, 0]}>`, meshX + 30, meshY + 20, COLORS.cyan, 11, 'left', true);

  // Leaf 1: <boxGeometry />
  const leafW = (meshW - 60) * 0.48;
  const leafH = 45;
  const leaf1X = meshX + 20;
  const leafY = meshY + 45;
  drawRoundedRect(ctx, leaf1X, leafY, leafW, leafH, 6, COLORS.cardBg, COLORS.gold, 1.5);
  drawLabel(ctx, '<boxGeometry />', leaf1X + leafW * 0.5, leafY + 22, COLORS.gold, 10, 'center', true);

  // Leaf 2: <meshStandardMaterial />
  const leaf2X = leaf1X + leafW + 20;
  drawRoundedRect(ctx, leaf2X, leafY, leafW, leafH, 6, COLORS.cardBg, COLORS.green, 1.5);
  drawLabel(ctx, '<meshStandardMaterial />', leaf2X + leafW * 0.5, leafY + 22, COLORS.green, 10, 'center', true);
}
