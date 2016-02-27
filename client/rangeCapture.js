var ipc = require('ipc');

function createRange(captureLength, name) {
  $(".no-range-message").remove();

  var item = '<div class="item">';

  item += '<div class="toolbar">';
  item += '<input class="name" value="' + ($("#capture .item").length + 1) + '.' + name + '"/>';
  item += '<div class="btn btn-histogram"><i class="fa fa-bar-chart"></i></div>';
  item += '<div class="btn btn-details"><i class="fa fa-search"></i></div>';
  item += '</div>';

  item += '<div data-count="' + captureLength + '" class="range"></div>';

  item += '<div class="progress"></div>';
  item += '</div>';

  $("#capture-bar").after(item);

  var rangeElem = $("#capture-bar").next().find(".range:first");
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

          range.on("histogram", function(ev, numbers) {
            showHistogram(numbers);
          });

          range.on("details", function(ev, numbers) {
            showDetails(numbers);
          });

          range.addClass("active");
        });
      });
      return this;
  };
}( jQuery ));

$(function() {
  $("#capture-bar").rangeCapture();
});
