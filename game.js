const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

function loop() {
  player.update();
  camera.update(player, canvas, WORLD_WIDTH, WORLD_HEIGHT);

  drawWater(ctx, canvas);
  drawIsland(ctx, camera);

  player.draw(ctx, camera);

  drawMiniMap(ctx, player); // new!

  requestAnimationFrame(loop);
}

loop();
