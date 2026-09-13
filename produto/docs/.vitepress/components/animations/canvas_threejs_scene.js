// canvas_threejs_scene.js - Didactic Three.js Scenegraph Hierarchy
import { COLORS, drawLabel, drawRoundedRect } from './canvas_utils.js';

export default function sketch(ctx, w, h, time, dt) {
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  drawLabel(ctx, 'THREE.JS: ESTRUTURA HIERÁRQUICA DO SCENEGRAPH', cx, 24, COLORS.textMuted, 11, 'center', true);
  drawLabel(ctx, 'A Cena encapsula objetos através de árvores de nós: Transformações herdadas e Composição', cx, 44, COLORS.cyan, 13, 'center', true);

  // Root Node: THREE.Scene
  const rootX = cx;
  const rootY = 80;
  const nodeW = 120;
  const nodeH = 30;

  drawRoundedRect(ctx, rootX - nodeW * 0.5, rootY - nodeH * 0.5, nodeW, nodeH, 6, COLORS.cardBg, COLORS.cyan, 2);
  drawLabel(ctx, 'THREE.Scene', rootX, rootY, COLORS.white, 11, 'center', true);

  // Level 1 Children: Camera, Light, Mesh
  const children = [
    { name: 'PerspectiveCamera', col: COLORS.gold, x: cx - 160 },
    { name: 'DirectionalLight', col: COLORS.red, x: cx },
    { name: 'THREE.Mesh', col: COLORS.blueLight, x: cx + 160 }
  ];

  const childY = 155;

  children.forEach((ch) => {
    // Tree link from root
    ctx.beginPath();
    ctx.moveTo(rootX, rootY + nodeH * 0.5);
    ctx.lineTo(ch.x, childY - nodeH * 0.5);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    drawRoundedRect(ctx, ch.x - nodeW * 0.5, childY - nodeH * 0.5, nodeW, nodeH, 6, COLORS.cardBg, ch.col, 1.5);
    drawLabel(ctx, ch.name, ch.x, childY, COLORS.white, 10, 'center', true);
  });

  // Level 2 Sub-components of Mesh: BufferGeometry & Material
  const meshComponents = [
    { name: 'BoxGeometry', col: COLORS.green, x: cx + 100 },
    { name: 'MeshStandardMat', col: COLORS.gold, x: cx + 220 }
  ];
  const compY = 225;
  const compW = 105;

  meshComponents.forEach((comp) => {
    ctx.beginPath();
    ctx.moveTo(cx + 160, childY + nodeH * 0.5);
    ctx.lineTo(comp.x, compY - nodeH * 0.5);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    drawRoundedRect(ctx, comp.x - compW * 0.5, compY - nodeH * 0.5, compW, nodeH, 6, COLORS.cardBg, comp.col, 1.5);
    drawLabel(ctx, comp.name, comp.x, compY, comp.col, 9.5, 'center', true);
  });
}
