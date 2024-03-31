class Grape {
  constructor(radius, x, y, col) {
    this.radius = radius;
    this.pos = createVector(x, y);
    this.col = col;
    this.alive = true;
    this.lives = 2;
  }

  display() {
    noStroke();
    if (this.alive) {
      fill(this.col);
    } else {
      fill(color(255, 0, 0));
    }
    circle(this.pos.x, this.pos.y, 2 * this.radius);
  }
}
