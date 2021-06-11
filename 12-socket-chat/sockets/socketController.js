const { Socket } = require('socket.io');
const { comprobarJWT } = require('../helpers');
const { ChatMensajes } = require('../models');

//creamos una instancia de chat mensajes
const chatMensajes = new ChatMensajes();

const socketController = async (socket = new Socket(), io) => {

    // mostramos en el cmd del server la info del token guardada en el localstorage
    //console.log(socket.handshake.headers['x-token']);

    // verificamos el token cada vez que el cliente se conecte
    const usuario = await comprobarJWT(socket.handshake.headers['x-token']);
    // si el usuario no existe
    if (!usuario) {
        // desconectamos el socket
        return socket.disconnect();
    }
    console.log('Se conecto: '.yellow, usuario.nombre)
    // agregamos el usuario al chat mensajes
    chatMensajes.conectarUsuario(usuario);
    // cuando un usuarios se conecta le mandamos los mensajes del backend
    socket.emit('recibir-mensajes', chatMensajes.ultimos10)


    /**
     * CONECTAR A UNA SALA ESPECIAL ---
     * MANDAR MENSAJES PRIVADOS
     */

    // con join le pasamos el nombre de la sala que queremos crear, en este caso es el uid del usuario
    // cada socket tiene una sala global, una socked.id y la tercera la usuario.id
    socket.join(usuario.id);



    // emitimos a todo el mundo la lista de usuarios
    io.emit('usuarios-activos', chatMensajes.usuariosArr);

    // si se desconecta un socket de usuario
    socket.on('disconnect', () => {
        // eliminar del arreglo cuando un usuario se desconecta
        chatMensajes.desconectarUsuario(usuario.id);
        // emitimos a todo el mundo la lista de usuarios
        io.emit('usuarios-activos', chatMensajes.usuariosArr);
    })

    // enviamos mensajes
    socket.on('enviar-mensaje', ({ uid, mensaje }) => {
        // si existe el uid quiere decir que es un mensaje privado
        if (uid) {
            //mensaje privado
            socket.to(uid).emit('mensaje-privado',{de: usuario.nombre, mensaje})
           

        } else {
            // enviamos el mensaje
            chatMensajes.enviarMensaje(usuario.id, usuario.nombre, mensaje);

            // enviamos la notificacion del envio de mensaje a todos y lo mostramos
            io.emit('recibir-mensajes', chatMensajes.ultimos10);
        }





    })

}




module.exports = {
    socketController
}