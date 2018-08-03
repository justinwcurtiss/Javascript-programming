//convert a set of hex coordinates into cartesean coordinates
let sqthree = 1.73205; //squareroot of three.

function hexToCartX(hx) {
  return (sqthree * hx);
}
//I'm too newb to figure out how to parse back both cx and cy in a single function :(
function hexToCartY(hx, hy) {
  return (hx + sqthree * hy * 1.15); //No clue why the 1.15 fixes an off-center problem with my hex drawing. probably because I suck at math.
}
//calculating distance in number of hexes between two hex hexcoordinates
//Counting distance = the largest of the absolute values of the following 3:
//difference along x axis, difference along y axis, or the sum of the difference on x and the difference on y
//Depending on how you define your (hx,hy) relative to your cartesean x,y, instead of a sum between dx and dy it may be a subtraction
function hexDist(x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  let dd = dx + dy;
  //console.log(dx + "," + dy + "," + dd);
  if (abs(dd) > (abs(dx) && abs(dy))) { //lets check to see if the difference between the two differences is the biggest
    return abs(dd);
  } else if (abs(dy) > abs(dx)) { //the difference of the difference wasn't it so lets see if the y difference is bigger than x difference
    return abs(dy);
  } else {
    return abs(dx); //well damn, looks like none of the other two option were the biggest which leaves only the x difference being correct.
  }
}

//this finds the index in the grid array for a given hex coordinate
function findHex(x, y) {
  for (let i = 0; i < grid.length; i++) {
    if (grid[i].hx == x && grid[i].hy == y) {
      return i;
    }
  }
}


//rotate the value of the edges of the hex in the grid array at index 'hex'
function hexRotate(hex) {
  let temp = [];
  temp[0] = grid[hex].edges[5]; //map the last item in the edges array to the first index in temp
  for (i = 0; i < 5; i++) {
    temp[i + 1] = grid[hex].edges[i]; //map the rest of the array into 1 index higher in temp
  }
  //console.log(temp);
  return grid[hex].edges = temp; //set the edges array to our newly rotated array
}

//Compare the value of the edges of a given hex in the grid with those of its neighbors to see if they have the same true/false values
function hexEdgeCompare(hex) { //hex is the index being passed to us from the grid array telling us which hex in the grid array we want to look at.
  // find the indexes for each of the neighbors.
  let ne = findHex(grid[hex].hx + 1, grid[hex].hy - 1);
  let no = findHex(grid[hex].hx, grid[hex].hy + 1);
  let nw = findHex(grid[hex].hx - 1, grid[hex].hy);
  let sw = findHex(grid[hex].hx - 1, grid[hex].hy + 1);
  let so = findHex(grid[hex].hx, grid[hex].hy - 1);
  let se = findHex(grid[hex].hx + 1, grid[hex].hy);
  //console.log(grid[hex]);
  //the undefined check is to ensure we only count borders that are shared between edges. this should only
  //effect the outer most hexes on our grid

  if (grid[ne] != undefined && (grid[hex].edges[0] == 1 && grid[ne].edges[3] == 1)) {
    grid[hex].matching[0] = true;
  }
  if (grid[no] != undefined && (grid[hex].edges[1] == 1 && grid[no].edges[4] == 1)) {
    grid[hex].matching[1] = true;
  }
  if (grid[nw] != undefined && (grid[hex].edges[2] == 1 && grid[nw].edges[5] == 1)) {
    grid[hex].matching[2] = true;
  }
  if (grid[sw] != undefined && (grid[hex].edges[3] == 1 && grid[sw].edges[0] == 1)) {
    grid[hex].matching[3] = true;
  }
  if (grid[so] != undefined && (grid[hex].edges[4] == 1 && grid[so].edges[1] == 1)) { //this isn't evaluating correctly
    grid[hex].matching[4] = true;
  }
  if (grid[se] != undefined && (grid[hex].edges[5] == 1 && grid[se].edges[2] == 1)) {
    grid[hex].matching[5] = true;
  }
}