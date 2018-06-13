// $('.cube-switch .switch').click(function() {
//     if ($('.cube-switch').hasClass('active')) {
//         $('.cube-switch').removeClass('active');
//         $('#light-bulb2').css({'opacity': '1'});
//     } else {
//         $('.cube-switch').addClass('active');
//         $('#light-bulb2').css({'opacity': '0'});
//     }
// });

const ipc = require('electron').ipcRenderer;
const Switch1 = document.getElementById('sw1');
const Switch2 = document.getElementById('sw2');
const Switch3 = document.getElementById('sw3');
const Switch4 = document.getElementById('sw4');

$('#sw1').click(function () {
    console.log("sw1")
    if ($('#sw1').hasClass('active')) {
        $('#sw1').removeClass('active');
        $('#light1').css({ 'opacity': '1' });
        ipc.send('lamp-action', {'lamp1': true})
    }
    else {
        $('.cube-switch, #sw1').addClass('active');
        $('#light1').css({ 'opacity': '0' });
        ipc.send('lamp-action', {'lam1': false})
    }
});

$('#sw2').click(function () {
    console.log("sw2")
    if ($('#sw2').hasClass('active')) {
        $('#sw2').removeClass('active');
        $('#light2').css({ 'opacity': '1' });
        ipc.send('lamp-action', {'lamp2':true})
    }
    else {
        $('#sw2').addClass('active');
        $('#light2').css({ 'opacity': '0' });
        ipc.send('lamp-action', {'lamp2':false})
    }
});

$('#sw3').click(function () {
    console.log("sw3")
    if ($('#sw3').hasClass('active')) {
        $('#sw3').removeClass('active');
        $('#light3').css({ 'opacity': '1' });
        ipc.send('lamp-action', {'lamp3': true})
    }
    else {
        $('#sw3').addClass('active');
        $('#light3').css({ 'opacity': '0' });
        ipc.send('lamp-action', {'lamp3':false})
    }
});

$('#sw4').click(function () {
    console.log("sw4")
    if ($('#sw4').hasClass('active')) {
        $('#sw4').removeClass('active');
        $('#light4').css({ 'opacity': '1' });
        ipc.send('lamp-action', {'lamp4':true})
    }
    else {
        $('#sw4').addClass('active');
        $('#light4').css({ 'opacity': '0' });
        ipc.send('lamp-action', {'lamp4':false})
    }
});