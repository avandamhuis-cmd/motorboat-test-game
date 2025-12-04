// Camera follows the player
const camera = {
  x: 0,
  y: 0,

  update(player, canvas, worldW, worldH) {
    camera.x = player.x - canvas.width / 2;
    camera.y = player.y - canvas.height / 2;

    // Keep camera inside the world boundaries
    camera.x = Math.max(0, Math.min(camera.x, worldW - canvas.width));
    camera.y = Math.max(0, Math.min(camera.y, worldH - canvas.height));
  }
};
