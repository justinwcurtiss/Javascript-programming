function Particle(x, y) {
  this.pos = createVector(x, y);
  this.prev = createVector(x, y);
  this.vel = p5.Vector.random2D();
  this.vel.setMag(random(1));
  this.acc = createVector();

  this.update = function() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
    // if (this.pos.x >= width || this.pos.x <= 0) {
    //   this.vel.x *= -1;
    // }
    // if (this.pos.y >= height || this.pos.y <= 0) {
    //   this.vel.y *= -1;
    // }
  }

  this.show = function() {
    stroke(count % 255 + 75, (count + 85) % 255 + 75, (count + 170) % 255 + 75, 10); //colorful strokes
    // stroke(255, 5); //boring strokes
    strokeWeight(1);
    line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);
    //point(this.pos.x, this.pos.y);
    this.prev.x = this.pos.x;
    this.prev.y = this.pos.y;
  }

  this.attracted = function(target) {
    var force = p5.Vector.sub(target, this.pos);
    var dsquared = force.magSq();
    //dsquared = constrain(dsquared, 5, 5000);
    var strength = G / dsquared;
    force.setMag(strength);
    this.acc.add(force);
  }
}