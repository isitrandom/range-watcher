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

  $("#capture").prepend(item);

  var rangeElem = $("#capture .range:first");
  rangeElem.range();

  return rangeElem;
}

(function( $ ) {
  $.fn.rangeCapture = function() {
      $(this).each(function() {
        var captureLength = 0;

        $(this).find(".btn-capture").on("click", function() {
          ipc.send('device', 'start:' + $("#capture-numbers").val());
          captureLength = $("#capture-numbers").val();

          var range = createRange(captureLength, "Capture");
          range.addClass("active");
        });
      });
      return this;
  };
}( jQuery ));

$(function() {
  $("#side-bar").rangeCapture();
});
