var rangeFlowTimer;

function addRangeFlow(number) {

  if(number) {
    $(".screen .line2").html(number);
    $(".range-capture").trigger("number", [number]);
  } else {
    number = 0;
  }

  var percent = number * 100;

  $(".range.active").trigger('number', [number]);

  clearTimeout(rangeFlowTimer);
  rangeFlowTimer = setTimeout(function() {
    addRangeFlow();
  }, 1000);
}

$(function() {
  addRangeFlow();
});
