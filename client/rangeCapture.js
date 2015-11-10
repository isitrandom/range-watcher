var ipc = require('ipc');

(function( $ ) {
  $.fn.rangeCapture = function() {
      $(this).each(function() {
        var lastRange;
        var isCapture = false;

        $(this).find(".btn-capture").on("click", function() {
          ipc.send('device', isCapture ? 'stop' : 'start:' + $("#capture-numbers").val());
          isCapture = !isCapture;

          if(isCapture) {
            $("#range-list").prepend('<div data-count="' + $("#capture-numbers").val() + '" class="range"></div>');
            lastRange = $("#range-list .range:first").range();
          } else {
            lastRange = null;
          }
        });

        $(this).on("number", function(event, number) {
          //console.log(number);
          if(lastRange) {
            lastRange.trigger('number', [number]);
          }
        });
      });
      return this;
  };
}( jQuery ));

$(function() {
  $(".range-capture").rangeCapture();
});
