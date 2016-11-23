$(document).ready(function() {
  //Create nxn board - n is length
  for (var iter = 0; iter < n; iter++) {
    $("table").append("<tr id=" + iter + "></tr>");

    for (var i = 0; i < n; i++) {
      $("#" + iter).append("<td id=" + iter + "-" + i +"></td>");
    }
  }
});
