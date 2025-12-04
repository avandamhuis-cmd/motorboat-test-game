const keys = {};
window.addEventListener('keydown', e => {
  keys[e.key.toLowerCase()] = true;

  if (e.key.toLowerCase() === 'e') {
    // toggle shop if near NPC
    const dx = player.x - npc.x;
    const dy = player.y - npc.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist < 60) shopOpen = true;
  }

  if (e.key === 'Escape' && shopOpen) {
    shopOpen = false; // close shop
  }
});

window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

// Handle clicking red X on shop
canvas.addEventListener('click', (e) => {
  if (shopOpen) {
    // get mouse position relative to canvas
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    // check if click is inside the red X
    const xStart = shopPanel.x + shopPanel.width - shopPanel.xButtonSize - shopPanel.xButtonPadding;
    const yStart = shopPanel.y + shopPanel.xButtonPadding;
    const xEnd = xStart + shopPanel.xButtonSize;
    const yEnd = yStart + shopPanel.xButtonSize;

    if (mx >= xStart && mx <= xEnd && my >= yStart && my <= yEnd) {
      shopOpen = false; // close shop
    }
  }
});
