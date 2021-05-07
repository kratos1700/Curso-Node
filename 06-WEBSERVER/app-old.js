// preparamos el webserver
const http = require('http');

// request => es lo que quiere el usuario, la peticion
// response =>  es lo que responde el servidor
http.createServer((request, response)=>{
    response.write('Hola Mundo!!');
    response.end();

})
.listen( 8080 );

console.log('Escuchando puero: ', 8080);