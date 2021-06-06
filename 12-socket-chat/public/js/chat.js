// comprobamos si estamos en produccion o desarrollo
const url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8082/api/auth/'
    : 'https://curso-node-resserver.herokuapp.com/api/auth/';



// VALIDACION JWT
let usuario = null;
let socket = null;


// REFERENCIAS HTML

const txtUid = document.querySelector('#txtUid')
const txtMensaje= document.querySelector('#txtMensaje')
const ulUsuarios= document.querySelector('#ulUsuarios')
const ulMensajes= document.querySelector('#ulMensajes')
const btnSalir= document.querySelector('#btnSalir')

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
    const socket = io({
        // io nos permite enviar por parametros headers, le enviamos el token validado y guardado en el localstorage
        'extraHeaders':{
            'x-token': localStorage.getItem('token')
        }
    });

}


const main = async () => {

    // validar JWT
    await validarJWT();
}


main();
//


