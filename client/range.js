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
        var lastDraw = new Date();
        var list = [];

        for(var i = 0; i<$(this).attr("data-count"); i++) {
          list.push(0);
        }

        var width;
        var height;
        var ratio = window.devicePixelRatio;

        $(this).html('<canvas></canvas>');

        var canvas = $(this).find("canvas");
        var ctx = canvas[0].getContext("2d");

        $(this).on("number", function(event, number) {
          list.push(parseFloat(number));
          list.shift();

          draw();
        });

        $(window).on("resize", function() {
          draw();
        });

        function draw() {
          var now = new Date();

          if(now - lastDraw > 140) {
            setCanvasSize();
            drawRange(list, ctx);
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
