/**
 * Funcion para enviar mensajes
 * @param {*} nombre  Nombre Usuario
 * @param {*} mensaje Contenido a Enviar
 */
const crearMensaje = (nombre, mensaje) => {

    return { 
        nombre,
        mensaje,
        fecha: new Date().getTime() // enviamos la fecha en que se envio el mensaje
    }

}

module.exports = {
    crearMensaje
}