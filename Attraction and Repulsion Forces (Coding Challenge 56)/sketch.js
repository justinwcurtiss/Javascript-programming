var attractor;
var G = 40;
var particles = [];
var attractors = [];
var count = 0;

function setup() {
  createCanvas(800, 800);
  for (var i = 0; i < 300; i++) {
    particles.push(new Particle(400, 400));
  }
  // for (var i = 0; i < 3; i++) {
  //   attractors.push(createVector(random(width), random(height)));
  // }
  background(0);
}

function mousePressed() {
  attractors.push(createVector(mouseX, mouseY));
}

function draw() {
  //background(0);
  count++;
  stroke(255, 5);
  strokeWeight(3);
  for (var i = 0; i < attractors.length; i++) {
    stroke(0, 255, 0);
    point(attractors[i].x, attractors[i].y);
  }
  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i];
    particle.update();
    particle.show();
    for (var j = 0; j < attractors.length; j++) {
      particle.attracted(attractors[j]);
    }
  }
}