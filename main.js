const {app, BrowserWindow, ipcMain, dialog, Menu} = require('electron')
const path = require('path')
const fs = require('fs')

// async function handleFileOpen() {
//   const { canceled, filePaths } = await dialog.showOpenDialog()
//   //dialog.showOpenDialog() 
//   //canceled: bool: if the "cancel" button is clicked
//   //filePaths = return the file path (absolute)
//   if (canceled) {
//     return "a"
//   } else {
//     return filePaths[0]
//   }
// }

async function handleFileRead() {
  //JSON.parse(string)
  const data = fs.readFileSync("./targetRead.txt","utf-8")
  return data
}


function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }  
  })

  ipcMain.on('dialog:writeFile', (event, title) => {
    //JSON.stringfy(js object)
    console.log(title)
    const dest = fs.writeFileSync("./targetWrite.txt",title)
  })

  ipcMain.on('toConsole', (event,msg)=>{
    console.log(msg)
  })

  mainWindow.on('close',(e)=>{
    console.log('I do not want to be closed')
  })

  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
      {
        click: () => mainWindow.webContents.send('update-counter', 1),
        label: 'Increment',
      },
      {
        click: () => mainWindow.webContents.send('update-counter', -1),
        label: 'Decrement',
      }
      ]
    }

  ])
  Menu.setApplicationMenu(menu)

  mainWindow.loadFile('index.html')
  // mainWindow.webContents.openDevTools()
}



app.whenReady().then(() => {
  ipcMain.handle('dialog:readFile', handleFileRead)
  ipcMain.on('counter-value',(_event, value)=>{
    console.log(value)
  })
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})