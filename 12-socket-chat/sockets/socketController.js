const { Socket } = require('socket.io');
const { comprobarJWT } = require('../helpers')




const socketController = async (socket) => {

    // mostramos en el cmd del server la info del token guardada en el localstorage
    //console.log(socket.handshake.headers['x-token']);

    // verificamos el token cada vez que el cliente se conecte
    const usuario =await comprobarJWT(socket.handshake.headers['x-token']);
    // si el usuario no existe
    if(!usuario){
        // desconectamos el socket
        return socket.disconnect();
    }
console.log( 'Se conecto: '.yellow, usuario.nombre)
}




module.exports = {
    socketController
}