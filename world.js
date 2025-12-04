const WORLD_WIDTH = 3000;
const WORLD_HEIGHT = 3000;

function drawWater(ctx, canvas) {
  ctx.fillStyle = '#3bb9ff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawIsland(ctx, camera) {
  ctx.fillStyle = '#2e8b57'; // green island
  ctx.beginPath();
  ctx.arc(
    WORLD_WIDTH / 2 - camera.x,
    WORLD_HEIGHT / 2 - camera.y,
    400,
    0,
    Math.PI * 2
  );
  ctx.fill();
}
