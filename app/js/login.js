const ipc = require('electron').ipcRenderer;
const syncBtnLogin = document.getElementById('btnLogin');

function validateForm(){
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    if(username === '')
        alert('Bạn chưa nhập tên đăng nhập');
    else if(password === '')
        alert('Bạn chưa nhập mật khẩu');
    else{
        return {username, password};
    }
    return false;
}

syncBtnLogin.addEventListener('click', ()=>{
    const reply = ipc.sendSync('login-require', validateForm());
    console.log(reply);
    if(reply == "Login success") {
        ipc.sendSync('app-init', true);
        document.getElementById('msgLogin').innerHTML = "Đăng nhập thành công!"
    }
    else {
        document.getElementById('msgLogin').innerHTML = "Đăng nhập thất bại!"
    }
});