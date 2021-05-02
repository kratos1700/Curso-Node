//importamos el fs para poder escribir archivos
const fs = require('fs');

const crearArchivo = async (num = 5) => {

    try {

        console.log('===================');
        console.log(`   Tabla del ${num} `);
        console.log('===================');
        let total = 0;
        let salida = '';
    
        for (let i = 0; i <= 10; i++) {
            total = num * i;
            salida  += (`${num} x ${i}= ${total}\n`)
    
        }
    
        console.log(salida);


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