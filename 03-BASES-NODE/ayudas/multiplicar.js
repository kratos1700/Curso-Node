//importamos el fs para poder escribir archivos
const fs = require('fs');
const colors = require('colors');

const crearArchivo = async (num = 5, listar = false, hasta = 10) => {

    try {

        
        let total = 0;
        let salida = '';
         let consola = '';
    
        for (let i = 0; i <= hasta; i++) {
            total = num * i;
            salida  += (`${num} x ${i} = ${total}\n`)
            consola  += (`${num} ${`x`.green} ${i} ${`=`.green} ${total}\n`)
    
        }
    
        // comprobamos el el balor de listar sea verdadero para imprimir , 
        //no imprimimos si es falso
        if(listar){
            console.log('==================='.yellow);
            console.log(`   Tabla del ${num} `.rainbow);
            console.log('==================='.yellow);
            console.log(consola);
        }else{
            console.log('');
        }
        


       fs.writeFileSync(`./salida/tabala-${num}.txt`, salida);

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