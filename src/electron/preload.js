const { contextBridge, ipcRenderer } = require('electron')
const path = require('path')

const injectScript = (src, type = '') => {
    const script = document.createElement('script')
    script.src = src
    script.type = type
    document.head.appendChild(script)
}

window.addEventListener('DOMContentLoaded', () => {
    injectScript("../src/renderer/App.js", "module")
    contextBridge.exposeInMainWorld('require', require)
})