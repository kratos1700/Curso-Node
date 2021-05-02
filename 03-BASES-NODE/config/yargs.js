const argv = require('yargs')
// configuramos opciones  para pasar por consola -n = --num
.option('n', {
    alias: 'num',
    type: 'number',
    demandOption: true,
    describe:'Es la base de la tabla de multiplicar'
})
.check((argv, options)=>{

    if (isNaN(argv.n)){
        throw ' El num tiene que ser un numero'
    }
    // si no hay error retorna true
    return true;
    //console.log('yargs',argv);
}).option('l',{
    alias:'listar',
    type :'boolean',
    demandOption: true,
    default: false,
    describe:'Muestra tabla de multiplicar'


})
.argv;


// para exportar a otras partes de la app con sus paramentros dde opciones
module.exports = argv;