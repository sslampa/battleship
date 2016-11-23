var n = 10; //nxn matrix
var board = makeBoard(n);
var MISS = -1;
var EMPTY = 0;
var HIT = 1;
var SHIP = 200;

//Creates empty board
function makeBoard(n) {
  var newBoard = [] //empty board to be returned

  for (var iter = 0; iter < n; iter++) {
    var emptyArray = []; //temporary array that holds values

    for (var i = 0; i < n; i++) {
      emptyArray.push(0);
    }

    newBoard.push(emptyArray);
  }

  return newBoard;
}

//Generates ships at random positions on the board
function addShips(ships, board, n) {
  var array = [];
  board.forEach(function() {
    var place = randPos(n);
    board[place[0]][place[1]] = SHIP;
    array.push(place.join("-"));
  });

  return array;
}

// made a function to generate random positions on the board
// 0 index is our row and 1 index is our column
function randPos(n) {
  return [Math.floor(Math.random() * n), Math.floor(Math.random() * n)];
}
