const WORLD_WIDTH = 3000;
const WORLD_HEIGHT = 3000;

// Island size
const ISLAND_R = 400;
const BEACH_SIZE = 60; // beach thickness

// Dock config
const DOCK_WIDTH = 350;
const DOCK_HEIGHT = 80;
const DOCK_LEFT_WIDTH = 120; // second dock piece (vertical)
const DOCK_COLOR = "#555555";

// Crate
const CRATE_SIZE = 26;

// NPC
const npc = {
  x: WORLD_WIDTH / 2 + ISLAND_R + 20,  // on dock
  y: WORLD_HEIGHT / 2,
  r: 20
};

// Draw full water background
function drawWater(ctx, canvas) {
  ctx.fillStyle = '#3bb9ff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Draw island (grass + sand)
function drawIsland(ctx, camera) {
  const cx = WORLD_WIDTH / 2 - camera.x;
  const cy = WORLD_HEIGHT / 2 - camera.y;

  // BEACH (sand ring)
  ctx.fillStyle = '#f4d79d'; 
  ctx.beginPath();
  ctx.arc(cx, cy, ISLAND_R + BEACH_SIZE, 0, Math.PI * 2);
  ctx.fill();

  // LAND (grass inner circle)
  ctx.fillStyle = '#2e8b57';
  ctx.beginPath();
  ctx.arc(cx, cy, ISLAND_R, 0, Math.PI * 2);
  ctx.fill();
}


// Draw dock + NPC + crate
function drawDockScene(ctx, camera) {

  // MAIN DOCK (horizontal)
  const dx = WORLD_WIDTH/2 + ISLAND_R - camera.x;
  const dy = WORLD_HEIGHT/2 - DOCK_HEIGHT/2 - camera.y;

  ctx.fillStyle = DOCK_COLOR;
  ctx.fillRect(dx, dy, DOCK_WIDTH, DOCK_HEIGHT);

  // SECOND DOCK PIECE (vertical left)
  ctx.fillRect(
    dx - DOCK_LEFT_WIDTH, 
    dy + DOCK_HEIGHT/2 - DOCK_LEFT_WIDTH/2,
    DOCK_LEFT_WIDTH,
    DOCK_HEIGHT
  );

  // NPC (same style as player)
  const sx = npc.x - camera.x;
  const sy = npc.y - camera.y;

  ctx.fillStyle = '#a67c52';
  ctx.beginPath();
  ctx.arc(sx, sy, npc.r, 0, Math.PI*2);
  ctx.fill();

  ctx.fillStyle = '#ffdbac';
  ctx.beginPath();
  ctx.arc(sx, sy, npc.r - 3, 0, Math.PI*2);
  ctx.fill();

  // CRATE — looks like wood now
  ctx.fillStyle = '#8b5a2b';
  ctx.fillRect(
    sx + 30 - CRATE_SIZE/2,
    sy - CRATE_SIZE/2,
    CRATE_SIZE,
    CRATE_SIZE
  );

  ctx.strokeStyle = "#5a3b1b";
  ctx.lineWidth = 3;
  ctx.strokeRect(
    sx + 30 - CRATE_SIZE/2,
    sy - CRATE_SIZE/2,
    CRATE_SIZE,
    CRATE_SIZE
  );
}



// is player in water?
function isPlayerInWater(player) {
  const dx = player.x - WORLD_WIDTH / 2;
  const dy = player.y - WORLD_HEIGHT / 2;
  const dist = Math.sqrt(dx * dx + dy * dy);
  return dist > ISLAND_R + BEACH_SIZE;
}


// Minimap
function drawMiniMap(ctx, player) {
  const mapSize = 140;
  const worldScale = mapSize / WORLD_WIDTH;

  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.fillRect(10, 10, mapSize, mapSize);

  ctx.fillStyle = '#f4d79d'; 
  ctx.beginPath();
  ctx.arc(
    10 + mapSize / 2,
    10 + mapSize / 2,
    (ISLAND_R + BEACH_SIZE) * worldScale,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.fillStyle = '#2e8b57';
  ctx.beginPath();
  ctx.arc(
    10 + mapSize / 2,
    10 + mapSize / 2,
    ISLAND_R * worldScale,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.fillStyle = '#ffdbac';
  ctx.beginPath();
  ctx.arc(
    10 + (player.x * worldScale),
    10 + (player.y * worldScale),
    4, 0, Math.PI * 2
  );
  ctx.fill();
}
