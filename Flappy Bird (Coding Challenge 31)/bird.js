function Bird() {

  this.y = height/2;
  this.x = 64;
  this.gravity = worldGravity;
  this.lift = worldLift
  this.velocity = 0;

  this.up = function(){
    this.velocity += this.lift;
  }

  this.show = function(){
    fill(255);
    ellipse(this.x, this.y, birdSize, birdSize);
  }

  this.update = function(){
    this.y += this.velocity;
    this.velocity += this.gravity;
    this.velocity *= airResistance;

    if (this.y > height - birdSize/2) {
      this.y = height - birdSize/2;
      this.velocity=0;
    }

    if (this.y < birdSize/2){
      this.y = birdSize/2;
      this.velocity=0;
    }
  }
}
