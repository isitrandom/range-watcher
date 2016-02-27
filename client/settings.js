var ipc = require('ipc');

function info(data) {
  connected(true);

  $(".device-selector .device-list").append('<option>'+data.name+'</option>');
  $(".device-selector .device-list").val(data.name);
  $(".graphic .line1").html("Pattern " + (data.pattern + 1));
}

function connected(isConnected) {
  $("body").removeClass(isConnected ? "disconnected" : "connected")
           .addClass(isConnected ? "connected" : "disconnected");

  if(!isConnected) {
    $(".device-selector .device-list").html("");
    $(".device-selector .device-list").removeAttr("disabled");

    ipc.send('device', 'refresh');

    $("#capture").removeClass("active");
    $("#settings").addClass("active");
    $(".btn-settings").addClass("active");
  } else {
    $(".device-selector .fa").removeClass("fa-spin");
    $(".device-selector .device-list").attr("disabled", "disabled");

    $("#capture").addClass("active");
    $("#settings").removeClass("active");
    $(".btn-settings").removeClass("active");
  }

  $(window).resize();
}

function listDevices(devices) {
  var val = $(".device-selector .device-list").val();

  $(".device-selector .device-list").html("");

  if(devices.length > 0) {
    $(".list-devices").show();
    $(".no-device").hide();
  } else {
    $(".list-devices").hide();
    $(".no-device").show();
  }

  devices.forEach(function(device) {
    $(".device-selector .device-list").append('<option value="' + device.comName + '">' + device.name + '</option>');
  });

  if(val && val !== "") {
    $(".device-selector .device-list").val(val);
  }
}

$(function() {
  ipc.send('device', 'refresh');

  $(".btn-connect").click(function() {
    var val = $(".device-selector .device-list").val();

    if(val && val !== "") {
      ipc.send('device', 'connect:' + val);
    }
  });

  $(".btn-disconnect").click(function() {
    ipc.send('device', 'disconnect');
  });

  $(".device .btn-a").click(function() {
    ipc.send('device', 'a');
  });

  $(".device .btn-b").click(function() {
    ipc.send('device', 'b');
    ipc.send('device', 'x');
  });

  $(window).resize(function() {
    var h = $("#settings").height();
    var top = parseInt($("#container").css("padding-top"));

    var padding = ($(window).height() - h) / 2 - top;

    $("#settings").css("padding-top", padding);

  }).resize();
});
