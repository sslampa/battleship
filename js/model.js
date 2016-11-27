var n = 10; //nxn matrix
var board = makeBoard(n);
var MISS = -1;
var EMPTY = 0;
var HIT = 1;
var SHIP = 200;
var ships = [5, 4, 4, 3, 3, 2, 2, 1];
var numShips = ships.length;
var counter = 50;

//check wheather you win or lose and check weather you have run out of missiles
function checkWin(shipArray) {
  if (shipArray.length === 0 && counter >= 0) {
    return true;
  }
}

//Check for hit or miss at position
function checkHitOrMiss(idAtPos, shipArray) {
  //check if it is included in our ship position array
  //if it is in ship array, it is a hit => true
  //else, it is a miss=> false
  if (shipArray.includes(idAtPos)) {
    shipArray.splice(shipArray.indexOf(idAtPos), 1);
    return true;
  } else {
    return false;
  }
}

//Remove and check if that ship has been sank
function checkShipStatus(indShips, classAtPos, copyShips, ships) {
  for (var x = 0; x < indShips.length; x++) {
    if (indShips[x].includes(classAtPos)) {
      indShips[x].splice(indShips[x].indexOf(classAtPos), 1);

      if (indShips[x].length === 0) {
        copyShips.splice(copyShips.indexOf(ships[x]), 1);
        return [true, x, copyShips];
      }
    }
  }
  return [false, -1, copyShips];
}

//This updates your missile count
function missileCheck() {
  console.log(counter);
  return counter--;
}

//Creates empty board
function makeBoard(n) {

  //empty board to be returned
  var newBoard = [];

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

function createPackage(ships, numShips, n, shipArray) {
  var tempArray = [];
  var packaged = [];
  var copyArray = shipArray.slice();

  for (var x = 0; x < numShips; x++) {
    for (var i = 0; i < ships[x]; i++) {
      tempArray.push(copyArray.splice(0, 1)[0]);
    }

    packaged.push(tempArray);
    tempArray = [];
  }

  return packaged;
}

//Generates ships at random positions on the board
function addShips(ships, board, n, numShips) {
  //Gets and sets position for the number of ships
  var array = randPos(numShips, n, ships);
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

  return shipArray;
}

//Function that generates random positions on the board
function randPos(numShips, n, ships) {
  var toAdd = 0;
  var direction = Math.round(Math.random());
  var trash = [];
  var currentPosition;
  var currentArray = [];
  var positionArray = [];

  //Get position for each ship and make sure they do not overlap
  for (var i = 0; i < numShips; i++) {
    while (true) {
      currentPosition = [Math.floor(Math.random() * n), Math.floor(Math.random() * n)];

      if (((currentPosition[direction] + ships[i]) <= n) && !trash.includes(currentPosition.join("-"))) {
        toAdd = 0;
        for (var x = 0; x < ships[i]; x++) {
          if (direction === 0) {
            currentArray.push([currentPosition[0] + toAdd, currentPosition[1]]);
            toAdd++;
          } else {
            currentArray.push([currentPosition[0], currentPosition[1] + toAdd]);
            toAdd++;
          }
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
          //trash = [];
          direction = (direction === 0) ? 1 : 0;

          break;
        }
      } else {
        trash.push(currentPosition.join("-"));
        currentArray = [];
      }
    }


  }
  return positionArray;
}

function checkHori(curArray, posArray) {
  for (var iter = 0; iter < curArray.length; iter++) {
    for (var i = 0; i < posArray.length; i++) {
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
