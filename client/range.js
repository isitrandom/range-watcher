(function( $ ) {

  function drawRange(list, ctx) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    ctx.clearRect(0, 0, 1000, 1000);

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

        var width = $(this).width();
        var height = $(this).height();
        var ratio = window.devicePixelRatio;

        $(this).html('<canvas width="' + (width*ratio) + '" height="' + (height*ratio) + '" style="width: ' + width + 'px; height:' + height + 'px" ></canvas>');

        var canvas = $(this).find("canvas");
        var ctx = canvas[0].getContext("2d");
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = ratio;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(200, 200);
        ctx.stroke();
        ctx.closePath();

        $(this).on("number", function(event, number) {
          list.push(parseFloat(number));
          list.shift();

          var now = new Date();

          if(now - lastDraw > 140) {
            drawRange(list, ctx);
            lastDraw = now;
          }
        });
      });

      return this;
  };
}( jQuery ));

$(function() {
  $(".range").range();
});
