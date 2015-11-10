var ipc = require('ipc');

(function( $ ) {
  $.fn.rangeCapture = function() {
      $(this).each(function() {
        var isCapture = false;
        $(this).find(".btn-capture").on("click", function() {
          ipc.send('device', isCapture ? 'stop' : 'start:' + $("#capture-numbers").val());
          isCapture = !isCapture;
        });

        $(this).on("number", function(event, number) {
          //console.log(number);
        });
      });
      return this;
  };
}( jQuery ));

$(function() {
  $(".range-capture").rangeCapture();
});
