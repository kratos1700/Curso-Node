// importamos uuid para generar ids . le canviamos el nombre a uuidv4
const {v4: uuidv4} = require ('uuid');

class Tarea{

    id='';
    desc='';
    comptetadoEn=null;

    // constructor
    constructor(desc){
        this.id = uuidv4();
        this.desc =desc;
        this.comptetadoEn= null;

    }

}


// para exportar la clase
module.exports =Tarea;