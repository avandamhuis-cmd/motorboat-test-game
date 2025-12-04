const keys = {};

window.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;

  if (e.key.toLowerCase() === "e") {
    const dx = player.x - npc.x;
    const dy = player.y - npc.y;
    const dist = Math.sqrt(dx*dx + dy*dy);

    if (dist < 60) shopOpen = true;
  }

  if (e.key === "Escape") {
    shopOpen = false;
  }
});

window.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});

canvas.addEventListener("click", (e) => {
  if (!shopOpen) return;

  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  const xStart = shopPanel.x + shopPanel.width - shopPanel.xSize - shopPanel.padding;
  const yStart = shopPanel.y + shopPanel.padding;
  const xEnd = xStart + shopPanel.xSize;
  const yEnd = yStart + shopPanel.xSize;

  if (mx >= xStart && mx <= xEnd && my >= yStart && my <= yEnd) {
    shopOpen = false;
  }
});
