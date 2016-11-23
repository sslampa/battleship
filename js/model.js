var n = 10; //nxn matrix
var board = makeBoard(n);
var MISS = -1;
var EMPTY = 0;
var HIT = 1;
var SHIP = 200;
var ships = [1, 1, 1, 1, 1];
var shipsLength = ships.length;

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
// function addShips(ships, board, n, shipsLength) {
//   var array = randPos(shipsLength, n);
//   var shipArray = [];
//   ships.forEach(function(item, iter) {
//     board[array[iter][0]][array[iter][1]] = SHIP;
//     shipArray.push(array[iter].join("-"));
//   });
//
//   return shipArray;
// }

// made a function to generate random positions on the board
// 0 index is our row and 1 index is our column
function randPos(shipsLength, n) {
  var positionArray = [];
  var state = false;

  for (var i = 0; i < shipsLength; i++) {
    var currentPosition =
      [Math.floor(Math.random() * n), Math.floor(Math.random() * n)];

    while (true && positionArray.length > 0) {
      for (var x = 0; x < positionArray.length; x++) {
        if (positionArray[x][0] === currentPosition[0] &&
          positionArray[x][1] === currentPosition[1]) {
            state = true;
            break;
          }
      }

      if (state) {
        currentPosition = [Math.floor(Math.random() * n),
          Math.floor(Math.random() * n)];
          state = false;
      } else {
        break;
      }
    }

    positionArray.push(currentPosition);
  }
  return positionArray;
}
