const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const SerialPort = require('serialport');
const port = new SerialPort("COM4", { baudRate: 9600 });
const Readline = SerialPort.parsers.Readline;
const ByteLength = SerialPort.parsers.ByteLength;
const parser = new Readline('\r\n');
port.pipe(parser);
parser.on('data', (data) => {
    var str = data.toString('utf8');
    console.log(str);
});
// port.write('Node send\n');

let mainWindow;
let loginWindow;

function createLoginWindow() {
    loginWindow = new BrowserWindow({
        width: 480,
        height: 360,
        frame: false,
        resizable: false,
        backgroundColor: '#FFF',
        alwaysOnTop: false,
        show: true
    });
    //loginWindow.webContents.openDevTools();
    loginWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/app/login.html'),
        protocol: 'file:',
        slashes: true
    }));
    loginWindow.on('closed', () => {
        loginWindow = null;
    });
    loginWindow.once('ready-to-show', () => {
        loginWindow.show();
        createMainWindow();
    });
}

ipcMain.on('login-require', (event, arg) => {
    if (arg.username === "admin" && arg.password === "admin")
        event.returnValue = 'Login success';
    else
        event.returnValue = 'Login fail';
});

ipcMain.on('app-init', (event, arg) => {
    if (arg) {
        setTimeout(() => {
            loginWindow.close();
        }, 500);
    }
    mainWindow.show();
});

ipcMain.on('lamp-action', (event, arg)=> {
    console.log(arg);
    port.write('action\r\n');
})

function createMainWindow() {
    mainWindow = new BrowserWindow({ 
        width: 1024, 
        height: 720, 
        show: false 
    });
    mainWindow.webContents.openDevTools();
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/app/index.html'),
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createLoginWindow);

app.on('ready', createMainWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (systemWindow === null) createMainWindow() ;
});

