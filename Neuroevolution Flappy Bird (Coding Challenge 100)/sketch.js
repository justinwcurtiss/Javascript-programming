//***********************
//Flappy bird as guided by Coding Train's Coding Challenge #31
//Mess with these variable settings at your own peril. But seriously, it took a while to tweak them to feel "Right"
var pipes = []; //setting up our array to throw pipes into. more of a plumber's warehouse really.
var birds = [];//A bird cage really. this is where we shove all the birds.
var champ = [];//the champ's roosting place.
var deadBirds=[];//our pile of birds that die when they hit things. yum!
var generation=1;//how we keep track of what the current generation is.
var mutationRate=0.05;//chance of mutating a gene.
const TOTAL = 400;//Size of our flock
let slider;//lets make a slider to muck with the cycles
var highscore = 0; //the high Score
var worldGravity = 1.1; //how fast gravity drags you down
var worldLift = -20; //how high up you bounce. because I suck at math negative means a bigger bounce
var airResistance = 0.9; //how fast you decellerate. it makes things smoother.
var birdSize = 24; //Just how big is our physics friendly spherical bird?
//mucking with these will drastically alter the difficulty of the game
var minGapSize = 80; //smallest gap. I reccomend no smaller than twice the bird's size.
var maxGapSize = 300; //Largest gap. Up to you really. things do seem to shrink as the game goes on.
var pipeInterval = 300; //what's the starting interval between pipes. I reccomend about half the canvas width.
var pipeIntervalMax = 175; //Really the minimum distance between pipe spawns. This factors heavily with your max speed.
var pipeSpeed = 3; //how fast the pipes are moving at the start. lower is slower
var pipeSpeedMax = 5; //fastest you can go. speed limits! they exist!
var pipeWidth = 20; //width of the pipes. fat pipes are more fun I say!
var pipeSpawnRate = 30; //% chance to spawn a pipe, because I love randomness
var score = 0; //your Score

function setup() {
  slider=createSlider(1,100,1);
  reset();
  for (let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }
  // put setup code here

  //console.log("setup");
}
//resets stuff between games
function reset(){
  minGapSize=80;
  maxGapSize=300;
  pipes=[];
  pipeInterval=300;
  pipeSpeed=3;
  pipeIntervalMax=175;
  pipeSpeedMax=5;
  score=0;
  pipeSpawnRate=30;
  createCanvas(400, 600);
  pipes.push(new Pipe());

}

function draw() {
  //we're going to do all the calculations in an adjustable loop.
  //this way we can just do a slider cruise for time-warp.
  for (let n=0; n<slider.value(); n++){
      score ++;
    for (let bird of birds) {
      bird.update();
      bird.think(pipes);
    }
    if(birds.length===0){
      nextGeneration();
      reset();
    }
    for (var i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
      //console.log("pipes update");
      for (var j = birds.length - 1; j >= 0; j--) {
        if (pipes[i].hits(birds[j])) {
          //console.log("hit");
          if (score > highscore) {
            highscore = score;
            champ=birds[j];//lets crown a champ!
          }
          deadBirds.push(birds.splice(j, 1)[0]);
        }
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
        //slowly speed it up and make the distance between pipes shorter
        pipeSpeed *= 1.01;
        pipeInterval -= 2;
        pipeSpawnRate++;
      }
    }
    //Spawn a new pipe once the right most pipe has moved
    //as far as the pipeInterval allows it. Also has a %
    //chance not to create a pipe
    //console.log(dropChance);
    var lastpipe = floor(width - pipes[pipes.length - 1].x);
    if (lastpipe >= pipeInterval) {
      pipes.push(new Pipe());
      if (random(100) >= pipeSpawnRate) {
        pipes[pipes.length - 1].x += pipeInterval; //doubles the gap on the next pipe causing a delay
      }
      maxGapSize -= 2;
      if (maxGapSize < minGapSize) {
        maxGapSize = minGapSize;
      }
    }
  }
  //do all our drawing at the end
  background(0);
  for (let bird of birds){
    bird.show();
  }
  for (let pipe of pipes){
    pipe.show();
  }
  stroke(0);
  strokeWeight(4);
  fill(255);
  text("High Score: "+ highscore, 0, 10);
  text("Current Score: "+ score, 0, 22);
  text("Generation #"+generation, 0, 34);
}
