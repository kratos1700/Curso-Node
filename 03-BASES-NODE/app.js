// https://nodejs.org/es/


// importamos las ayudas multiplicar
const {crearArchivo}= require('./ayudas/multiplicar')

console.clear();


let num= 6;

crearArchivo(num)
.then(nombreArchivo => console.log(nombreArchivo, 'creada'))
.catch(err => console.log (err));


