
const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require ('../models/usuario');


const validarJWT =async (req = request, res = response, next) => {
    // leemos el header x-token es el nombre que nosotros queremos poner
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {

        // funcion para verid¡ficar el token
        // extraemos el uid del payload

       const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);

        // comprobamos que el usuario exista
        if(!usuario){
            return res.status(401).json({
                msg: 'Usuario no existe'
            });
        }

        // verificamos que el usuario no esta marcado en false
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Token No valido  - estado : false'
            });
        }

       // creamos una propiedad nueva en la request y se lo asignamos 
       req.usuario = usuario;
    
        // para continuar con el codigo siguiente
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token No valido'
        });

    }

    //console.log(token);



}

module.exports = {
    validarJWT
}