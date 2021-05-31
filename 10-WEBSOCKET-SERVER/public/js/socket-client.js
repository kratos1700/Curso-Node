/**
 * ARCHIVO DONDE SE CONFIGURARA LOS SOCKETS CON EL SERVIDOR
 */

// referencias del html por id
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');





// es el socket del cliente
const socket = io();

// mostramos mensaje en la parte del front end del cliente
socket.on('connect', () => {
    console.log('Conectado!');
    // mostramos el estatus del html 
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';


})

socket.on('disconnect', () => {
    console.log('Desconectado del servidor!');
    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
})



// funcion de escucha de los clientes
socket.on('enviar-mensaje', (payload)=>{
    console.log(payload);
})



// funcion listener para enviar los datos del textlabel del html
btnEnviar.addEventListener ('click', ()=>{
    // guardamos el valor del mensaje al hacer clic
    const mensaje = txtMensaje.value;
    // podemos poner los atributos que queremos mandar con el payload , Se envian objetos
    const payload= {
        mensaje,
        id: socket.id,
        fecha: new Date().getTime()
    }

    // enviamos un mensaje al servidor
    socket.emit('enviar-mensaje', payload);
    

})