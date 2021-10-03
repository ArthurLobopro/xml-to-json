const { ipcMain, dialog, app, BrowserWindow } = require('electron')
const fs = require('fs')

const appPath = app.getAppPath()

ipcMain.handle('open-file', async () => {
    return dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'Arquivos xml', extensions: ['xml'] }]
    })
        .then(res => {
            return res.canceled === true ? '' : fs.readFileSync(res.filePaths[0], { encoding: 'utf-8' })
        })
})

ipcMain.on('request-app-path', (event) => {
    event.returnValue = appPath
})

ipcMain.on('save', async (event, arg) => {
    const { content } = arg

    const window = BrowserWindow.getFocusedWindow()
    const options = {
        title: "Salvar Como: ",
        filters: [{ name: 'Arquivo JSON', extensions: ['json'] }],
        defaultPath: "document.json"
    }
    const { canceled, filePath } = await dialog.showSaveDialog(window, options)

    if (canceled) {
        return
    }

    fs.writeFile(filePath, content, (err, result) => {
        console.log(`Erro: ${err}\nResultado: ${result}`)
    })
})