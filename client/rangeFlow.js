var rangeFlowTimer;

function addRangeFlow(number) {

  if(number) {
    $("#range-capture").trigger("number", [number]);
  } else {
    number = 0;
  }

  var percent = number * 100;

  $(".range").prepend('<div class="bar" style="height: ' + percent + '%"></div>');
  $(".screen .line2").html(number);

  clearTimeout(rangeFlowTimer);
  rangeFlowTimer = setTimeout(function() {
    addRangeFlow(0);
  }, 1000);

  cleanFlow();
}

function cleanFlow() {
  var width = $(window).width();
  var elm = $(".range .bar").filter(function(index) {
    return $(".range .bar:eq(" + index + ")").offset().left > width;
  }).remove();

}

$(function() {
  addRangeFlow();
});
