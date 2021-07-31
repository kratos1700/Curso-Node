var socket = io();

var params =new URLSearchParams(window.location.search);
if (!params.has('nombre')){
    // redireccionamos al index.html
    window.location= 'index.html';
    throw new Error('El nombre es necesario');
}
// creamos el usuario recibiendo el nombre del parametro ( ...chat.html?nombre=pepet)
var usuario ={
    nombre:params.get('nombre')
};

socket.on('connect', function() {
    console.log('Conectado al servidor');
    // enviamos un mensaje de que alguien se ha conectado, si el server nos acepta
    // ejecutamos el callback
    socket.emit('entrarChat',usuario, function(resp){
        console.log('Usuarios conectados: ',resp);

    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
/* socket.emit('crearMensaje', {
    usuario: '...',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
}); */

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

// Escuchar información de usuarios que entran y salen del chat
socket.on('listaPersona', function(personas) {

    console.log( personas);

});