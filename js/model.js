var MISS = -1;
var EMPTY = 0;
var HIT = 1;
var SHIP = 200;
var n = 10; //nxn matrix
var board = makeBoard(n);
var ships = [5, 4, 4, 3, 3, 2, 2, 1];
var numShips = ships.length;
var counter = 50;

//Check for win or loss
function checkWin(shipArray) {

  if (shipArray.length === 0) {
    return true;
  }

} //End checkWin

//Check for hit or miss at position
/*
** Check if id is included in ship position array
** If id is in ship array, it is a hit => true
** Else, it is a miss => false
*/
function checkHitOrMiss(idAtPos, shipArray) {

  if (shipArray.includes(idAtPos)) {
    shipArray.splice(shipArray.indexOf(idAtPos), 1);
    return true;
  } else {
    return false;
  }

} //End checkHitOrMiss

/*
** Remove and check if that ship has been sank
** ([Array], String, [Array], [Array]) => [Boolean, Number, [Array]]
** The first returned value true/false if an entire ship has been sunk
** The second returned value is the index of the length of the sunk ship
** The third returned value is the updated array of ships
*/
function checkShipStatus(indShips, idAtPos, copyShips, ships) {

  for (var x = 0; x < indShips.length; x++) {

    //Looks for the ship position and removes it from indShips array
    if (indShips[x].includes(idAtPos)) {
      indShips[x].splice(indShips[x].indexOf(idAtPos), 1);

      //If after removing the ship returns an empty array, then return true
      if (indShips[x].length === 0) {
        copyShips.splice(copyShips.indexOf(ships[x]), 1);
        return [true, x, copyShips];
      }
    }
  }

  return [false, -1, copyShips];

} //End checkShipStatus

//Counts down missile count
function missileCheck() {

  return counter--;

} //End missileCheck

//Creates empty board
function makeBoard(n) {

  //Empty board array to be returned
  var newBoard = [];
  var emptyArray = [];

  for (var iter = 0; iter < n; iter++) {

    emptyArray = [];
    for (var i = 0; i < n; i++) {
      emptyArray.push(0);
    }

    newBoard.push(emptyArray);
  }

  return newBoard;

}

//Packages into correct ship sizes
function createPackage(ships, numShips, n, shipArray) {
  var tempArray = [];
  var packaged = [];

  //Creates hard copy of shipArray to avoid overwriting
  var copyArray = shipArray.slice();

  //Iterates through and places them into correct ship group
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

/*
** Generates random positions on the board
** Uses checks for whether ship will fit and if there are surrounding ships
*/
function randPos(numShips, n, ships) {
  var toAdd = 0;
  var direction = Math.round(Math.random()); //Orients ships randomly
  var trash = [];
  var currentPosition;
  var currentArray = [];
  var positionArray = [];

  //Get position for each ship and make sure they do not overlap
  for (var i = 0; i < numShips; i++) {

    while (true) {

      //Holds current position in array in form of [rows, columns]
      currentPosition =
        [Math.floor(Math.random() * n), Math.floor(Math.random() * n)];

      /*
      ** Checks if ship length fits within game board and is not included in
      ** failed(trash) array
      */
      if (((currentPosition[direction] + ships[i]) <= n) &&
        !trash.includes(currentPosition.join("-"))) {

        //Makes array of position values for the length of the current ship
        toAdd = 0;
        for (var x = 0; x < ships[i]; x++) {

          //Adds based on whether the ship is horizontal or vertical
          if (direction === 0) {
            currentArray.push([currentPosition[0] + toAdd, currentPosition[1]]);
            toAdd++;
          } else {
            currentArray.push([currentPosition[0], currentPosition[1] + toAdd]);
            toAdd++;
          }
        }

        //Runs checks if there are surrounding ships
        if (checkDiag(currentArray, positionArray) ||
            checkHori(currentArray, positionArray) ||
            checkVert(currentArray, positionArray)) {

              //If the check finds a nearby ship, add that position to trash
              trash.push(currentPosition.join("-"));

              //Resets array to try again
              currentArray = [];
        } else {

          //Runs if both checks are passed - Adds values to final array
          for (var iter = 0; iter < currentArray.length; iter++) {
            positionArray.push(currentArray[iter]);
          }

          //Resets array for next ship
          currentArray = [];

          //Redirects orienatation to change from either horizontal/vertical
          direction = (direction === 0) ? 1 : 0;
          break;
        }
      } else {

        //Will run if the ship cannot fit within game board
        trash.push(currentPosition.join("-"));

        //Empties array for next try
        currentArray = [];
      }
    }
  }

  return positionArray;

}

/*
** Check horizontal
** Return true if there is already a ship horizontally nearby or at that spot
*/
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

/*
** Check vertical
** Return true if there is already a ship vertically nearby or at that spot
*/
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

/*
** Check diagonal
** Return true if there is a nearby ship diagonally
*/
function checkDiag(curArray, posArray) {
  for (var iter = 0; iter < curArray.length; iter++) {
    for (var i = 0; i < posArray.length; i++) {
      if (
        ((posArray[i][0] === curArray[iter][0] + 1) &&
        (posArray[i][1] === curArray[iter][1] - 1)) ||
        ((posArray[i][0] === curArray[iter][0] - 1) &&
        (posArray[i][1] === curArray[iter][1] + 1)) ||
        ((posArray[i][0] === curArray[iter][0] - 1) &&
        (posArray[i][1] === curArray[iter][1] - 1)) ||
        ((posArray[i][0] === curArray[iter][0] + 1) &&
        (posArray[i][1] === curArray[iter][1] + 1))
        ) {

          return true;
      }
    }
  }

  return false;

}
