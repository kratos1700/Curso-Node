// importamos la clase tarea
const Tarea = require('./tarea');

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