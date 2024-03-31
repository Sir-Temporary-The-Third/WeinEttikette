class Blockade {
  constructor(radius, x, y, col) {
    this.radius = radius;
    this.pos = createVector(x, y);
    this.col = col;
  }
  
  display() {
    noStroke();
    fill(this.col);
    circle(this.pos.x, this.pos.y, 2*this.radius);
  }
}