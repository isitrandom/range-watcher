var rangeFlowTimer;

function addRangeFlow(number) {
  var percent = number * 100;

  $("#range-flow").prepend('<div class="bar" style="height: ' + percent + '%"></div>');
  clearTimeout(rangeFlowTimer);

  rangeFlowTimer = setTimeout(function() {
    addRangeFlow(0);
  }, 1000);

  cleanFlow();
}

function cleanFlow() {
  var width = $(window).width();
  var elm = $("#range-flow .bar").filter(function(index) {
    return $("#range-flow .bar:eq(" + index + ")").offset().left > width;
  }).remove();

}


$(function() {
  addRangeFlow(0);
});
