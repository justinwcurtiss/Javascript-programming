//***********************
//Flappy bird as guided by Coding Train's Coding Challenge #31
//Mess with these variable settings at your own peril. But seriously, it took a while to tweak them to feel "Right"
var pipes=[];//setting up our array to throw pipes into. more of a plumber's warehouse really.
var bird;
var highscore=0;//the high Score
var worldGravity=0.75;//how fast gravity drags you down
var worldLift=-15;//how high up you bounce. because I suck at math negative means a bigger bounce
var airResistance=0.9;//how fast you decellerate. it makes things smoother.
var birdSize=32;//Just how big is our physics friendly spherical bird?
//mucking with these will drastically alter the difficulty of the game
var minGapSize=80;//smallest gap. I reccomend no smaller than twice the bird's size.
var maxGapSize=300;//Largest gap. Up to you really. things do seem to shrink as the game goes on.
var pipeInterval=200;//what's the starting interval between pipes. I reccomend about half the canvas width.
var pipeIntervalMax=80;//Really the minimum distance between pipe spawns. This factors heavily with your max speed.
var pipeSpeed=2;//how fast the pipes are moving at the start. lower is slower
var pipeSpeedMax=5;//fastest you can go. speed limits! they exist!
var pipeWidth=40;//width of the pipes. fat pipes are more fun I say!
var pipeSpawnRate=30;//% chance to spawn a pipe, because I love randomness
var score=0;//your Score


function setup(){
  reset();
  // put setup code here
  createCanvas(400, 600);
  bird = new Bird();
  pipes.push(new Pipe());
}

//you'll have to make these value match what you set up there in the global stuff.
function reset(){
  minGapSize=80;
  maxGapSize=300;
  pipes=[];
  pipeInterval=200;
  pipeSpeed=2;
  pipeIntervalMax=80;
  pipeSpeedMax=5;
  score=0;
  pipeSpawnRate=30;

}

function draw(){
	background(0);
  bird.show();
  bird.update();

  //console.log(pipeInterval);
  //Spawn a new pipe once the right most pipe has moved
  //as far as the pipeInterval allows it. Also has a 10%
  //chance not to create a pipe
  //console.log(dropChance);
  var lastpipe=floor(width-pipes[pipes.length-1].x);
  if (lastpipe >=pipeInterval){
    pipes.push(new Pipe());
    if (random(100)>=pipeSpawnRate){
      pipes[pipes.length-1].x +=pipeInterval ;//doubles the gap on the next pipe causing a delay
    }
    maxGapSize -= 2;
    if (maxGapSize < minGapSize){
      maxGapSize=minGapSize;
    }
  }

  for (var i=pipes.length-1; i >= 0; i--){
    pipes[i].show();
    pipes[i].update();
    if (pipes[i].offscreen()){
      pipes.splice(i,1);
      //slowly speed it up and make the distance between pipes shorter
      pipeSpeed *=1.01;
      pipeInterval -=2;
      pipeSpawnRate ++;
      if (pipeInterval < pipeIntervalMax){
        pipeInterval = pipeIntervalMax;
      }
      if (pipeSpeed > pipeSpeedMax){
        pipeSpeed = pipeSpeedMax;
      }

    }

    if (pipes[i].hits(bird)){
      //console.log("hit");
      if (score>highscore){
        highscore=score;
      }
      setup();
    }
  }
  //Highscore stuff. not as epic as the chrome dino-jump me thinks
  stroke(0);
  strokeWeight(4);
  fill(255);
  text("High Score: "+highscore, 0, 10);
  text("Your Score: "+score, 0, 22);
  score ++;
}


function keyPressed(){
  if (key==' '){
    bird.up();
    // flapcount ++;

  }
}
