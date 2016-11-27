$(document).ready(function() {
  //Carries all ship locations
  var shipArray = addShips(ships, board, n, numShips);

  //Packages the correct m-block ships
  var indShips = createPackage(ships, numShips, n, shipArray);

  //Makes a hard copy of ships so that it is not overwritten
  var copyShips = ships.slice();

  //Will hold values from checkShipStatus in the form of [boolean, number, array]
  var check = [];

  /*
  ** Create N x N board - N is length of board
  ** ids are based on indexed position
  */
  //Rows
  for (var iter = 0; iter < n; iter++) {
    $("table").append("<tr id=" + iter + "></tr>");

    //Columns
    for (var i = 0; i < n; i++) {
      $("#" + iter).append("<td id=" + iter + "-" + i +"></td>");
    }
  }

  //Message for which m-block ships are left
  $("#ships").text("Ship(s) remaining: " + copyShips.join(", "));

  //Message for how many missiles the user has left
  $("#counter").text("You have " + missileCheck() + " missile(s) left.");

  //On click function that runs the game within the table
  $("td").on("click", function() {
    clickerFunction(this, shipArray, indShips, copyShips, ships, check, counter);
  });

  //On click function that resets the game values and on screen game baord
  $("button").on("click", function() {
    //Resets all game values
    counter = 50;
    shipArray = addShips(ships, board, n, numShips);
    indShips = createPackage(ships, numShips, n, shipArray);
    check = [];
    copyShips = ships.slice();

    //Removes all changes to game board to bring it back to original state
    $("td").off();
    $("td").removeClass();
    $("td").text("");

    //Resets win/lose message styling and text
    $("#winOrLose").text("");
    $("#winOrLose").removeAttr("style");

    //Resets counter message
    $("#counter").text("You have " + missileCheck() + " missile(s) left.");

    //Resets which ships still alive message
    $("#ships").text("Ship(s) remaining: " + copyShips.join(", "));

    //Removes all log messages
    $(".destroyed").remove();

    //Re-runs the on click functionality
    $("td").on("click", function() {
      clickerFunction(this, shipArray, indShips, copyShips, ships, check, counter);
    }); //Ends td on click function

  }); //Ends button on click function

}); //Ends $(document).ready

/*
** clickerFunction runs the game by doing the following:
** Changes the missile counter
** Checks if clicked spot was a hit/miss and then updates game board
** Runs 'Sunk!' animation, updates log, and updates ships left when an
** entire ship is destroyed
** Checks game board for win/loss
** If game is lost, show user where ships are
*/
function clickerFunction(x, shipArray, indShips, copyShips, ships, check, counter) {

  //Updates users missile count
  $("#counter").text("You have " + missileCheck() + " missile(s) left.");

  //Checks if the clicked spot is a hit
  if (checkHitOrMiss($(x).attr("id"), shipArray)) {

    //Runs when spot is a hit
    $(x).addClass("hit");
    $(x).text("O");

    //Checks and removes fully sunk ships
    check = checkShipStatus(indShips, $(x).attr("id"), copyShips, ships);
    if (check[0]) {
      $("#something").text("Sunk!").animate({opacity: 1}, function() {
        $("#something").text("Sunk!").animate({opacity: 0}, 500);
      });
      $("#log").after("<p class=" + "destroyed" + ">You destroyed a " +
        ships[check[1]] + "-block ship!</p>");
      $("#ships").text("Ship(s) remaining: " + check[2].join(", "));
    } //End sunk check

    //Checks for win
    if (checkWin(shipArray)) {

      //Runs if there is a win
      $("#winOrLose").text("You win!").css({"color": "green"});
      $("td").off();
    } else if (counter === 0) {

      //Runs if there is a loss
      $("#winOrLose").text("You lose!");
      $("td").off();

      //Shows where the ships were located
      for (var i = 0; i < shipArray.length; i++) {
        $("#" + shipArray[i]).addClass("show-ship");
        $("#" + shipArray[i]).text("|");
      }
    } //End win check
  } else {

    //Runs when spot is a miss
    $(x).addClass("miss");
    $(x).text("X");

    //Checks if the user lost
    if (counter === 0) {
      $("#winOrLose").text("You lose!").css({"color": "red"});
      $("td").off();

      //Shows where the ships were located
      for (var i = 0; i < shipArray.length; i++) {
        $("#" + shipArray[i]).addClass("show-ship");
        $("#" + shipArray[i]).text("|");
      }

    }//End loss check

  }//End hit/miss check

  //Stops clicked spot to be clicked again
  $(x).off();

}
