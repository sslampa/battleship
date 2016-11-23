$(document).ready(function() {
  //Create nxn board - n is length
  for (var iter = 0; iter < n; iter++) {
    $("table").append("<tr id=" + iter + "></tr>");

    for (var i = 0; i < n; i++) {
      $("#" + iter).append("<td id=" + iter + "-" + i +"></td>");
    }
  }

  //add ships to board and change symbols
  var shipArray = addShips([1, 1, 1, 1, 1], board, n);
  for (var i = 0; i < shipArray.length; i++) {
    $("#" + shipArray[i]).text("X");
  }

  //Change background color based on hit or miss
  $("td").on("click", function() {
    $(this).addClass("hit");
    $(this).off();
  });
});
