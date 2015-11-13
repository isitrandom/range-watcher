$(function() {
  $("#main-menu .btn").click(function() {
    var target = $(this).attr("data-target");

    $("section, #main-menu .btn, #side-bar .btn").removeClass("active");
    $("#" + target).addClass("active");
    $("#btn-" + target).addClass("active");

    $(this).addClass("active");
    $(window).resize();
  });
});
