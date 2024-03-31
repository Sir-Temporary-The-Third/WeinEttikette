let backgroundColor, grapeColor, grapeColor2;
let img, winImg, grapeCoords, blockCoords;

let grapes, ball, paddle, blockades;
let count = 0,
  lost = false,
  started = false;
let particles;
let winImgFac;

document.addEventListener("touchstart", {});
document.addEventListener("touchmoved", {});

function preload() {
  coords = loadJSON("coords.json");
  img = createImg("EmptyBackground.png", "Background",null, redraw);
  img.hide();
  winImg = createImg("Rebstock.jpg", "Rebstock");
  winImg.hide();
  winImgFac = min(630 / winImg.width, 770 / winImg.height);
}

function setup() {
  backgroundColor = color(255, 238, 217);

  grapeColor = color(106, 191, 0);
  grapeColor2 = color(151, 0, 43);

  particles = [];

  getScale();
  //createCanvas(w, h);
  createCanvas(630 * fac, 770 * fac);
  frameRate(45);
  grapeCoords = coords.grapeCoords;
  blockCoords = coords.blockCoords;
  reset();

  noLoop();
}

function draw() {
  image(img, 0, 0, width, height);
  for (let g = 0; g < grapes.length; g++) {
    if (grapes[g].alive) {
      collide(grapes[g]);
      grapes[g].display();
    }
  }
  for (let g = 0; g < blockades.length; g++) {
    block(blockades[g]);
    //blockades[g].display();
  }
  if (!started) {
    textAlign(CENTER);
    fill(0);
    textSize(40 * fac);
    text("Tap to start", width / 2, (3 * height) / 4);
    paddle.display();
    ball.display();
  } else {
    ball.update(paddle);
    ball.display();
    if (touches.length > 0) {
      paddle.update(touches[0].x);
      fill(color(51, 50));
      rect(paddle.pos.x - paddle.w / 2, 0, paddle.w, height);
    } else {
      paddle.update(mouseX);
    }
    paddle.display();
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    p = particles[i];
    p.update();
    if (p.live <= 0) particles.pop(i);
  }

  if (count >= grapeCoords.length) {
    background(backgroundColor);
    fill(0);
    noLoop();
    textAlign(CENTER);
    textSize(100 * fac);
    text("YOU WON", width / 2, height / 4);
    textSize(40 * fac);
    text("Tap to restart", width / 2, 40 * fac);
    started = false;
    image(winImg, width / 4, (5 * height) / 12, width / 2, height / 2);
  }
  if (ball.pos.y > height * 1.2) {
    noLoop();
    textAlign(CENTER);
    fill(0);
    textSize(90 * fac);
    text("Game over", width / 2, height / 2);
    textSize(40 * fac);
    text("Tap to restart", width / 2, height - 40 * fac);
    lost = true;
  }
}

function collide(grape) {
  if (grape.pos.dist(ball.pos) < grape.radius + ball.radius) {
    grape.lives--;
    if (grape.lives == 0) {
      grape.alive = false;
      particles.push(
        new Particles(grape.pos.x, grape.pos.y, 15, grape.radius / 2, fac)
      );
      count++;
    } else {
      grape.col = grapeColor2;
    }
    ball.collide(grape);
  }
}

function block(blockade) {
  if (blockade.pos.dist(ball.pos) < blockade.radius + ball.radius) {
    ball.collide(blockade);
  }
}

function reset() {
  grapes = new Array(grapeCoords.length);
  for (let i = 0; i < grapeCoords.length; i++) {
    grapes[i] = new Grape(
      35 * fac,
      grapeCoords[i].x * fac,
      grapeCoords[i].y * fac,
      grapeColor
    );
  }
  blockades = new Array(blockCoords.length);
  for (let i = 0; i < blockCoords.length; i++) {
    blockades[i] = new Blockade(
      blockCoords[i].r * fac,
      blockCoords[i].x * fac,
      blockCoords[i].y * fac,
      color(255, 0, 0)
    );
  }

  ball = new Ball(10, fac);
  paddle = new Paddle(80, 20, fac);
  count = 0;
  particles = [];
}

function getScale() {
  let a = windowWidth / 630;
  let b = windowHeight / 770;
  fac = min(a, b);
}

function touchStarted() {
  if (lost || !started) {
    reset();
    loop();
    lost = false;
    started = true;
  }
  return false;
}

function touchMoved() {
  return false;
}

function touchEnded() {
  return false;
}
