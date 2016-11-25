$(document).ready(function() {


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
  //console.log(JSON.stringify(shipArray));
  console.log(JSON.stringify(indShips));


  // for (var i = 0; i < shipArray.length; i++) {
  //   $("." + shipArray[i]).text("X");
  // }

  //Change background color based on hit or miss
  $("td").on("click", function() {


    //updates users missile count
    $("#counter").text("You have " + missileCheck());

    //changes class based on hit or miss
    if (checkHitOrMiss($(this).attr("class"), shipArray)) {
      check = checkShipStatus(indShips, $(this).attr("class"), copyShips, ships);
      if (check[0]) {
        $("#ships").append("<p>" + "You destroyed a " +  ships[check[1]] + "-block ship!" + "</p>");
        $("#ships").append("<p>" + "There are " + check[2].join(", ") + "-block ship(s) left!" + "</p>");
      }
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
          $("." + shipArray[i]).text("X");
        }

      }
    }

    $(this).off();

  });
});
