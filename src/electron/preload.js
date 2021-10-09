const { insertFrame } = require('electron-frame/renderer')

window.addEventListener('DOMContentLoaded', () => {
    insertFrame()
    require('../renderer/App')
})