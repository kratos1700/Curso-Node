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
                // controlamos que el al pulsar 0 volvamos al menu
                if (id === '0') continue;


                const lugarSel = lugares.find(l => l.id === id);

                // guardar bbdd
                busquedas.guardarHistorial(lugarSel.nombre);

                // clima
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);

                // Mostrar ciudades

                console.clear();
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', lugarSel.nombre.green);
                console.log('Lat: ', lugarSel.lat);
                console.log('Lng', lugarSel.lng);
                console.log('El tiempo esta: ', clima.des.green);
                console.log('Temperatura:', clima.temp);
                console.log('Mínima: ', clima.min);
                console.log('Máxima: ', clima.max);
                break;
            case 2:
                //TODO
                busquedas.historial.forEach((lugar, i) => {
                    const idx = `${i+1}.`.green;
                    console.log(`${idx} ${lugar}`);
                })

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

