var serialport = require("serialport");
var SerialPort = serialport.SerialPort;

var numberCallback = function() {};

var serialPort = new SerialPort("/dev/cu.usbmodem1411", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")
});

serialPort.on('data', function(data) {
  data = data.toString();
  console.log("<-", data);

  var prefix = data.substring(0, 2);

  if(prefix == "0." || prefix == "1.") {
    numberCallback(parseFloat(data));
  }
});

function setNumberCallback(func) {
  numberCallback = func;
}

function readNumber() {
  console.log("->b");
  serialPort.write("b", function(err, results) {

  });
}

function enableDisplay() {
  serialPort.write("d");
}

function disableDisplay() {
  serialPort.write("c");
}

module.exports.enableDisplay = enableDisplay;
module.exports.disableDisplay = disableDisplay;

module.exports.readNumber = readNumber;
module.exports.setNumberCallback = setNumberCallback;
