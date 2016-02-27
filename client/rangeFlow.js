var rangeFlowTimer;

function addRangeFlow(numbers) {

  var list = [0];

  if(numbers && numbers.length && numbers.length > 0) {
    for(var i in numbers) {
      list.push(parseFloat(numbers[i]));
    }

    $(".device .line2").html(list[list.length - 1]);
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
