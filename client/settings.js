var ipc = require('ipc');

function info(data) {
  connected(true);

  $(".device-selector .device-list").append('<option>'+data.name+'</option>');
  $(".device-selector .device-list").val(data.name);
  $(".screen .line1").html("Pattern " + (data.pattern + 1));
}

function connected(isConnected) {
  $("body").removeClass(isConnected ? "disconnected" : "connected")
           .addClass(isConnected ? "connected" : "disconnected");

  if(!isConnected) {
    $(".device-selector .device-list").html("");
    $(".device-selector .btn-refresh");
    $(".device-selector .device-list").removeAttr("disabled");
  } else {
    $(".device-selector .fa").removeClass("fa-spin");
    $(".device-selector .device-list").attr("disabled", "disabled");
  }
}

function listDevices(devices) {
  var val = $(".device-selector .device-list").val();

  $(".device-selector .device-list").html("");

  devices.forEach(function(device) {
    $(".device-selector .device-list").append('<option value="' + device.comName + '">' + device.name + '</option>');
  });

  if(val && val !== "") {
    $(".device-selector .device-list").val(val);
  }
}

$(function() {
  $(".device-selector .btn-refresh").click(function() {
    ipc.send('device', 'refresh');
    $(".device-selector .device-list").html("");
    $(this).find(".fa").addClass("fa-spin");
  }).click();

  $(".device-selector .btn-connect").click(function() {
    var val = $(".device-selector .device-list").val();

    if(val && val !== "") {
      ipc.send('device', 'connect:' + val);
    }
  });

  $(".device-selector .btn-disconnect").click(function() {
    ipc.send('device', 'disconnect');
  });

  $(".device .btn-a").click(function() {
    ipc.send('device', 'a');
  });

  $(".device .btn-b").click(function() {
    ipc.send('device', 'b');
  });

  //ipc.send('device', 'info');
});
