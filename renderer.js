// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const btn = document.getElementById('btn')
const filePathElement = document.getElementById('filePath')

btn.addEventListener('click', async () => {
  const filePath = await window.electronAPI.readFile()
  filePathElement.innerText = filePath
})

const counter = document.getElementById('counter')

window.electronAPI.handleCounter((event, value) => {
    const oldValue = Number(counter.innerText)
    const newValue = oldValue + value
    counter.innerText = newValue
    event.sender.send('counter-value', newValue)
})

const setButton = document.querySelector('#btn2')
const titleInput = document.getElementById('title')
setButton.addEventListener('click', () => {
    const title = titleInput.value
    window.electronAPI.writeFile(title)
});

const NOTIFICATION_TITLE = 'Title'
const NOTIFICATION_BODY = 'Notification from the Renderer process. Click to log to console.'
const CLICK_MESSAGE = 'Notification clicked!'

document.getElementById("btn3").addEventListener('click',()=>{
  new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY }).onclick = () => window.electronAPI.toBackendConsole(CLICK_MESSAGE)
})

function timer(){
  let time = new Date()

    check(time)

    setTimeout(() => {
        timer()
    }, 1000)
}

function check(d){
  //window.electronAPI.toBackendConsole(d.toString())
  document.getElementById('timestamp').innerText = d.toTimeString()
}

timer()