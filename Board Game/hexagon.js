//Here we draw a hexagon given it's x,y, in cartesian coordinates. also takes its grid index "hex" for messing with border drawing.
function drawHex(hex, x, y) {
  strokeWeight(4);
  stroke(255);
  //console.log(grid[hex]);
  for (let i = 0; i <= 5; i++) { //cycle through all six points on the hexagon. Still no clue why I need to add in the 1.15 to fix my centering. WTF math.
    //console.log(grid[hex]);
    //console.log(grid[hex].matching[i]);
    if (grid[hex].matching[i] == 1) { //lets draw in different colors based on the true/false value of the edge.
      stroke(0, 255, 0, 150);
      //console.log("It should say ''true'' above this line");
    }
    if (grid[hex].matching[i] == 0) {
      stroke(255, 0, 0, 150);
      //console.log("it should say ''false'' above this line");
    }
    let px1 = x + scale * cos(-i * PI / 3) * 1.15;
    let py1 = y + scale * sin(-i * PI / 3) * 1.15; //It took me 9 hours to figure out I was going the wrong direction when drawing this damned thing
    let px2 = x + scale * cos(-(i + 1) * PI / 3) * 1.15;
    let py2 = y + scale * sin(-(i + 1) * PI / 3) * 1.15; //It took me 9 hours to figure out I was going the wrong direction when drawing this damned thing.
    line(px1, py1, px2, py2);
    //console.log(i);
    //console.log(px1, py1, px2, px2);
  }
  //console.log(grid[hex].matching);

}

class Hexagon {
  constructor(hx, hy, edges, name) {
    this.hx = hx; //hexagonical coordinates given as a "Slanted" version of cartesian coordinates
    this.hy = hy; //Same as above
    this.cx = scale * hexToCartX(hx); //This is where the actual cartesian coordinates of a hexagon tile are
    this.cy = scale * hexToCartY(hx, hy); //Same as above
    this.edges = edges; //Here we're storing the properties of whether an edge is "open". index 0 is northeast and we rotate counter clockwise
    this.matching = [false, false, false, false, false, false]; //at some point we're going to compare our set edges with our neighbor's, we want to see which of them actually match up.
    this.name = name; //the Name of a tile for when we start creating different kinds of tiles. Rule sets will be extrapolated from the name in a function somewhere. A "Blank" tile is still a tile
  }
}