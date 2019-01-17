var t = -248;
var b = 248;
var l = 248;
var r = -248;

var g_s = 10;
var bouce_v = 0.2;

var score = 0;
var hit_ref;
var b_max = 20;
var b_min = 5;

function setup() {
  clear();
  createCanvas(500, 500, WEBGL);

  background(255);
  fill(200, 200, 200, 50);

  player = new Player();
  ball = new Ball();
  //score = new Score();
}

function draw() {

  background(255);
  //boarder
  fill(0, 0, 0, 255);
  rect(-250, -250, 500, 2);
  rect(-250, 250, 500, -2);
  rect(-250, -250, 2, 500);
  rect(250, 250, -2, -500);

  player.render();
  ball.render();
  ball.move();
  //score.render();

  if ((player.pos.x < 90)) {
    if (keyIsDown(RIGHT_ARROW)) {
      player.move_right();
    }
  }
  if ((player.pos.x > -120)) {
    if (keyIsDown(LEFT_ARROW)) {
      player.move_left();
    }
  }
}


function Score() {
  this.c = document.getElementById("myCanvas");
  this.score = 0;
  this.ctx = canvas.getContext("2d");

  this.render = function() {
    this.ctx.font = "30px Arial";
    this.ctx.fillText("word", 0, 0);
  }
}


function Player() {
  this.pos = createVector(-15, 100);

  this.move_right = function() {
    if ((this.pos.x <= 200)) {
      this.pos.add(2, 0);
    }
  }

  this.move_left = function() {
    if ((this.pos.x >= -200)) {
      this.pos.add(-2, 0);
    }
  }

  this.render = function() {
    push();
    translate(this.pos.x, 100);
    fill(0, 0, 0, 255);
    rect(this.pos.x, 100, 60, 15);
    pop();
  }
}


function Ball() {
  this.pos = createVector(0, 0);
  this.vel = createVector(random(-1, 1) * g_s, random(-1, 1) * g_s);

  this.top = true;
  this.bottom = true;
  this.right = true;
  this.left = true;
  this.player = true;

  this.move = function() {

    this.pos.add(this.vel);
      
    if ((this.pos.x >= 242) && (this.right == true)) {
      this.vel.x = (-this.vel.x) + random(-bouce_v, bouce_v);
      this.vel.y = (this.vel.y) + random(-bouce_v, bouce_v);
      this.right = false;
      this.left = this.top = this.bottom = this.player = true;
    } else if ((this.pos.x <= -242) && (this.left == true)) {
      this.vel.x = (-this.vel.x) + random(-bouce_v, bouce_v);
      this.vel.y = (this.vel.y) + random(-bouce_v, bouce_v);
      this.left = false;
      this.right = this.top = this.bottom = this.player = true;
    } else if ((this.pos.y >= 242) && (this.bottom == true)) {
      this.vel.x = (this.vel.x) + random(-bouce_v, bouce_v);
      this.vel.y = (-this.vel.y) + random(-bouce_v, bouce_v);
      this.bottom = false;
      this.left = this.top = this.right = this.player = true;
    } else if ((this.pos.y <= -242) && (this.top == true)) {
      this.vel.x = (this.vel.x) + random(-bouce_v, bouce_v);
      this.vel.y = (-this.vel.y) + random(-bouce_v, bouce_v);
      this.top = false;
      this.left = this.right = this.bottom = this.player = true;
    } else if (((this.pos.y - 190) >= 2) &&
      (this.pos.x <= (player.pos.x*2 + 60)) &&
      (this.pos.x >= (player.pos.x*2 - 2)) && 
      ((this.pos.y - 190) >= 3) && (this.player == true)) {
      hit_ref = ((player.pos.x * 2) + 58) - this.pos.x;
      this.vel.x = (this.vel.x) + random(-bouce_v, 0) * hit_ref/5;
      this.vel.y = (-this.vel.y) + random(-bouce_v, bouce_v);
      this.player = false;
      this.left = this.right = this.bottom = this.top = true;
    }

    if (sqrt(pow(this.vel.x, 2)+pow(this.vel.y, 2)) >= b_max) {
      if (this.vel.x >= 0) {
        this.vel.x -= 0.1;
      } else if (this.vel.x <= 0) {
        this.vel.x += 0.1;
      }
      if (this.vel.y >= 0) {
        this.vel.y -= 0.1;
      } else if (this.vel.y <= 0) {
        this.vel.y += 0.1;
      }
    } else if (sqrt(pow(this.vel.x, 2)+pow(this.vel.y, 2)) <= b_min) {
      if (this.vel.x >= 0) {
        this.vel.x += 0.1;
      } else if (this.vel.x <= 0) {
        this.vel.x -= 0.1;
      }
      if (this.vel.y >= 0) {
        this.vel.y += 0.1;
      } else if (this.vel.y <= 0) {
        this.vel.y -= 0.1;
      }
    }
  }

  this.render = function() {
    push();
    translate(this.pos.x, this.pos.y);
    fill(0, 0, 0, 255);
    ellipse(0, 0, 15, 15);
    pop();
  }
}
