
$(function() {
  $(window).resize(function() {
    var h = $(".no-range-message").height();
    var top = parseInt($("#container").css("padding-top"));

    var padding = ($(window).height() - h) / 2 - top;

    $(".no-range-message").css("padding-top", padding);
  }).resize();
});
