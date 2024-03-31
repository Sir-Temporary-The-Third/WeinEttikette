class Paddle {
  constructor(w, h, fac) {
    this.pos = createVector(width/2, height-20*fac)
    this.w = w*fac;
    this.h = h*fac;
  }
  
  display() {
    fill(color(0));
    rect(this.pos.x-this.w/2, this.pos.y-this.h/2, this.w, this.h);
  }
  
  update(x) {
    
    //this.pos.x = mouseX;
    this.pos.x = x;
    
  }
}