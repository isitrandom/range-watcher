function addRangeFlow(numbers) {
  if(numbers && numbers.length && numbers.length > 0) {
    var list = [];

    for(var i in numbers) {
      list.push(parseFloat(numbers[i]));
    }

    $(".device .line2").html(list[list.length - 1]);
    $(".range.active, .range.forever").trigger("numbers", [list]);
  }
}

$(function() {
  addRangeFlow();
});
