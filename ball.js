class Ball {
  
  constructor(radius, fac){
    this.pos = createVector(width / 2, height - 50*fac);
    this.vel = createVector(random(-0.2, 0.2), -1).normalize();
    this.radius = radius * fac;
    this.speed = 10*fac;
    this.gravity = createVector(0, 0.1*fac);
    this.vel.mult(this.speed);
    this.fac = fac;
    
  }
  
  collide(grape) {
    let n = this.pos.copy().sub(grape.pos).normalize();
    this.vel = this.vel.add(n.mult(-2 * n.dot(this.vel)));
  }
  
  update(paddle) {
    
    let tmp = this.pos.copy().add(this.vel);
    
    if (tmp.x + this.radius > width) {
      let a = tmp.x + this.radius - width;
      tmp.x = width - a - this.radius;
      this.vel.x = -this.vel.x;
    }
    else if (tmp.x < this.radius) {
      tmp.x = tmp.x - 2 * (tmp.x - this.radius);
      this.vel.x = -this.vel.x;
    }
  
    if (tmp.y < this.radius) {
      tmp.y = tmp.y - 2 * (tmp.y - this.radius);
      this.vel.y = -this.vel.y;
    }
    if (tmp.y > paddle.pos.y - paddle.h/2 &&
       tmp.y < paddle.pos.y + paddle.h/2) {
      if (tmp.x > paddle.pos.x-paddle.w/2 && tmp.x < paddle.pos.x + paddle.w/2) {
        tmp.y = tmp.y - 2 * (-tmp.y + paddle.pos.y);
        
        let phi =map(tmp.x - paddle.pos.x, -paddle.w/2, paddle.w/2, -PI/4, PI/4);
        
        this.vel.y = -this.vel.y
        this.vel = createVector(sin(phi), -cos(phi)).mult(this.speed*this.fac);
      }
    }
    
    this.pos = tmp;
    
    this.vel.add(this.gravity);
    this.vel.setMag(this.speed);
    
  }
  
  
  display() {
    fill(color(50));
    circle(this.pos.x, this.pos.y, 2*this.radius);
  }
}