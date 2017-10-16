const { Menu } = require('electron')
const electron = require('electron')
const app = electron.app

var i18n = require("i18n");

//console.log(app.getAppPath());

//Setting up i18n. Translation files are put in subfolder "locales"
i18n.configure({
  locales: ['en-US', 'pt-BR', 'it'],
  directory: app.getAppPath() +'/locales'
});

//console.log(app.getLocale());
i18n.setLocale(app.getLocale());

const template = [
  {
    label: i18n.__('Edit'),
    submenu: [
      {
        role: 'undo', label: i18n.__('Undo')
      },
      {
        role: 'redo', label: i18n.__('Redo')
      },
      {
        type: 'separator'
      },
      {
        role: 'cut', label: i18n.__('Cut')
      },
      {
        role: 'copy', label: i18n.__('Copy')
      },
      {
        role: 'paste', label: i18n.__('Paste')
      },
      {
        role: 'pasteandmatchstyle', label: i18n.__('Paste and match style')
      },
      {
        role: 'delete', label: i18n.__('Delete')
      },
      {
        role: 'selectall', label: i18n.__('Select all')
      }
    ]
  },
  {
    label: i18n.__('View'),
    submenu: [
      {
        label: 'Reload', label: i18n.__('Reload'),
        accelerator: 'CmdOrCtrl+R',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.reload()
        }
      },
      {
        label: 'Toggle Developer Tools', label: i18n.__('Toggle developer tools'),
        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.webContents.toggleDevTools()
        }
      },
      {
        type: 'separator'
      },
      {
        role: 'resetzoom', label: i18n.__('Reset zoom')
      },
      {
        role: 'zoomin', label: i18n.__('Zoom in')
      },
      {
        role: 'zoomout', label: i18n.__('Zoom out')
      },
      {
        type: 'separator'
      },
      {
        role: 'togglefullscreen', label: i18n.__('Toggle full screen')
      }
    ]
  },
  {
    role: 'window', label: i18n.__('Window'),
    submenu: [
      {
        role: 'minimize', label: i18n.__('Minimize')
      },
      {
        role: 'close', label: i18n.__('Close')
      }
    ]
  },
  {
    role: 'help', label: i18n.__('Help'),
    submenu: [
      {
        label: i18n.__('Learn more'),
        click() { require('electron').shell.openExternal('http://electron.atom.io') }
      },
      {
        type: 'separator'
      },
      {
        label: i18n.__('About'),
        click() { require('electron').shell.openExternal('http://leniel.net') }
      },
    ]
  }
]

if (process.platform === 'darwin') {
  const name = app.getName()
  template.unshift({
    label: name,
    submenu: [
      {
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        role: 'hide'
      },
      {
        role: 'hideothers'
      },
      {
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        role: 'quit'
      }
    ]
  })
  // Edit menu.
  template[1].submenu.push(
    {
      type: 'separator'
    },
    {
      label: 'Speech',
      submenu: [
        {
          role: 'startspeaking'
        },
        {
          role: 'stopspeaking'
        }
      ]
    }
  )
  // Window menu.
  template[3].submenu = [
    {
      label: 'Close',
      accelerator: 'CmdOrCtrl+W',
      role: 'close'
    },
    {
      label: 'Minimize',
      accelerator: 'CmdOrCtrl+M',
      role: 'minimize'
    },
    {
      label: 'Zoom',
      role: 'zoom'
    },
    {
      type: 'separator'
    },
    {
      label: 'Bring All to Front',
      role: 'front'
    }
  ]
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)