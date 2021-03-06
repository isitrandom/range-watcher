var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var ipc = require('ipc');
var serial = require('./serial');

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

var neededNumbers = 0;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600,
      'web-preferences': {
        'web-security': false, 'allow-displaying-insecure-content': true
      }
  });

  ipc.on('device', function(event, arg) {
    var command = arg.split(":");

    if(command[0] == "start") {
      neededNumbers = parseInt(command[1]);
      serial.readNumbers(neededNumbers);
    }

    if(command[0] == "stop") {
      neededNumbers = 0;
      serial.enableDisplay();
    }

    if(command[0] == "refresh") {
      serial.listDevices(function(devices) {
        mainWindow.webContents.executeJavaScript("listDevices(" + JSON.stringify(devices) + ")");
      });
    }

    if(command[0] == "connect") {
      console.log("connect to ", command[1]);
      serial.connect(command[1]);
    }

    if(command[0] == "disconnect") {
      serial.disconnect();
    }

    if(command[0] == "info") {
      serial.info();
    }

    if(command[0] == "a") {
      serial.nextGenerator();
    }

    if(command[0] == "b") {
      serial.readNumber();
    }
  });

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // Open the DevTools.
  mainWindow.openDevTools();

  serial.setOnConnect(function() {
    mainWindow.webContents.executeJavaScript("connected(true)");
    serial.info();
  });

  serial.setOnDisconnect(function() {
    mainWindow.webContents.executeJavaScript("connected(false)");
  });

  serial.setOnInfo(function(info) {
    mainWindow.webContents.executeJavaScript("info(" + JSON.stringify(info) + ")");
  });

  var set = false;
  //add some random numbers
  mainWindow.webContents.on('did-finish-load', function() {
    console.log("ready.");
    serial.disconnect();
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
    serial.disconnect();
  });


  serial.setNumberCallback(function(numbers) {
    mainWindow.webContents.executeJavaScript("addRangeFlow(" + JSON.stringify(numbers) + ")");
  });
});
