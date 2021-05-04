const inquirer = require('inquirer');
require('colors');

// creamos las opciones de Menu  arreglo
const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: ['opt1', 'opt2', 'opt3']
    }



];

const inquirerMenu = async () => {

    // limpiamos consola y mostramos menu
    console.clear();
    console.log('==========================='.green);
    console.log('   Seleccione una opción'.green);
    console.log('===========================\n'.green);


    const opts = await inquirer.prompt(preguntas);

    return opts;
}


// exportamos 
module.exports = {
    inquirerMenu
}