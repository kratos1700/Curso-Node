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
                value: 1,
                name: `${'1.'.green}Buscar Ciudad`
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`
            }
        ]
    }



];

const inquirerMenu = async () => {

    // limpiamos consola y mostramos menu
    console.clear();
    console.log('==========================='.green);
    console.log('   Seleccione una opción'.white);
    console.log('===========================\n'.green);


    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

// funcion para pausar a la espera de la seleccion del usuario
const pausa = async () => {

    const pregunt = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'enter'.green} para continuar`
        }
    ];

    console.log('\n');

    await inquirer.prompt(pregunt);
}



// funcion leer entradas
const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            // validamos el valor 
            validate(value) {
                if (value.length === 0) {
                    return 'Porfavor ingrese un valor!'.red;
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

// funcion del menu borrar
const listarLugares = async (lugares = []) => {

    const choices = lugares.map((lugar, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    });

    choices.unshift({
        value:'0', 
        name: '0.'.green + ' Cancelar'    
    });


    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar',
            choices
        }
    ];

    // guardamos el id de la tarea seleccionada
    const { id } = await inquirer.prompt(preguntas);

    return id;
}

// funcion para preguntar la confirmacion de la eliminacion 
const confirmar = async (message) => {
    // el tipo es booleano
    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    // guardamos el id de la tarea seleccionada
    const { ok } = await inquirer.prompt(pregunta);
    return ok;
}




// funcion del menu check
const mostrarListadoChecklist = async (tareas = []) => {

    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });




    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ];

    // guardamos el id de la tarea seleccionada
    const { ids } = await inquirer.prompt(preguntas);

    return ids;
}






// exportamos 
module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoChecklist
}