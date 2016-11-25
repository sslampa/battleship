var n = 10; //nxn matrix
var board = makeBoard(n);
var MISS = -1;
var EMPTY = 0;
var HIT = 1;
var SHIP = 200;
var ships = [5, 4, 3, 2, 1];
var numShips = ships.length;
var counter = 25;

//check wheather you win or lose and check weather you have run out of missiles
function checkWin(shipArray) {
  if (shipArray.length === 0 && counter > 0) {
    return 1;
  } else if (counter === 0){
    return 0;
  }
}

//Check for hit or miss at position
function checkHitOrMiss(idAtPos, shipArray) {
  //check if it is included in our ship position array
  //if it is in ship array, it is a hit => true
  //else, it is a miss=> false
  if (shipArray.includes(idAtPos)) {
    console.log(shipArray.splice(shipArray.indexOf(idAtPos), 1));
    return true;
  } else {
    return false;
  }
}

//This updates your missile count
function missileCheck() {
  counter--;
  return counter;
}

//Creates empty board
function makeBoard(n) {

  //empty board to be returned
  var newBoard = []

  //Iterating through the n number of rows
  for (var iter = 0; iter < n; iter++) {
    //temporary array that will push empty values to newBoard
    var emptyArray = [];

    //Iterates through the n number of columns
    for (var i = 0; i < n; i++) {
      emptyArray.push(0);
    }

    newBoard.push(emptyArray);
  }

  return newBoard;
}

//Generates ships at random positions on the board
function addShips(ships, board, n, numShips) {
  //Gets and sets position for the number of ships
  var array = randPos(numShips, n, ships);
  //console.log(array);
  //Holds the updated indexes for ship placement
  var shipArray = [];

  //Takes the values of each ship and gives the value of SHIP(200) at
  //that board locattion.
  array.forEach(function(item, iter) {
    //Changes the board at board[row][col] for SHIP(200)
    board[array[iter][0]][array[iter][1]] = SHIP;
    //Changes the indexes to better match the IDs for each td
    shipArray.push(array[iter].join("-"));
  });

  console.log(shipArray);
  return shipArray;
}

//Function that generates random positions on the board
function randPos(numShips, n, ships) {
  var toAdd = 0;
  var trash = [];
  var currentPosition;
  //var prevPosition = [-1, -1];
  var currentArray = [];
  //Holds values for the random positions of ships
  var positionArray = [];

  //Get position for each ship and make sure they do not overlap
  for (var i = 0; i < numShips; i++) {
    while (true) {
      currentPosition = [Math.floor(Math.random() * n), Math.floor(Math.random() * n)];

      if (((currentPosition[0] + ships[i]) <= n) && !trash.includes(currentPosition.join("-"))) {
        toAdd = 0;
        for (var x = 0; x < ships[i]; x++) {
          currentArray.push([currentPosition[0] + toAdd, currentPosition[1]]);
          toAdd += 1;
        }

        if (checkDiag(currentArray, positionArray) ||
            checkHori(currentArray, positionArray) ||
            checkVert(currentArray, positionArray)) {
              trash.push(currentPosition.join("-"));
              currentArray = [];
        } else {
          for (var iter = 0; iter < currentArray.length; iter++) {
            positionArray.push(currentArray[iter]);
          }
          currentArray = [];
          trash = [];
          break;
        }
      } else {
        trash.push(currentPosition.join("-"));
        currentArray = [];
      }
    }


  }
  console.log(positionArray);
  return positionArray;
}

function checkHori(curArray, posArray) {
  for (var iter = 0; iter < curArray.length; iter++) {
    for (var i = 0; i < posArray.length; i++) {
    //console.log("Current: " + curArray[iter]);
    //console.log("In array: " + posArray[i]);
      if (posArray[i][0] === curArray[iter][0] &&
         (posArray[i][1] === curArray[iter][1] + 1 ||
          posArray[i][1] === curArray[iter][1] - 1 ||
          posArray[i][1] === curArray[iter][1])) {
            return true;
      }
    }
  }

  return false;
}

function checkVert(curArray, posArray) {
  for (var iter = 0; iter < curArray.length; iter++) {
    for (var i = 0; i < posArray.length; i++) {
      //console.log("Current: " + curArray[iter]);
      //console.log("In array: " + posArray[i]);
      if (posArray[i][1] === curArray[iter][1] &&
         (posArray[i][0] === curArray[iter][0] + 1 ||
          posArray[i][0] === curArray[iter][0] - 1 ||
          posArray[i][0] === curArray[iter][0])) {
            return true;
      }
    }
  }

  return false;
}

function checkDiag(curArray, posArray) {
  for (var iter = 0; iter < curArray.length; iter++) {
    for (var i = 0; i < posArray.length; i++) {
      //console.log("Current: " + curArray[iter]);
      //console.log("In array: " + posArray[i]);
      if (
        ((posArray[i][0] === curArray[iter][0] + 1) && (posArray[i][1] === curArray[iter][1] - 1)) ||
        ((posArray[i][0] === curArray[iter][0] - 1) && (posArray[i][1] === curArray[iter][1] + 1)) ||
        ((posArray[i][0] === curArray[iter][0] - 1) && (posArray[i][1] === curArray[iter][1] - 1)) ||
        ((posArray[i][0] === curArray[iter][0] + 1) && (posArray[i][1] === curArray[iter][1] + 1))
        ) {
          return true;
      }
    }
  }

  return false;
}
// function checkHori(prev, curr, posArray) {
//   var currRow = curr[0];
//   var currCol = curr[1];
//   var prevRow = prev[0];
//   var prevCol = prev[1];
//
//   for (var iter = 0; iter < posArray.length; iter++) {
//     if ((posArray[iter][0] === currRow) &&
//        (((posArray[iter][1] === currCol + 1) && (posArray[iter][1] !== prevCol)) || ((posArray[iter][1] === currCol - 1)) && (posArray[iter][1] !== prevCol))) {
//         return true;
//       }
//   }
//
//   return false;
// }
//
// //checkHori([1, 0], [1, 1], [[2, 1], [0, 1], [1, 0], [1, 2]]);
//
// function checkVert(prev, curr, posArray) {
//   var currRow = curr[0];
//   var currCol = curr[1];
//   var prevRow = prev[0];
//   var prevCol = prev[1];
//
//     for (var iter = 0; iter < posArray.length; iter++) {
//       if ((posArray[iter][1] === currCol) &&
//          (((posArray[iter][0] === currRow + 1) && (posArray[iter][0] !== prevRow)) || ((posArray[iter][0] === currRow - 1)) && (posArray[iter][0] !== prevRow))) {
//           return true;
//       }
//   }
//
//   return false;
// }
//
// //checkVert([0,1], [1, 1], [[0,1], [1, 2]]); //[2,1], [0,1]
//
// function checkDiag(curr, posArray) {
//   var currRow = curr[0];
//   var currCol = curr[1];
//
//   for (var iter = 0; iter < posArray.length; iter++) {
//     if (
//       ((posArray[iter][0] === currRow + 1) && (posArray[iter][1] === currCol - 1)) ||
//       ((posArray[iter][0] === currRow - 1) && (posArray[iter][1] === currCol + 1)) ||
//       ((posArray[iter][0] === currRow - 1) && (posArray[iter][1] === currCol - 1)) ||
//       ((posArray[iter][0] === currRow + 1) && (posArray[iter][1] === currCol + 1))
//       ) {
//       return true;
//       }
//   }
//
//   return false;
// }
