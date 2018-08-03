var attackLevel = 1.0;
var releaseLevel = 0;
var attackTime = 0.001;
var decayTime = 0.2;
var susPercent = 0.2;
var releaseTime = 0.5;


let numbers = [];
let count = 0;
let sequence = [];
let index = 0;
let arcs = [];
let biggest = 0;
let osc

class Arc {
  constructor(start, end, dir) {
    this.start = start;
    this.end = end;
    this.dir = dir;
  }

  show() {
    let diameter = abs(this.end - this.start);
    let x = (this.end + this.start) / 2;
    stroke(255);
    strokeWeight(0.5);
    noFill();
    if (this.dir == 0) {
      arc(x, 0, diameter, diameter, PI, 0);
    } else {
      arc(x, 0, diameter, diameter, 0, PI);
    }
  }
}

function setup() {
  // put setup code here
  env = new p5.Env();
  env.setADSR(attackTime, decayTime, susPercent, releaseTime);
  env.setRange(attackLevel, releaseLevel);
  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.amp(0.5);
  osc.start();
  //env.play();

  createCanvas(800, 400);
  numbers[index] = true;
}

function step() {
  //THE sequence. try to go back an amount by our current count. If we can't,
  //then we go forward instead.
  let next = index - count;
  if (next < 0 || numbers[next]) {
    next = index + count;
  }
  numbers[next] = true;
  sequence.push(next); //record what number we landed on

  let a = new Arc(index, next, count % 2);
  //console.log(count % 2);
  arcs.push(a);

  index = next; //move the index along
  count++; //increase our counting of the integers
  if (index > biggest) {
    biggest = index;
  }
  let freq = 0;
  let note = index % 12;
  if (note % 12 != 2 || 5 || 7 || 10 || 12) { //C Minor. Because Emo McSobbypants says so.
    // if (note % 12 != (2 || 4 || 7 || 9 || 11)) { //C Major super happy sounds
    // if (note % 12 != (2 || 3 || 5 || 7 || 9 || 10 || 12)) { //C Minor Pentatonic w/ flat 5 "blues scale"
    freq = floor(random(2, 3)) * (pow(2, ((note) - 49) / 12) * (1760)); //randomly spread it out between some octaves octaves
  } else {
    freq = pow(2, (-48 / 12)) * 1760; //if the note isn't on the scale, return the root of the scale
  }
  //console.log(index, freq);
  osc.amp((index % 10) / 20);
  osc.freq(freq);
  env.play();
}

function draw() {
  if (count % 2 == 0) { //this will swing the notes. Jazz hands! yeah!
    frameRate(8); //8 notes per second-ish.
  } else {
    frameRate(4); //4 notes per second-ish
  }
  step();
  translate(0, height / 2);
  scale(width / (biggest));
  background(0);
  for (let a of arcs) {
    a.show();
  }
  //console.log(index);
}