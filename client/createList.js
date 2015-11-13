(function( $ ) {
  $.fn.listRange = function() {
      $(this).each(function() {
        var list = $(this).find("ul");
        var count;
        var values = [];

        $(this).find(".numbers").change(function() {
          list.html("");
          count = parseInt($(this).val());

          for(var i=0; i<count; i++) {
            if(values[i] === null || values[i] === undefined) {
              values[i] = 0;
            }

            list.append('<li><div class="zero-prepend">0.</div><input data-index="' + i + '" value="' + values[i] + '" type="number"></li>');
          }
        });

        $(list).on("change", "li input", function() {
          var value = parseFloat($(this).val());
          var index = parseInt($(this).attr("data-index"));

          values[index] = value;
        });

        $(this).on("create", function(event, number) {
          var index = 0;
          var range = createRange(number, "List");

          for(var i=0; i<number; i++) {
            var value = parseFloat("0." + values[index]);
            range.trigger('number', [ value ]);
            index = index < values.length ? index + 1 : 0;
          }
        });
      });

      return this;
  };
}( jQuery ));

$(function() {
  $(".create-range.list").listRange();
});
