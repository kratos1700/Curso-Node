const { response } = require("express");


/**
 * FUNCION PARA VALIDAR QUE HAYA UN ARHIVO A SUBIR EN EL BODY 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const validarArchivoSubir = (req, res = response, next) => {
    // comprovamos que en la request viene la propiedad files y la del archivo
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return  res.status(400).json({
            msg: 'No hay archivos en la petición'
        });
        
    }

    next();
}

module.exports = {
    validarArchivoSubir
}


