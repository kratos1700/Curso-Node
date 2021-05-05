// importamos la clase tarea
const Tarea = require('./tarea');
require ('colors');

// clase tareas
class Tareas{

   _listado = {};

   // metodo get
   get liastadoArray(){
       const listado =[];
       //extraemos las llaves de cada objeto
       Object.keys(this._listado).forEach(key =>{

        const tarea = this._listado[key];
        // añadimos la tarea al listado
        listado.push(tarea);
           

       });
       // retornamo el arreglo
       return listado;
   }

   constructor(){
       this._listado={};
   }

   // funcion para retornar los elementos del array
   cargarTareasFromArray(tareas = []){
  
      tareas.forEach(tarea => {
        this._listado[tarea.id] = tarea;    
      });
       
   }

   // funcion para mostrar en pantalla las tareas
   listadocompleto(){

    // recorremos el arreglo de tareas
    this.liastadoArray.forEach((tarea, i) =>{
        // para iniciar el indice con el 1 en lugar de  0 y ponemos en color verde
        const idx = `${i+1}`.green;
        // desestructuramos la descripcion y completado en
        const {desc, completadoEn} = tarea;
        // comprobamos que completado  existe, asignamos el verde a completado y rojo a pendiente
        const estado = ( completadoEn) ? 'Completada'.green : 'Pendiente'.red; 

        console.log(`${idx}  ${desc} ::   ${estado}`);

    });

   }


   // funcion para crear tareas pasamos por parametro la desc
   crearTarea(desc = ''){
       // creamos una nueva tarea con la descripcion
       const tarea = new Tarea(desc);
        // la id sera la ref de la lista que nos apuntara a la tarea 
       this._listado[tarea.id] = tarea;
   }

}


// para exportar la clase
module.exports = Tareas;
