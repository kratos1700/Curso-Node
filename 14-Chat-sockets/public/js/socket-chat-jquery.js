var params = new URLSearchParams(window.location.search);
var nombre = params.get('nombre');
var sala = params.get('sala');

// REFERENCIAS DE JQUERY
var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');



/**
 * FUNCIONES PARA RENDERIZAR USUARIOS
 */
function renderizarUsuarios(personas) {

    console.log(personas);

    var html = '';

    html += '<li>';
    html += '   <a href="javascript:void(0)" class="active"> Chat de <span> ' + params.get('sala') + '</span></a>';
    html += '</li>';


    for (var i = 0; i < personas.length; i++) {
        html += '<li>';
        html += '    <a data-id="' + personas[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + personas[i].nombre + ' <small class="text-success">online</small></span></a>';
        html += '</li>';

    }

    divUsuarios.html(html)


}




/**
 * FUNCION PARA RENDERIZAR MENSAJES
 */
function renderizarMensajes(mensaje, yo) {


    var html = '';
    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();

    // para mostrar el mensaje del administrador en rojo
    var adminClasses = 'info';
    if (mensaje.nombre === 'Administrador') {
        adminClasses = 'danger'

    }

    if (yo) {

        html += '<li class="reverse">';
        html += '   <div class="chat-content">';
        html += '   <h5>  ' + mensaje.nombre + '</h5>';
        html += '       <div class="box bg-light-inverse"> ' + mensaje.mensaje + '</div>';
        html += '   </div>';
        html += '   <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '   <div class="chat-time">' + hora + '</div>';
        html += '</li>';

    } else {

        html += '<li class="animated fadeIn">';
        if (mensaje.nombre !== 'Administrador') { // si el mensaje es de admin no mostramos la imagen 
            html += '   <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }

        html += '   <div class="chat-content">';
        html += '       <h5>' + mensaje.nombre + '</h5>';
        html += '       <div class="box bg-light-' + adminClasses + '">' + mensaje.mensaje + '</div>.</div>';
        html += '   </div>';
        html += '   <div class="chat-time">' + hora + '</div>';
        html += '</li>';

    }



    // añadimos el codigo para el mensaje
    divChatbox.append(html);

}

/**
 * funcion para el scrooll de mensajes para que siempre
 * se muestre el reciente.
 */
function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}






/**
 * LISTENERS
 */
// funcion para comprobar el click encima de un usuario para 
// obtener el id
divUsuarios.on('click', 'a', function () {

    // variable que gyarda el id de la linia 23 data-id
    var id = $(this).data('id');

    // comprobamos que exista el id donde hacemos click
    if (id) {
        console.log(id);
    }
});

// funcion para enviar mensajes
formEnviar.on('submit', function (e) {
    e.preventDefault();
    // comprobamos que la caja de texto sea igual a 0  i no hacemos nada 
    if (txtMensaje.val().trim().length === 0) {
        return;
    }

    // Enviar información
    socket.emit('crearMensaje', {
        nombre: nombre,
        mensaje: txtMensaje.val()
    }, function (mensaje) {
        txtMensaje.val('').focus();
        // mostramos el mensaje en pantalla
        renderizarMensajes(mensaje, true);
        scrollBottom();
    });


})

