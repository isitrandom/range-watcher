var rangeFlowTimer;

function addRangeFlow(numbers) {

  var list = [0];

  if(numbers && numbers.length && numbers.length > 0) {
    for(var i in numbers) {
      list.push(parseFloat(numbers[i]));
    }

    $(".screen .line2").html(list[0]);
  }

  $(".range.active, .range.forever").trigger("numbers", [list]);

  clearTimeout(rangeFlowTimer);
  rangeFlowTimer = setTimeout(function() {
    addRangeFlow();
  }, 1000);
}

$(function() {
  addRangeFlow();
});
