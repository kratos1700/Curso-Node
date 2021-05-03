// https://nodejs.org/es/
// https://www.npmjs.com


// importamos las ayudas multiplicar
const {crearArchivo}= require('./ayudas/multiplicar');
// importamos la config de yargs
const argv = require('./config/yargs');
const colors = require('colors');


console.clear();

// descomponemos el argumento
//const [ , ,arg3= 'base=5'] = process.argv
// descomponemos el argumento 3 desde el = i nos quedamos la parte de la derecha
//const[ ,num] = arg3.split('=')

//console.log(process.argv);
//console.log(argv);

//console.log('num: yargs', argv.num);


//console.log(num);


//let num= 6;

// recordar de pasar los parametros creados en las opciones de yargs
crearArchivo(argv.n, argv.l, argv.h)
.then(nombreArchivo => console.log(nombreArchivo, 'creada' .green))
.catch(err => console.log (err));


