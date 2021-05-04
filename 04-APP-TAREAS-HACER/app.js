
require ('colors');
const { guardarDB } = require('./ayudas/guardarArchivo');
const { inquirerMenu,
        pausa,
        leerInput } = require('./ayudas/inquirer');
const Tareas = require('./models/tareas');
const Tarea = require('./models/tareas');
// la importacion de la funcion se hace auto  al llamar la funcion
//const { mostrarMenu, pausa } = require('./ayudas/mensajes');


console.clear();

const main = async() => {
    

    let opt='';
    // instanciamos las tareas se guardara por uid, tipo firebase i mongodb
    const tareas = new Tareas();

    do{

       
        // con el await esperamos a que devolvamos 
        //creamos el menu y guardamos la opcion seleccionada
      opt =  await  inquirerMenu();
        switch(opt){
            case '1':
                // guardamos texto que introduce el usuario
                const desc = await leerInput('descripción: ');
                // guardamos la desc en el listado de tareas
                tareas.crearTarea(desc);
                break;
            case'2':
            // mostramos el listado de tareas
            //console.log(tareas._listado);
            console.log(tareas.liastadoArray)
                break;
            
        }

        // guardamos las tareas
       // guardarDB(tareas.liastadoArray)

      await pausa();
      // si la opcion es igual a 0 salimos directamente
    // if(opt !=='0') await pausa() ;

    }while(opt !=='0')
    
   

   // pausa();
}

main()

