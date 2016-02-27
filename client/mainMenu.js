$(function() {
  $("#main-menu .btn-settings").click(function() {
    $(this).toggleClass("active");

    if($(this).is(".active")) {
      $("#settings").addClass("active");
      $("#capture").removeClass("active");
    } else {
      $("#settings").removeClass("active");
      $("#capture").addClass("active");
    }

    $(window).resize();
  });
});
