let scale = 30; //how many pixels from the center of our hexagon to a point.
let grid = []; //This is where we will store all the hexagon tiles we generate in the grid.
let emptyEdges = [false, false, false, false, false, false]; //Because I'm uncomfortable dealing with a nullset right now


function setup() {
  createCanvas(900, 900);
  background(0);
  // for (var i = -floor((width / scale) / 1.5); i < floor((width / scale) / 1.5); i++) {
  //   for (var j = -floor(height / scale); j < floor((height / scale) / 2); j++) {
  for (var i = -2; i <= 2; i++) {
    for (var j = -2; j <= 2; j++) {

      let randomEdges = [floor(random(2)), floor(random(2)), 1, floor(random(2)), floor(random(2)), 1]; //create some random edges, for testing only. maybe.
      //let altEdges = [true, true, true, true, false, true]; //alternating edges
      grid.push(new Hexagon(i, j, randomEdges, "Blank")); //create a bunch of new, blank hexagons at i,j in hexcoordinates
    }
  }
  //console.log(grid);
  //grid.push(new Hexagon(0, 0, randomEdges, "Blank")); //create a bunch of new, blank hexagons at i,j in hexcoordinates

  for (let i = 0; i < grid.length; i++) {
    hexEdgeCompare(i);
  }
  for (let i = 0; i < grid.length; i++) {
    drawHex(i, grid[i].cx + width / 2, grid[i].cy + height / 2); //the height and width stuff is to make 0,0 at the center of the screen
    stroke(255);
    strokeWeight(4);
    textAlign(CENTER, CENTER);
    text(grid[i].hx + "," + grid[i].hy, grid[i].cx + width / 2, grid[i].cy + height / 2); // displaying the hex coordinates in the middle of each hex. the height and width stuff is to make 0,0 at the center of the screen
  }
  //console.log(grid[930]);
  //console.log(grid[975]);

}


function draw() {
  stroke(255);
  strokeWeight(4);



  // put drawing code here
}