// importamos la version 4 del uuid y lo renombramos por uuidv4
const { v4: uuidv4 } = require('uuid');

// importamos para generar las ubicaciones 
const path = require('path');

/**
 * FUNCION DE SUBIR ARCHIVOS
 * 
 */


// le pasamos el archivo "files" , las estensiones validas y la carpeta donde queremos subir las imagenes
const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise((resolve, reject) => {


        // guardamos el archivo 
        const { archivo } = files;
        // guardamos el nombre del archivo cortado con .
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        // validar la extension
        if (!extensionesValidas.includes(extension)) {
            return reject(`La extension .${extension} no es permitida, use las siguientes extensiones: ${extensionesValidas}`);

        }

        // creamos el archivo concatenando el uuid generado auto con un punto i la extension
        const nombreTemp = uuidv4() + '.' + extension;
        // ubicacion de donde guardamos el archivo
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

        archivo.mv(uploadPath, (err) => {
            // si hay algun error
            if (err) {
                reject(err);
            }

            // si se ha subido correctamente debuelve en nombre
            resolve(nombreTemp);
        });






    })





}


module.exports = {
    subirArchivo
}