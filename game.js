const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let shopOpen = false;

// Shop panel dimensions (global for click detection)
const shopPanel = {
  width: 300,
  height: 200,
  x: 0,
  y: 0,
  xButtonSize: 20,
  xButtonPadding: 5
};

function loop() {
  player.update();
  camera.update(player, canvas, WORLD_WIDTH, WORLD_HEIGHT);

  drawWater(ctx, canvas);
  drawIsland(ctx, camera);

  // Draw dock + NPC + crate
  drawDockArea(ctx, camera);

  player.draw(ctx, camera);

  // Check for player near NPC
  const dx = player.x - npc.x;
  const dy = player.y - npc.y;
  const dist = Math.sqrt(dx*dx + dy*dy);
  const interactionRadius = 60;

  if (dist < interactionRadius && !shopOpen) {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Press E to open shop', canvas.width/2 - 100, canvas.height - 30);
  }

  // Draw shop panel if open
  if (shopOpen) {
    // Panel position
    shopPanel.x = canvas.width/2 - shopPanel.width/2;
    shopPanel.y = canvas.height/2 - shopPanel.height/2;

    // Semi-transparent panel
    ctx.fillStyle = 'rgba(0,0,0,0.8)';
    ctx.fillRect(shopPanel.x, shopPanel.y, shopPanel.width, shopPanel.height);

    // Red X button
    ctx.fillStyle = 'red';
    ctx.fillRect(shopPanel.x + shopPanel.width - shopPanel.xButtonSize - shopPanel.xButtonPadding,
                 shopPanel.y + shopPanel.xButtonPadding,
                 shopPanel.xButtonSize,
                 shopPanel.xButtonSize);

    // Shop title
    ctx.fillStyle = 'white';
    ctx.font = '18px Arial';
    ctx.fillText('Shop', shopPanel.x + 10, shopPanel.y + 25);
  }

  drawMiniMap(ctx, player);

  requestAnimationFrame(loop);
}

loop();

