// Player object
const player = {
  x: 1500,
  y: 1500,
  r: 20,
  speed: 4,

  update() {
    if (keys['w']) this.y -= this.speed;
    if (keys['s']) this.y += this.speed;
    if (keys['a']) this.x -= this.speed;
    if (keys['d']) this.x += this.speed;
  },

  draw(ctx, camera) {
    const sx = this.x - camera.x;
    const sy = this.y - camera.y;

    // Outer darker skin outline
    ctx.fillStyle = '#a67c52';
    ctx.beginPath();
    ctx.arc(sx, sy, this.r, 0, Math.PI * 2);
    ctx.fill();

    // Inner skin color
    ctx.fillStyle = '#ffdbac';
    ctx.beginPath();
    ctx.arc(sx, sy, this.r - 3, 0, Math.PI * 2);
    ctx.fill();
  }
};
