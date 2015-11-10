var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var ipc = require('ipc');

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
    }

    if(command[0] == "stop") {
      neededNumbers = 0;
    }
  });

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // Open the DevTools.
  mainWindow.openDevTools();

  var set = false;
  //add some random numbers
  mainWindow.webContents.on('did-finish-load', function() {
    /*for(var i=0; i<100; i++) {
      mainWindow.webContents.executeJavaScript("addRangeFlow(" + Math.random() + ")");
    }*/

    if(!set) {
      setInterval(function() {
        if (neededNumbers > 0) {
          mainWindow.webContents.executeJavaScript("addRangeFlow(" + Math.random() + ")");
          neededNumbers--;
        }
      }, 10);
      set = true;
    }
  });


  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
