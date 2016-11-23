$(document).ready(function() {
  //Create nxn board - n is length
  for (var iter = 0; iter < n; iter++) {
    $("table").append("<tr id=" + iter + "></tr>");

    for (var i = 0; i < n; i++) {
      $("#" + iter).append("<td id=" + iter + "-" + i +"></td>");
    }
  }

  //add ships to board and change symbols
  var shipArray = addShips([1, 1, 1, 1, 1], board, n, numShips);

  //Change background color based on hit or miss
  $("td").on("click", function() {

    //updates users missile count
    $("#counter").text("You have " + missileCheck());

    //changes class based on hit or miss
    if (checkHitOrMiss($(this).attr("id"), shipArray)) {
      $(this).addClass("hit");
      if (checkWin(shipArray) === 1) {
        $("#winOrLose").text("You win!");
        $("td").off();
      } else if (checkWin(shipArray) === 0) {
        $("#winOrLose").text("You lose!");
      }
    } else {
      $(this).addClass("miss");
      if (checkWin(shipArray) === 0) {
        $("#winOrLose").text("You lose!");
        $("td").off();
        for (var i = 0; i < shipArray.length; i++) {
          $("#" + shipArray[i]).text("X");
        }

      }
    }

    $(this).off();

  });
});
