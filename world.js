const WORLD_WIDTH = 3000;
const WORLD_HEIGHT = 3000;

// Island size
const ISLAND_R = 400;
const BEACH_SIZE = 60; // beach thickness

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
  ctx.fillStyle = '#f4d79d'; // sand
  ctx.beginPath();
  ctx.arc(cx, cy, ISLAND_R + BEACH_SIZE, 0, Math.PI * 2);
  ctx.fill();

  // LAND (grass inner circle)
  ctx.fillStyle = '#2e8b57';
  ctx.beginPath();
  ctx.arc(cx, cy, ISLAND_R, 0, Math.PI * 2);
  ctx.fill();
}

// Check if player is walking on water
function isPlayerInWater(player) {
  const dx = player.x - WORLD_WIDTH / 2;
  const dy = player.y - WORLD_HEIGHT / 2;
  const dist = Math.sqrt(dx * dx + dy * dy);

  return dist > ISLAND_R + BEACH_SIZE; // outside sand + grass
}

// Draw minimap
function drawMiniMap(ctx, player) {
  const mapSize = 140;
  const worldScale = mapSize / WORLD_WIDTH;

  // Background square
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.fillRect(10, 10, mapSize, mapSize);

  // Island on minimap
  ctx.fillStyle = '#f4d79d'; // beach
  ctx.beginPath();
  ctx.arc(
    10 + mapSize / 2,
    10 + mapSize / 2,
    (ISLAND_R + BEACH_SIZE) * worldScale,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.fillStyle = '#2e8b57'; // grass
  ctx.beginPath();
  ctx.arc(
    10 + mapSize / 2,
    10 + mapSize / 2,
    ISLAND_R * worldScale,
    0,
    Math.PI * 2
  );
  ctx.fill();

  // Player dot
  ctx.fillStyle = '#ffdbac';
  ctx.beginPath();
  ctx.arc(
    10 + (player.x * worldScale),
    10 + (player.y * worldScale),
    4,
    0,
    Math.PI * 2
  );
  ctx.fill();
}
