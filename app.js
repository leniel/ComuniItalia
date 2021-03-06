var electron = require('electron') // http://electron.atom.io/docs/api
var path = require('path')         // https://nodejs.org/api/path.html
var url = require('url')           // https://nodejs.org/api/url.html

const { BrowserWindow, ipcMain } = require('electron');

var window = null

// Wait until the app is ready
electron.app.once('ready', function () {
  // Create a new window
  window = new BrowserWindow({
    width: 800,
    height: 400,
    // Don't show the window until it's ready, this prevents any white flickering
    show: false,
    // Don't allow the window to be resized.
    resizable: true,
    icon: __dirname + '/italy.ico'
  }); 

  require('./menu/mainmenu')
  
  //window.openDevTools();

  // Load a URL in the window to the local index.html path
  window.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  ipcMain.on("translation-complete", (event, args) => {
    //This will show the sender's BrowserWindow
    BrowserWindow.fromWebContents(event.sender.webContents).show();
  });

  // Open external links in the default browser
  window.webContents.on('new-window', function (e, url) {
    e.preventDefault();
    electron.shell.openExternal(url);
  });
})
