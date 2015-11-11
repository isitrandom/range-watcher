var ipc = require('ipc');

(function( $ ) {
  $.fn.rangeCapture = function() {
      $(this).each(function() {
        var lastRange;
        var isCapture = false;

        function createItem() {
          var item = '<div class="item">';
          item += '<input class="name" value="Range ' + ($("#range-list .item").length + 1) + '"/>';
          item += '<div data-count="' + $("#capture-numbers").val() + '" class="range">';
          item += '</div>';

          item += '</div>';

          return item;
        }

        $(this).find(".btn-capture").on("click", function() {
          ipc.send('device', isCapture ? 'stop' : 'start:' + $("#capture-numbers").val());
          isCapture = !isCapture;

          if(isCapture) {
            var item = createItem();

            $("#range-list").append(item);
            lastRange = $("#range-list .range:last");
            lastRange.range();
          } else {
            lastRange = null;
          }
        });

        $(this).on("number", function(event, number) {
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
