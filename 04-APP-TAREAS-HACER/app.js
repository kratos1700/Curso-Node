
require ('colors');
// la importacion de la funcion se hace auto  al llamar la funcion
const { mostrarMenu, pausa } = require('./ayudas/mensajes');


console.clear();

const main = async() => {
    console.log('HOLA MUNDO');

    let opt='';

    do{
        // con el await esperamos a que devolvamos 
        //la opcion seleccionada retornada por la promesa del menu
      opt =  await  mostrarMenu();
      // si la opcion es igual a 0 salimos directamente
     if(opt !=='0') await pausa();

    }while(opt !=='0')
    
   

   // pausa();
}

main()