const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const {crearMensaje} = require('../utilidades/utils');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    // recibimos el listener de la conexion de un usuario
    client.on('entrarChat', (data, callback) => {

        if (!data.nombre) {
            return callback({
                error: true,
                mensaje: 'El nombre es necesario'
            });

        }
        //agregamos el usuario al arreglo. el id lo sacamos de la conexion client
        // que es unico
        let personas = usuarios.agregarPersona(client.id, data.nombre);

        // creamos una notificacion a los demas usuarios que alguien se ha conetado
        client.broadcast.emit('listaPersona', usuarios.getPersonas());
        // retornamos las personas del chat
        callback(personas);
    });


    // controlamos el envio de mensajes de los usuarios
    client.on('crearMensaje',(data)=>{
        // recuperamos los datos para crear el mensaje
        let mensaje = crearMensaje(data.nombre, data.mensaje);
        // nofificamos los mensajes a los otros usuarios
        client.broadcast.emit('crearMensaje', mensaje);


    });




    // controlamos la desconexion de usuarios
    client.on('disconnect', () => {
        //borramos el usuario pasandole el id de la conexion del cliente
        let personaBorrada = usuarios.borrarPersona(client.id);
        // emitimos un evento a los usuarios
        client.broadcast.emit('crearMensaje',crearMensaje('Administrador',`${personaBorrada.nombre} abandonó el chat.`));
        // creamos una notificacion a los demas usuarios que alguien se ha conetado
        client.broadcast.emit('listaPersona', usuarios.getPersonas());

    })

});

