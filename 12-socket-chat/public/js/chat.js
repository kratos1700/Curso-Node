// comprobamos si estamos en produccion o desarrollo
const url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8082/api/auth/'
    : 'https://curso-node-resserver.herokuapp.com/api/auth/';



// VALIDACION JWT
let usuario = null;
let socket = null;


// REFERENCIAS HTML

const txtUid = document.querySelector('#txtUid');
const txtMensaje = document.querySelector('#txtMensaje');
const ulUsuarios = document.querySelector('#ulUsuarios');
const ulMensajes = document.querySelector('#ulMensajes');
const btnSalir = document.querySelector('#btnSalir');

// funcion para validar el token del storage
const validarJWT = async () => {

    // obtenemos el token
    const token = localStorage.getItem('token') || '';

    if (token.length <= 10) {
        // vuelve a la pagina index
        window.location = 'index.html';
        throw new Error('No hay token en el servidor')
    }

    const resp = await fetch(url, {
        headers: { 'x-token': token }
    });


    const { usuario: userDB, token: tokenDB } = await resp.json();
    console.log(userDB, tokenDB);
    // guardamos el nuevo token en el storage
    localStorage.setItem('token', tokenDB);
    // guardamos los datos del usuario  a la variable
    usuario = userDB;
    // ponemos el nombre de usuario como nombre de la pagina web
    document.title = usuario.nombre;

    await conectarSocket();

}

// funcion para establecer la comunicacion al backend server
const conectarSocket = async () => {
    socket = io({
        // io nos permite enviar por parametros headers, le enviamos el token validado y guardado en el localstorage
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });

    // disparamos los eventos cuando el usuario se conecta
    // cuando nos conectamos
    socket.on('connect', () => {
        console.log('Sockets online');
    });
    // cuando nos desconectamos
    socket.on('disconnect', () => {
        console.log('Sockets offline');
    });
    // emitimos al server los mensajes recibidos y usuarios activos
    // cuando recibimos mensajes
    socket.on('recibir-mensajes', () => {

    });
    // para saber los usuarios activos y mostrarlos
    socket.on('usuarios-activos', mostrarUsuarios);

    //para recibir mensajes probados
    socket.on('mensaje-privado', () => {

    });



}

// funcion para mostrar los usuarios al html
const mostrarUsuarios = (usuarios= []) => {
    let userHtml = '';
    //  recorremos los usuarios
    usuarios.forEach(({nombre, uid} ) => {
        // creamos una lista en html para mostrar los usuarios
        userHtml += `
      <li>
        <p>
            <h5 class="text-success">${nombre} </h5>
            <span class="fs-6 text-muted">${uid} </span>
        </p>

      </li>
      
      
      `;

    });

    // lo mostramos a chat.html
    ulUsuarios.innerHTML = userHtml;

}


const main = async () => {

    // validar JWT
    await validarJWT();
}


main();
//


