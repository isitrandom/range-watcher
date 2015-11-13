$(function() {
  $(".create-range h1").click(function() {
    $(".create-range").removeClass("active");
    $(this).parent().addClass("active");
  });

  $("#side-bar .btn-create").click(function() {
    $("#create .create-range.active").trigger("create", [ $("#capture-numbers").val() ]);
  });
});
