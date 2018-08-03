
function Pipe(){
  //here's a clunky way to create a gap of random size at a random
  //height on the pipe. "I'ts not stupid if it works."
  var gap=random(minGapSize, maxGapSize);
  var gapLocation=random(gap, height - gap)
  this.top=gapLocation-(gap/2);
  this.bottom=height-gapLocation-(gap/2);

  this.x=width;
  this.w=pipeWidth;
  this.speed=pipeSpeed;
  this.highlight=false;

  this.hits = function(bird){
    if (bird.y - birdSize/2 < this.top || bird.y > height - birdSize/2 - this.bottom){
        if (bird.x > this.x && bird.x < this.x + this.w){
          this.highlight=true;
          return true;
        }
    }
    this.highlight=false;
    return false;
  }

  this.show = function() {
    fill(0,255,0);
    rect(this.x,0,this.w,this.top);
    rect(this.x,height-this.bottom, this.w, this.bottom);
  }
  this.offscreen=function(){
    return this.x < -this.w;
  }
  this.update=function(){
    this.x -= this.speed;

  }
}
