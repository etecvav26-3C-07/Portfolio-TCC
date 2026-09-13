// canvas_vulkan_cmdbuf.js - Didactic Vulkan Command Buffers & Multi-threaded Queue
import { COLORS, drawLabel, drawArrow, drawRoundedRect } from './canvas_utils.js';

export default function sketch(ctx, w, h, time, dt) {
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  drawLabel(ctx, 'VULKAN: GRAVAÇÃO MULTI-THREAD E COMMAND BUFFERS', cx, 24, COLORS.textMuted, 11, 'center', true);
  drawLabel(ctx, 'Threads da CPU gravam comandos em paralelo e submetem a filas assíncronas na GPU', cx, 44, COLORS.cyan, 13, 'center', true);

  const lanes = [
    { title: 'CPU Thread 1', queue: 'Graphics Buffer', color: COLORS.cyan, speed: 1.2 },
    { title: 'CPU Thread 2', queue: 'Compute Buffer', color: COLORS.gold, speed: 0.9 },
    { title: 'CPU Thread 3', queue: 'Transfer Buffer', color: COLORS.green, speed: 1.5 }
  ];

  const laneW = Math.min(130, (w - 120) / 3);
  const startX = cx - (lanes.length * laneW + (lanes.length - 1) * 20) * 0.5;
  const laneH = 110;
  const laneY = 75;

  lanes.forEach((lane, i) => {
    const lx = startX + i * (laneW + 20);
    // Lane container
    drawRoundedRect(ctx, lx, laneY, laneW, laneH, 8, COLORS.cardBg, lane.color, 1.5);
    drawLabel(ctx, lane.title, lx + laneW * 0.5, laneY + 16, COLORS.white, 11, 'center', true);
    drawLabel(ctx, lane.queue, lx + laneW * 0.5, laneY + 32, lane.color, 9, 'center');

    // Command packets sliding down inside lane
    const count = 3;
    for (let k = 0; k < count; k++) {
      const p = (time * lane.speed * 0.5 + k / count) % 1;
      const py = laneY + 45 + p * (laneH - 65);
      drawRoundedRect(ctx, lx + 10, py, laneW - 20, 16, 4, lane.color, null);
      drawLabel(ctx, `cmd_draw_${k}`, lx + laneW * 0.5, py + 8, COLORS.bg, 8, 'center', true);
    }

    // Arrow to GPU submission queue
    drawArrow(ctx, lx + laneW * 0.5, laneY + laneH + 4, lx + laneW * 0.5, h * 0.76, lane.color, 6, 1.5);
  });

  // Consolidated GPU Queue Bar at bottom
  const queueY = h * 0.78;
  const queueW = w * 0.75;
  const queueX = cx - queueW * 0.5;
  const queueH = 34;

  drawRoundedRect(ctx, queueX, queueY, queueW, queueH, 6, '#121422', COLORS.gold, 2);
  drawLabel(ctx, 'vkQueueSubmit() → GPU Hardware Execution Queue', cx, queueY + 17, COLORS.gold, 11, 'center', true);
}
