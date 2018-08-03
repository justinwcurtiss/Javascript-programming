
function nextGeneration(){
  generation ++;
  calculateFitness();
  for (let i=0; i<TOTAL; i++){
    birds[i]= pickOne();
  }
  deadBirds=[];
}

function pickOne(){
  let bird=poolSelection();
  let child = new Bird(bird.brain);
  return child;
}

function calculateFitness(){
  let sum=0;
  for (let i=0; i < deadBirds.length; i++){
    sum += deadBirds[i].score;
  }
  //console.log(sum);
  for (let i=0; i < deadBirds.length; i++){
    deadBirds[i].fitness = deadBirds[i].score/sum;
  }
}

function poolSelection() {
  //console.log(pickings)
  let index = 0;
  let r = random(1);
  while (r > 0) {
    r -= deadBirds[index].fitness;
    index ++;
  }
  index --;
  return deadBirds[index];
}
