var rangeData = [];

(function( $ ) {
  function drawRange(list, ctx) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    ctx.clearRect(0, 0, width, height);

    var ended = false;
    var index = list.length - 1;

    ctx.beginPath();

    while(!ended) {
      var x = (list.length - index) * 5;

      if(index > 0 && x < width) {
        var value = height * list[index];

        if(value < 2) {
          value = 2;
        }

        ctx.moveTo(x, height/2 - value/2);
        ctx.lineTo(x, height/2 + value/2);

      } else {
        ended = true;
      }

      index--;
    }

    ctx.stroke();
    ctx.closePath();
  }

  $.fn.range = function() {
      $(this).each(function() {
        var shouldUpdateProgress = true;
        var element = $(this);
        var lastDraw = new Date();
        var name = rangeData.length;

        rangeData[name] = [];

        var totalNumers = parseInt($(this).attr("data-count"));
        var readNumers = 0;
        var width;
        var height;
        var ratio = window.devicePixelRatio;

        for(var i = 0; i<totalNumers; i++) {
          rangeData[name].push(0);
        }

        $(this).html('<canvas></canvas>');

        var canvas = $(this).find("canvas");
        var ctx = canvas[0].getContext("2d");

        $(this).on("numbers", function(event, numbers) {
          rangeData[name] = rangeData[name].concat(numbers);
          rangeData[name].splice(0, numbers.length);

          readNumers += numbers.length;
          draw();

          if(shouldUpdateProgress) {
            updateProgress();
          }
        });

        $(window).on("resize", function() {
          draw();
        });

        function updateProgress() {
          totalNumers = parseInt(element.attr("data-count"));

          var percent = (readNumers / totalNumers)*100;

          element.parent().find(".progress").css("width", percent + "%");

          if(percent >= 100) {
            shouldUpdateProgress = false;
            element.parent().addClass("read-done");
            element.removeClass("active");
          }
        }

        function draw() {
          var now = new Date();

          if(now - lastDraw > 140) {
            setCanvasSize();
            drawRange(rangeData[name], ctx);
            lastDraw = now;
          }
        }

        function setCanvasSize() {
          var parent = canvas.parent();

          if(width != parent.width() || height != parent.height()) {
            width = parent.width();
            height = parent.height();

            canvas.attr({
               width: (width*ratio),
               height: (height*ratio),
               style: "width: " + width + "px; height:" + height + "px"
            });

            ctx.strokeStyle = parent.css("color");
            ctx.lineWidth = ratio;
          }
        }
      });
      return this;
  };
}( jQuery ));

$(function() {
  $(".range").range();
});
