// importamos fs para manipular ficheros
const fs= require('fs');

const archivo = './db/data.json';

// funcion para guardar los datos a un archivo de texto
const guardarDB = (data)=>{

    // JSON.stringify transforma a JSON el objeto
    fs.writeFileSync(archivo, JSON.stringify(data));

}

// funcion para leer datos de la bd
const leerDB =()=>{

    // comprobamos si existe el archivo
    if (!fs.existsSync(archivo)){
        return null;
    }
    // si existe lo leemos
    const info = fs.readFileSync(archivo, {encoding: 'utf-8'});
    // convertimos a objeto  JSON
    const data = JSON.parse(info);
    console.log(data);

    return data;

}

module.exports= {
guardarDB,
leerDB
}

