

// importamos el helper del uploads
const {subirArchivo} = require('../helpers')



const { response } = require("express");



const cargarArchivo = async (req, res = response) => {


    // comprovamos que en la request viene la propiedad files y la del archivo
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({
            msg: 'No hay archivos en la petición'
        });
        return;
    }


    // subimos imagen
   const nombre = await subirArchivo(req.files);
   res.json({
       // mostraba el path donde estava la imagen, al no estar en la carpeta publica el usuario no puede verla
       //path: pathCompleto
       nombre
   });

 

}

module.exports = {
    cargarArchivo
}

//https://github.com/richardgirges/express-fileupload/tree/master/example