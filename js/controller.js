$(document).ready(function() {
  $("#counter").text("You have " + counter + " missile(s) left.");

  //Create nxn board - n is length
  for (var iter = 0; iter < n; iter++) {
    $("table").append("<tr id=" + iter + "></tr>");

    for (var i = 0; i < n; i++) {
      $("#" + iter).append("<td class=" + iter + "-" + i +"></td>");
    }
  }

  //add ships to board and change symbols
  var shipArray = addShips(ships, board, n, numShips);
  var indShips = createPackage(ships, numShips, n, shipArray);
  var check;
  var copyShips = ships.slice();
  $("#ships").text("Ships remaining: " + copyShips.join(", "));

  for (var i = 0; i < shipArray.length; i++) {
    $("." + shipArray[i]).text("X");
  }

  //Change background color based on hit or miss
  $("td").on("click", function() {


    //updates users missile count
    $("#counter").text("You have " + missileCheck() + " missile(s) left.");

    //changes class based on hit or miss
    if (checkHitOrMiss($(this).attr("class"), shipArray)) {
      check = checkShipStatus(indShips, $(this).attr("class"), copyShips, ships);
      if (check[0]) {
        $("#status").prepend("<p>You destroyed a " +  ships[check[1]] + "-block ship!</p>");
        $("#ships").text("Ships remaining: " + check[2].join(", "));
      }
      $(this).addClass("hit");
      if (checkWin(shipArray)) {
        $("#winOrLose").text("You win!");
        $("td").off();
      } else if (counter === 0) {
        $("#winOrLose").text("You lose!");
        $("td").off();
      }
    } else {
      $(this).addClass("miss");
      if (counter === 0) {
        $("#winOrLose").text("You lose!");
        $("td").off();
        for (var i = 0; i < shipArray.length; i++) {
          $("." + shipArray[i]).text("X");
        }

      }
    }

    $(this).off();

  });
});
