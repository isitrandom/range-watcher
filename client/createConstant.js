(function( $ ) {
  $.fn.constantRange = function() {
      $(this).each(function() {
        $(this).on("create", function(event, number) {
          var value = "0." + parseFloat($(this).find(".value").val());
          var range = createRange(number, "Constant " + value);

          for(var i=0; i<number; i++) {
            range.trigger('number', [value]);
          }
        });
      });

      return this;
  };
}( jQuery ));

$(function() {
  $(".create-range.constant").constantRange();
});
