//importamos el fs para poder escribir archivos
const fs = require('fs');
const colors = require('colors');

const crearArchivo = async (num = 5, listar = false) => {

    try {

       
        let total = 0;
        let salida = '';
    
        for (let i = 0; i <= 10; i++) {
            total = num * i;
            salida  += (`${num} ${`x`.green} ${i} ${`=`.green} ${total}\n`)
    
        }
    
        // comprobamos el el balor de listar sea verdadero para imprimir , 
        //no imprimimos si es falso
        if(listar){
            console.log('==================='.yellow);
            console.log(`   Tabla del ${num} `.rainbow);
            console.log('==================='.yellow);
            console.log(salida);
        }else{
            console.log('');
        }
        


       fs.writeFileSync(`tabala-${num}.txt`, salida);

       return `tabala-${num}.txt`

    } catch (error) {
        throw error
    }








    // pasamos por parametro el nombre del archivo a crear, la variable que queremos guardar y u
    // un callback por si hay un error
    /*fs.writeFile(`tabala-${num}.txt`, salida,(err)=>{
        if(err) throw err;
    
        console.log(`tabala-${num}.txt creada!`)
    })*/

    // mas facil que el writeFile , se usa con el try y catch para controlar los errores



}

// para poder exportar y poder usar la funcion en otro sitio
module.exports = {
    crearArchivo

}