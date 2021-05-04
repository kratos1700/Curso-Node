// importamos la clase tarea
const Tarea = require('./tarea');

class Tareas{

   _listado = {};

   constructor(){
       this._listado={};
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
module.exports =Tareas;