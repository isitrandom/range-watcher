(function( $ ) {
  $.fn.rangeCapture = function() {
      $(this).each(function() {
        $(this).find(".btn-start").on("click", function() {
          alert("start");
        });

        $(this).on("number", function(event, number) {
          console.log(number);
        });
      });
      return this;
  };
}( jQuery ));

$(function() {
  $("#range-capture").rangeCapture();
});
