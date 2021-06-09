
/**
 * Clase para mensaje
 */
class Mensaje{
    constructor(uid, nombre, mensaje){
        this.uid = uid;
        this.nombre = nombre;
        this.mensaje = mensaje;

    }
}







/**
 * Clase para los mensajes de chat
 */
class ChatMensajes {


    constructor(){
        // arreglo de mensajes
        this.mensajes = [];
        // objeto de usuarios
        this.usuarios={};
    }
    // metodos:
    // obtenemos ultimos 10 mensajes
    get ultimos10(){
        // cortamos los 10 primeros mensajes del arriglo con splice
        this.mensajes = this.mensajes.splice(0, 10);
        return this.mensajes;
    }
    // retornamos los valores de usuarios
    get usuariosArr (){
        return Object.values(this.usuarios); // [{user1},{user2}...{user n}]
    }

    // funcion para enviar mensajes
    enviarMensaje(uid, nombre,mensaje){
        // añadimos el mensaje al arreglo de mensajes
        this.mensajes.unshift( new Mensaje(uid, nombre, mensaje));

    }

    // funcion para agregar usuarios
    conectarUsuario(usuario){
        this.usuarios[usuario.id]=usuario

    }
    // eliminamos el usuario
    desconectarUsuario (id){
        delete this.usuarios[id]
    }

}
module.exports = ChatMensajes;