
const { resolve } = require('path');

require('colors');

// funcion para crear  el menu
const mostrarMenu = () => {

    // retornamos una promesa
    return new Promise((resolve => {

        // limpiamos consola y mostramos menu
        console.clear()
        console.log('==========================='.green);
        console.log('   Seleccione una opción'.green);
        console.log('===========================\n'.green);

        console.log(`${'1.'.green} Crear tarea`);
        console.log(`${'2.'.green} Ver tareas`);
        console.log(`${'3.'.green} Ver tareas completadas`);
        console.log(`${'4.'.green} Ver tareas pendientes`);
        console.log(`${'5.'.green} Completar tarea(s)`);
        console.log(`${'6.'.green} Borrar tarea`);
        console.log(`${'0.'.green} Salir \n`);

        // funcion para poder recibir datos por teclado
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        // preguntamos al usuario una opcion 
        readLine.question('Selecciones una opcion: ', (opt) => {

            // se tiene que cerrar para no tener problemas en los datos
            readLine.close();

            resolve(opt);
        })


    }));


}

const pausa = () => {

    // retornamos una promesa
    return new Promise((resolve => {

        // funcion para poder recibir datos por teclado
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });


        // preguntamos al usuario una opcion 
        readLine.question(`\nPresione ${'ENTER'.green} para continuar\n`, (opt) => {

            // se tiene que cerrar para no tener problemas en los datos
            readLine.close();
            resolve();
        })


    }));

}


// para exportar la función
module.exports = {
    mostrarMenu,
    pausa
}