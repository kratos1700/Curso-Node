// importamos la clase tarea
const Tarea = require('./tarea');
require('colors');

// clase tareas
class Tareas {

    _listado = {};

    // metodo get
    get liastadoArray() {
        const listado = [];
        //extraemos las llaves de cada objeto
        Object.keys(this._listado).forEach(key => {

            const tarea = this._listado[key];
            // añadimos la tarea al listado
            listado.push(tarea);


        });
        // retornamo el arreglo
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    // funcion para retornar los elementos del array
    cargarTareasFromArray(tareas = []) {

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });

    }

    // funcion para mostrar en pantalla las tareas
    listadocompleto() {
        // recorremos el arreglo de tareas
        this.liastadoArray.forEach((tarea, i) => {
            // para iniciar el indice con el 1 en lugar de  0 y ponemos en color verde
            const idx = `${i + 1}.`.green;
            // desestructuramos la descripcion y completado en
            const { desc, completadoEn } = tarea;
            // comprobamos que completado  existe, asignamos el verde a completado y rojo a pendiente
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;
            // mostramos la lista
            console.log(`${idx}  ${desc} ::   ${estado}`);
        });

    }

    // funcion para mostrar las listas completadas y pendientes
    listarPendientesCompletadas(completadas = true) {
        let contador = 0;
        // recorremos el arreglo de tareas
        this.liastadoArray.forEach(tarea => {

            // desestructuramos la descripcion y completado en
            const { desc, completadoEn } = tarea;
            // comprobamos que completado  existe, asignamos el verde a completado y rojo a pendiente
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;


            if (completadas) {

                if (completadoEn) {
                    contador += 1;
                    // mostramos la lista
                    console.log(`${contador.toString().green}.  ${desc} ::   ${completadoEn.green}`);
                }

            } else {
                if (!completadoEn) {
                    contador += 1;
                    // mostramos la lista
                    console.log(`${contador.toString().red}.  ${desc} ::   ${estado}`);
                }

            }


        });

    }

    // funcion para borrar una tarea
    borrarTarea(id = ''){

        // compreobamos que exista la tarea
        if( this._listado[id]){
            delete this._listado[id];
        }

    }

    // funcion para actualizar las tareas completadas
    completarTarea(ids =[]){
        // pasa por referencia asi modifica el objeto
        // recorremos los ids
        ids.forEach( id =>{
            const tarea = this._listado[id];
            // si no esta completado y esta marcado  le añadimos la fecha
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.liastadoArray.forEach(tarea=>{
            // recorremos el arreglo para comprobar los ids si estan completados
            if (!ids.includes(tarea.id)){
                // tarea para quitar el completado
                // cambiamos el valor a null del competado
               this._listado[tarea.id].completadoEn= null;
        
            }
        })
    }


    // funcion para crear tareas pasamos por parametro la desc
    crearTarea(desc = '') {
        // creamos una nueva tarea con la descripcion
        const tarea = new Tarea(desc);
        // la id sera la ref de la lista que nos apuntara a la tarea 
        this._listado[tarea.id] = tarea;
    }

}


// para exportar la clase
module.exports = Tareas;
