// comprobamos si estamos en produccion o desarrollo
const url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8082/api/auth/'
    : 'https://curso-node-resserver.herokuapp.com/api/auth/';



// VALIDACION JWT
let usuario = null;
let socket = null;


// funcion para validar el token del storage
const validarJWT = async () => {

    // obtenemos el token
    const token = localStorage.getItem('token') || '';

    if (token.length <= 10) {
        // vuelve a la pagina index
        window.location = 'index.html';
        throw new Error('No hay token en el servidor')
    }

    const resp = await fetch( url, {
        headers: { 'x-token': token }
    });
    
    
    const { usuario: userDB, token: tokenDB} = await resp.json();
    console.log(userDB,tokenDB);
    // guardamos el nuevo token en el storage
    localStorage.setItem('token', tokenDB);
}


const main = async () => {

    // validar JWT
    await validarJWT();
}


main();
//const socket = io();


