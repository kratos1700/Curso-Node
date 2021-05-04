// para crear un menu interactivo de consola
const inquirer = require('inquirer');
require('colors');

// creamos las opciones de Menu  arreglo
const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        // opciones del menu
        choices: [
            {
                value:'1',
                name:'1. Crear tarea'
            },
            {
                value:'2',
                name:'2. Ver tareas'
            },
            {
                value:'3',
                name:'3. Ver tareas completadas'
            },
            {
                value:'4',
                name:'4. Ver tareas pendientes'
            },
            {
                value:'5',
                name:'5. Completar tarea(s)'
            },
            {
                value:'6',
                name:'6. Borrar tarea'
            },
            {
                value:'0',
                name:'0. Salir'
            }
        ]
    }



];

const inquirerMenu = async () => {

    // limpiamos consola y mostramos menu
    console.clear();
    console.log('==========================='.green);
    console.log('   Seleccione una opción'.green);
    console.log('===========================\n'.green);


    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;
}

// funcion para pausar a la espera de la seleccion del usuario
const pausa = async () => {

    const pregunt = [
        {
type:'input',
name:'enter',
message:`Presione ${'enter'.green} para continuar`
        }
    ];

    console.log('\n');
    
    await inquirer.prompt(pregunt);
}
// exportamos 
module.exports = {
    inquirerMenu,
    pausa
}