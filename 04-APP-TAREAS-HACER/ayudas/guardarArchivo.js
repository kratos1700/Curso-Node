// importamos fs para manipular ficheros
const fs= require('fs');

// funcion para guardar los datos a un archivo de texto
const guardarDB = (data)=>{
    const archivo = './db/data.json'

    // JSON.stringify transforma a JSON el objeto
    fs.writeFileSync(archivo, JSON.stringify(data));

}


module.exports= {
guardarDB
}