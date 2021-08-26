const fs = require('fs')
const path = require('path')
const { ipcRenderer } = require('electron')
const appPath = ipcRenderer.sendSync('request-app-path')
const indexPath = path.resolve(appPath, 'public')
const iconsFolder = path.resolve(appPath, 'assets', 'windowsIcons')

const getWindowIcon = () => {
    const links = document.querySelectorAll("link")
    for(let e of links){
        if(e.rel.search("icon") !== -1){
            const src = e.href

            if(src.endsWith(".svg")){
                console.log(src);
                return loadSVG(src.replace('file:///', ''))
            }

            let image = new Image()
            image.src = src
            return image.outerHTML
        }
    }
}

const loadSVG = (...pathSegments) => {
    console.log(pathSegments);
    return fs.readFileSync(path.resolve(...pathSegments))
}

const make_header = () => {
    const header = document.createElement('div')

    header.id = "electron-header"
    header.innerHTML = `
    <div class="left">
        <div id="window-icon">${getWindowIcon()}</div>
        <div id="window-name">${document.title}</div>
    </div>
    <div class="right">
        <div id="minimize">
            ${loadSVG(iconsFolder, 'minimize.svg')}
        </div>
        <div id="expand">
            ${loadSVG(iconsFolder, 'square.svg')}
        </div>
        <div id="close">
            ${loadSVG(iconsFolder, "close.svg")}
        </div>
    </div>`

    const minimize_btn = header.querySelector("#minimize")
    minimize_btn.onclick = () => {
        ipcRenderer.send('minimize')
    }

    const maxime_btn = header.querySelector("#expand")
    maxime_btn.onclick = () => {
        ipcRenderer.send('expand')
    }

    const close_btn = header.querySelector("#close")
    close_btn.onclick = () => {
        ipcRenderer.send('close')
    }

    return header
}

module.exports = make_header