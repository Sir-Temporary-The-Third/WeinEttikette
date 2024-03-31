class Particles {
  constructor(x, y, r, reg, fac) {
    this.pos = new Array(10);
    this.vel = new Array(10);
    let temp = reg*fac;
    this.speed = 3*fac;
    for (let i = 0; i < this.pos.length; i++) {
      this.pos[i] = createVector(random(x-temp, x+temp), random(y-temp, y+temp));
      this.vel[i] = createVector(random(-0.1*this.speed, 0.1*this.speed), random(3*this.speed/4, this.speed));
    }
    this.live = 150;
    this.fac = fac;
    this.r = r;
  }
  
  update() {
    for (let i = 0; i < this.pos.length; i++) {
      this.pos[i] = this.pos[i].add(this.vel[i]);
      this.live -= 0.5;
      fill(color(131, 0, 83, this.live));
      circle(this.pos[i].x, this.pos[i].y, this.r);
    }
  }
}