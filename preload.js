const { contextBridge, ipcRenderer } = require('electron')
const { writeFile } = require('original-fs')

contextBridge.exposeInMainWorld('electronAPI',{
  readFile: () => ipcRenderer.invoke('dialog:readFile'),
  handleCounter: (callback) => ipcRenderer.on('update-counter', callback),
  writeFile: (title) => ipcRenderer.send('dialog:writeFile', title),
  toBackendConsole: (message) => ipcRenderer.send('toConsole', message)
})