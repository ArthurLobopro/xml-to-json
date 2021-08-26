const { app, BrowserWindow } = require('electron')
const path = require('path')

require('./mainEvents')

const appPath = app.getAppPath()

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 500,
        minWidth: 800,
        minHeight: 530,
        autoHideMenuBar: true,
        frame: false,
        show: false,
        icon: path.resolve(appPath, 'assets','icon.png'),
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.loadFile(path.resolve(appPath, 'public', 'index.html'))
    win.on('ready-to-show', () => win.show())
}

const isUnicWindow = app.requestSingleInstanceLock() //Verifica se o app já foi iniciado

if (!isUnicWindow) {
    app.quit() // Caso o app já tiver sido aberto ele é fechado
} else {
    app.whenReady().then(createWindow)
}

app.on('second-instance', () => {
    const win = BrowserWindow.getAllWindows()[0]
    if (win.isMinimized()) win.restore()
    win.center()
    win.focus()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// Faz com que o programa não inicie várias vezes durante a instalação
if (require('electron-squirrel-startup')) {
    app.quit();
}