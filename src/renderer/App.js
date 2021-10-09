const { delay, copy } = require('./Util.js')

const parser = require('fast-xml-parser')
const { ipcRenderer } = require('electron')

const xmlInput = document.getElementById('xml-input')
const jsonContentTextarea = document.getElementById('json-content')

const options = {
    attributeNamePrefix: "",
    attrNodeName: "",
    textNodeName: "#text",
    ignoreAttributes: false,
    ignoreNameSpace: false,
    allowBooleanAttributes: true,
    parseNodeValue: true,
    parseAttributeValue: true,
    trimValues: true,
    cdataTagName: "__cdata",
    cdataPositionChar: "\\c",
    parseTrueNumberOnly: false,
    arrayMode: false,
    stopNodes: ["parse-me-as-string"]
}

async function parseXML() {
    await delay(100)
    const xmlString = xmlInput.value
    const jsonObj = parser.parse(xmlString, options)
    jsonContentTextarea.textContent = JSON.stringify(jsonObj, null, 4)
}


xmlInput.onpaste = parseXML

const convertButton = document.getElementById('convert')
convertButton.onclick = parseXML

const openFileButton = document.getElementById('open-file')
openFileButton.onclick = async () => {
    const content = await ipcRenderer.invoke('open-file')
    xmlInput.textContent = content
    parseXML()
}

const copyJsonButton = document.getElementById('copy-json')
copyJsonButton.onclick = () => {
    const text = jsonContentTextarea.textContent
    copy(text)
}

const selectJsonButton = document.getElementById("select-json")
selectJsonButton.onclick = () => {
    jsonContentTextarea.select()
}

const saveJsonButton = document.getElementById('save-json')
saveJsonButton.onclick = () => ipcRenderer.send('save', { content: jsonContentTextarea.textContent })