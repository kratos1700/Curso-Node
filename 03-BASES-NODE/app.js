// https://nodejs.org/es/
// https://www.npmjs.com


// importamos las ayudas multiplicar
const {crearArchivo}= require('./ayudas/multiplicar');
// importamos la config de yargs
const argv = require('./config/yargs');


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

crearArchivo(argv.n, argv.l)
.then(nombreArchivo => console.log(nombreArchivo, 'creada'))
.catch(err => console.log (err));


