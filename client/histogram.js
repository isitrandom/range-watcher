function showHistogram(numbers) {
  $(".btn-back").show();

  var size = 10;

  var hist = createHistogram(numbers, size);

  displayHistogram(hist);
}

function displayHistogram(hist) {
  $("#histogram").addClass("active");
  $("#capture").removeClass("active");

  $("#histogram .display").html("");
  var max = 0;

  hist.forEach(function(number) {
    if(number > max) {
      max = number;
    }

    $("#histogram .display").append("<div class='bar'><div class='count'>" + number + "</div><div class='content'></div></div>");
  });

  $("#histogram .display .bar").each(function(index) {
    $(this).css({
      "width": (100 / hist.length) + "%"
    });

    $(this).find(".content").css({
      "height": "calc(" + (Math.round(((hist[index] / max) * 100) * 100) / 100) + "% - 30px)"
    });
  });
}

function createHistogram(numbers, size) {
  var hist = [];

  for(var i=0; i<=size; i++) {
    hist.push(0);
  }

  numbers.forEach(function(number) {
    var val = parseInt(number * size);
    hist[val]++;
  });

  return hist;
}
