$(function() {
  $("#main-menu .btn").click(function() {
    var target = $(this).attr("data-target");

    $("section, #main-menu .btn, #side-bar .btn").removeClass("active");
    $("#" + target).addClass("active");
    $("#btn-" + target).addClass("active");

    if(target === "settings") {
      $("#side-bar .input-group").css("display", "none");
      $("#side-bar .range").css("left", 0);
      $("#side-bar .range").css("width", "auto");
    } else {
      $("#side-bar .input-group, #side-bar .range").removeAttr("style");
    }

    $(this).addClass("active");
    $(window).resize();
  });
});
