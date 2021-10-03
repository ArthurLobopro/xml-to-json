const { contextBridge } = require('electron')
const { insertFrame } = require('electron-frame/renderer')

contextBridge.exposeInMainWorld('require', require)

const injectScript = (src, type = '') => {
    const script = document.createElement('script')
    script.src = src
    script.type = type
    document.head.appendChild(script)
}


window.addEventListener('DOMContentLoaded', () => {
    injectScript("../src/renderer/App.js", "module")
    insertFrame()
})