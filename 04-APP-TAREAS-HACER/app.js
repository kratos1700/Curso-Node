
require('colors');
const { guardarDB, leerDB } = require('./ayudas/guardarArchivo');
const { inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist } = require('./ayudas/inquirer');
const Tareas = require('./models/tareas');
const Tarea = require('./models/tareas');
// la importacion de la funcion se hace auto  al llamar la funcion
//const { mostrarMenu, pausa } = require('./ayudas/mensajes');


console.clear();

const main = async () => {


  let opt = '';
  // instanciamos las tareas se guardara por uid, tipo firebase i mongodb
  const tareas = new Tareas();

  const tareasDB = leerDB();

  // cargamos los datos del archivo JSON
  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }


  do {


    // con el await esperamos a que devolvamos 
    //creamos el menu y guardamos la opcion seleccionada
    opt = await inquirerMenu();
    switch (opt) {
      case '1':
        // guardamos texto que introduce el usuario
        const desc = await leerInput('descripción: ');
        // guardamos la desc en el listado de tareas
        tareas.crearTarea(desc);
        break;
      case '2':
        // mostramos el listado de tareas
        tareas.listadocompleto()
        break;
      case '3':
        // mostramos el listado de tareas completadas
        tareas.listarPendientesCompletadas(true)
        break;
      case '4':
        // mostramos el listado de tareas no completadas
        tareas.listarPendientesCompletadas(false)
        break;
      case '5':
        //completar o pendiente
       const ids=  await  mostrarListadoChecklist(tareas.liastadoArray);
       tareas.completarTarea(ids);


        break;
      case '6':
        // eliminar tarea, se tiene que esperar a que se cree el menu
        const id = await listadoTareasBorrar(tareas.liastadoArray);
        // comprovamos el valor de la opcion si es diferente de 0
        if (id !== '0') {
          // guardamos la seleccion del usuario
          const confirmacion = await confirmar('Estas seguro de eliminar la tarea??'.red);
          // si es true borramos pasandole el id
          if (confirmacion) {
            tareas.borrarTarea(id);
            console.log('Tarea eliminada correctamente'.green);
          }

        }

        break;

    }

    // guardamos las tareas
    guardarDB(tareas.liastadoArray)

    await pausa();
    // si la opcion es igual a 0 salimos directamente
    // if(opt !=='0') await pausa() ;

  } while (opt !== '0')



  // pausa();
}

main()

