var ipc = require('ipc');

function createRange(captureLength, name) {
  var item = '<div class="item">';

  item += '<div class="toolbar">';
  item += '<input class="name" value="' + ($("#capture .item").length + 1) + '.' + name + '"/>';
  item += '<div class="btn btn-histogram"><i class="fa fa-bar-chart"></i></div>';
  item += '</div>';

  item += '<div data-count="' + captureLength + '" class="range"></div>';

  item += '<div class="progress"></div>';
  item += '</div>';

  $("#capture").append(item);

  var rangeElem = $("#capture .range:last");
  rangeElem.range();

  return rangeElem;
}

(function( $ ) {
  $.fn.rangeCapture = function() {
      $(this).each(function() {
        var lastRange;
        var isCapture = false;
        var captureLength = 0;

        $(this).find(".btn-capture").on("click", function() {
          ipc.send('device', isCapture ? 'stop' : 'start:' + $("#capture-numbers").val());
          isCapture = !isCapture;

          if(isCapture) {
            captureLength = $("#capture-numbers").val();
            lastRange = createRange(captureLength, "Capture");
          } else {
            lastRange = null;
          }
        });

        $(this).on("number", function(event, number) {
          if(lastRange) {
            lastRange.trigger('number', [number]);
            captureLength--;

            if(captureLength <= 0) {
              lastRange = null;
              isCapture = false;
            }
          }
        });
      });
      return this;
  };
}( jQuery ));

$(function() {
  $("#side-bar").rangeCapture();
});
