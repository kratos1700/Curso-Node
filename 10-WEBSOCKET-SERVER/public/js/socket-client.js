/**
 * ARCHIVO DONDE SE CONFIGURARA LOS SOCKETS CON EL SERVIDOR
 */

// referencias del html
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');






// es el socket del cliente
const socket = io();

// mostramos mensaje en la parte del front end del cliente
socket.on ('connect', ()=>{
    console.log('Conectado!');
    // mostramos el estatus del html 
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
    

})

socket.on ('disconnect', ()=>{
    console.log('Desconectado del servidor!');
    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
})