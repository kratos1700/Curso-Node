// importamos dotenv
require('dotenv').config()

const { leerInput, inquirerMenu, pausa, listarLugares } = require("./ayudas/inquirer");
const Busquedas = require("./models/busquedas");




// inicio de la app 
const main = async () => {
    // variable para las opciones seleccionadas
    let opt;
    // instanciamos busquedas
    const busquedas = new Busquedas();


    do {
        // guardamos el valor introducido por el usuario
        opt = await inquirerMenu();

        // comprovamos las opciones
        switch (opt) {
            case 1:
                // TODO
                // mostramos mensage
                const lugar = await leerInput('Ciudad: ');
                // buscamos lugares
                const lugares = await busquedas.ciudad(lugar);
                // seleccionar lugar
                const id = await listarLugares(lugares);

                const lugarSel = lugares.find(l => l.id === id );
                





                // clima

                // Mostrar ciudades


                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:',lugarSel.nombre);
                console.log('Lat: ',lugarSel.lat);
                console.log('Lng',lugarSel.lng);
                console.log('Temperatura:',);
                console.log('Mínima: ',);
                console.log('Máxima: ',);
                break;
            case 2:
                //TODO
                console.log(' Pulsada opcion 2'.red);
                break;

            case 0:
                // todo
                console.log(' Pulsada opcion 0'.blue);
                break;

        }
        await pausa();

    } while (opt !== 0)
}



main();