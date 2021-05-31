/**
 * en este archivo hay los controladores de la comunicacion de los sockets
 * 
 */


const socketController = (socket) => {

    console.log('Cliente Conectado!'.green, socket.id)

    socket.on('disconnect', () => {
        console.log('Cliente Desconectado'.red, socket.id)
    });

    // escuchamos lo que envia el cliente desde el servidor, 
    //el payload es donde esta la info que enviamos desde el html
    socket.on('enviar-mensaje', (payload, callback) => {
        const id = 123456;
        // le mandamos el id por el callback, linia 55 del socket-client.js
        callback({id, fecha: new Date().getTime()});
        // Ejemplo de recibir mensajes desde el front end
        //console.log('Recibiendo mensajes del cliente ... : '.yellow )
        //console.log(payload)

        //------ ENVIAR MENSAJES A OTROS CLIENTES--------------
        // con broadcast se envia un mensaje a todos los clientes monos a quien lo emite
        socket.broadcast.emit('enviar-mensaje', payload);

    })
}






module.exports = {
    socketController
}