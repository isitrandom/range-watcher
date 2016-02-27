$(function() {
  $("#main-menu .btn-settings").click(function() {
    $(this).toggleClass("active");
    $(".btn-back").hide();

    if($(this).is(".active")) {
      $("#histogram").removeClass("active");
      $("#details").removeClass("active");
      $("#settings").addClass("active");
      $("#capture").removeClass("active");
    } else {
      $("#histogram").removeClass("active");
      $("#details").removeClass("active");
      $("#settings").removeClass("active");
      $("#capture").addClass("active");
    }

    $(window).resize();
  });


  $(".btn-back").click(function() {
    $(".btn-back").hide();

    $("#histogram").removeClass("active");
    $("#details").removeClass("active");

    $("#capture").addClass("active");

    $(window).resize();
  });
});


$(function() {
  $(".btn-back").hide();
});
