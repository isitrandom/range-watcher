var serialport = require("serialport");
var SerialPort = serialport.SerialPort;

var numberCallback = function() {};
var serialPort;
var onConnect = function() {};
var onDisconnect = function() {};
var onInfo = function() {};

var listDevicesTimeout;

function setOnConnect(callback) {
  onConnect = callback;
}

function setOnDisconnect(callback) {
  onDisconnect = callback;
}

function setOnInfo(callback) {
  onInfo = callback;
}

function disconnect() {
  serialPort.close(function() {
    onDisconnect();
  });
}

function connect(path) {
  serialPort = new SerialPort(path, {
    baudrate: 9600,
    parser: serialport.parsers.readline("\n"),
    disconnectedCallback: onDisconnect
  });

  serialPort.open(function (error) {
    onConnect(error);
    console.log("open", error);

    if(!error) {
      clearTimeout(listDevicesTimeout);
    }
  });

  serialPort.on('data', function(data) {
    data = data.toString();
    console.log("<-", data);

    var prefix = data.substring(0, 2);

    if(prefix == "0." || prefix == "1.") {
      numberCallback(parseFloat(data));
      return;
    }

    data = data.split(":");
    console.log(data);

    if(data[0] === "info") {
      var info = {
        name: data[1],
        color: data[2],
        pattern: parseInt(data[3])
      };

      onInfo(info);
    }
  });
}

function setNumberCallback(func) {
  numberCallback = func;
}

function readNumber() {
  console.log("->b");
  serialPort.write("b");
}

function nextGenerator() {
  console.log("->a");
  serialPort.write("a");
}

function enableDisplay() {
  console.log("->d");
  serialPort.write("d");
}

function disableDisplay() {
  console.log("->c");
  serialPort.write("c");
}

function info() {
  if(serialPort) {
    console.log("->x");
    serialPort.write("x", function() {
      console.log(arguments);
    });
  }
}

function listDevices(callback) {
  clearTimeout(listDevicesTimeout);

  function respond(list) {
    callback(list);

    listDevicesTimeout = setTimeout(function() {
      listDevices(callback);
    }, 1000);
  }

  serialport.list(function (err, ports) {
    var list = [];

    ports.forEach(function(port) {
      if(port.manufacturer === "Arduino LLC") {
        list.push({
          comName: port.comName,
          pnpId: port.pnpId,
          manufacturer: port.manufacturer
        });
      }
    });

    if(list.length) {
      var index = 0;

      list.forEach(function(device) {
        getDeviceOptions(device.comName, function(data) {
          index++;

          device.name = data.name;
          device.color = data.color;

          if(index === list.length) {
            respond(list);
          }
        });
      });
    } else {
      respond([]);
    }
  });
}

function getDeviceOptions(path, callback) {
  tmp = new SerialPort(path, {
    baudrate: 9600,
    parser: serialport.parsers.readline("\r\n"),
    onDisconnect: function() {
      callback({name: "unknown", color: ""});
    }
  });

  tmp.on('data', function(data) {
    data = data.toString().split(":");

    if(data[0] == "info") {
      callback({name: data[1], color: data[2]});
    } else {
      callback({name: "unknown", color: ""});
    }
    tmp.close();
  });

  tmp.open(function (error) {
    tmp.write("x");
  });
}

module.exports.info = info;
module.exports.connect = connect;
module.exports.disconnect = disconnect;

module.exports.enableDisplay = enableDisplay;
module.exports.disableDisplay = disableDisplay;

module.exports.nextGenerator = nextGenerator;
module.exports.readNumber = readNumber;
module.exports.setNumberCallback = setNumberCallback;

module.exports.listDevices = listDevices;

module.exports.setOnConnect = setOnConnect;
module.exports.setOnDisconnect = setOnDisconnect;
module.exports.setOnInfo = setOnInfo;
