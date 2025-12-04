const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let shopOpen = false;

// shop panel data
const shopPanel = {
  width: 300,
  height: 200,
  x: 0,
  y: 0,
  xSize: 22,
  padding: 8
};

function loop() {
  player.update();
  camera.update(player, canvas, WORLD_WIDTH, WORLD_HEIGHT);

  drawWater(ctx, canvas);
  drawIsland(ctx, camera);

  drawDockScene(ctx, camera);

  player.draw(ctx, camera);

  drawMiniMap(ctx, player);

  // SHOP UI
  if (shopOpen) {
    shopPanel.x = canvas.width/2 - shopPanel.width/2;
    shopPanel.y = canvas.height/2 - shopPanel.height/2;

    ctx.fillStyle = "rgba(0,0,0,0.8)";
    ctx.fillRect(shopPanel.x, shopPanel.y, shopPanel.width, shopPanel.height);

    // Red X
    ctx.fillStyle = "red";
    ctx.fillRect(
      shopPanel.x + shopPanel.width - shopPanel.xSize - shopPanel.padding,
      shopPanel.y + shopPanel.padding,
      shopPanel.xSize,
      shopPanel.xSize
    );

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Shop", shopPanel.x + 15, shopPanel.y + 30);
  }

  requestAnimationFrame(loop);
}

loop();
