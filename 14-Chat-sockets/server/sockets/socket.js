const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const {crearMensaje} = require('../utilidades/utils');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    // recibimos el listener de la conexion de un usuario
    client.on('entrarChat', (data, callback) => {

        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            });

        }
        // para comprobar los usuarios en la misma sala reciban los mensajes
        client.join(data.sala);
        //agregamos el usuario al arreglo. el id lo sacamos de la conexion client
        // que es unico
        usuarios.agregarPersona(client.id, data.nombre, data.sala);

        // creamos una notificacion a los demas usuarios que alguien se ha conetado dentro de la misma
        // sala de chat. se hace con el .to(parametroSala)
        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala));



        // emitimos un evento a los usuarios
        client.broadcast.to(data.sala).emit('crearMensaje',crearMensaje('Administrador',`${data.nombre} se unió al chat.`));

        // retornamos las personas del chat
        callback(usuarios.getPersonasPorSala(data.sala));
    });


    // controlamos el envio de mensajes de los usuarios
    client.on('crearMensaje',(data,callback)=>{
        //obtenemos el usuario para pasar el nombre al mensaje
        let persona = usuarios.getPersona(client.id);
        // recuperamos los datos para crear el mensaje
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        // nofificamos los mensajes a los otros usuarios
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);

       

        callback(mensaje);


    });




    // controlamos la desconexion de usuarios
    client.on('disconnect', () => {
        //borramos el usuario pasandole el id de la conexion del cliente
        let personaBorrada = usuarios.borrarPersona(client.id);
        // emitimos un evento a los usuarios
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje',crearMensaje('Administrador',`${personaBorrada.nombre} abandonó el chat.`));
        // creamos una notificacion a los demas usuarios que alguien se ha conetado
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala));

    })


    /**
     * MENSAJES PRIVADOS
     */

    client.on('mensajePrivado',data =>{
        //persona que manda el mensaje
        let persona = usuarios.getPersona(client.id);

        // enviamos el mensaje al usuario en concreto utilizando el .to(parametro) en este caso el id de la conexion
        client.broadcast.to(data.para).emit('mensajePrivado',crearMensaje(persona.nombre,data.mensaje));
    })

});

