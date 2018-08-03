function mutate(x) {
  if (random(1) < mutationRate) {
    let offset = randomGaussian() * 0.5;
    let newx = x + offset;
    return newx;
  } else {
    return x;
  }
}


class Bird {
  constructor(brain) {
    this.y = height / 2;
    this.x = 64;
    this.gravity = worldGravity;
    this.lift = worldLift;
    this.velocity = 0;
    if (brain instanceof NeuralNetwork) {
      this.brain = brain.copy();
      this.brain.mutate(mutate);
      //console.log(mutate);
    } else {
      this.brain = new NeuralNetwork(8, 12, 2);
    }
    this.score=0;
    this.fitness=0;
  }

  up() {
    this.velocity += this.lift;
  }

  show() {
    stroke(255);
    strokeWeight(1);
    fill(255, 100);
    ellipse(this.x, this.y, birdSize, birdSize);
  }

  think(pipes) {
    //using a loop to check for the closest pipe. More elegant than my
    //hard-coding the distance between the bird and the next pipe
    let closest = null;//the closest pipe
    let next = null;//next closest pipe
    let closestD = Infinity;
    for (let i = 0; i < pipes.length; i++) {
      let d = pipes[i].x + pipeWidth/2 - this.x;
      if (d < closestD && d > 0) {
        closest = pipes[i];
        if(pipes.length > 2){
          next=pipes[i+1];
        }
        closestD = d;
      }
    }
    //Here's where we give the neural net it's inputs. I think some of the More
    //advanced difficulties could be done if the bird looked 2 pipes ahead
    //instead of just 1.
    let inputs = [];
    inputs[0] = this.y / height;
    inputs[1] = closest.top / height;
    inputs[2] = closest.bottom / height;
    inputs[3] = closest.x / width;
    if(pipes.length > 2){
      inputs[4] = next.top / height;
      inputs[5] = next.bottom / height;
      inputs[6] = next.x / width;
    } else {
      inputs[4] = 0;
      inputs[5] = 0;
      inputs[6] = 0;
    }
    inputs[7] = this.velocity/worldLift;
    let output = this.brain.predict(inputs);
    if (output[0] > output[1] && this.velocity >=0) {
      this.up();
    }
  }

  offScreen(){
    if (this.y >= height - birdSize || this.y <= birdSize){
      return true;
    }
  }

  update() {
    this.y += this.velocity;
    this.velocity += this.gravity;
    this.velocity *= airResistance;
    this.score ++;

  }
}
