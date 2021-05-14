const { response } = require("express");
const bcryptjs= require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");



//funcion para el login
const login = async (req, res= response)=>{

// extraemos de la req. body el mail y pass
const {correo, password} = req.body;

try {
    // verificamos que el email existe
    // buscamos el correo
const usuario = await Usuario.findOne({correo});
// si el usuario no existe
if(!usuario){
    // retornamos un error 
    return res.status(400).json({
        msg:'Usuario / password no son correctos'
    })
}

    // si el user esta activo
    // si el usuario esta borrado con estado false
    if(!usuario.estado){
        // retornamos un error 
        return res.status(400).json({
            msg:'Usuario / password no son correctos - Usuario no existe'
        })
    }

    // verificar pass , comparando el pass pasado por req y el del usuario de la db
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    // si el pas es incorrecto
    if(!validPassword){
        // retornamos un error 
        return res.status(400).json({
            msg:'Usuario / password no son correctos - Error pas'
        })
    }

    // generar el JWT
    // guardamos el id usuario
    const token = await generarJWT(usuario.id);

    res.json({
       usuario,
       token
    })

} catch (error) {
    console.log(error);
    res.status(500).json({
        msg: 'Pongase en contacto con el admin'
    });
    
}


    
}




module.exports={
    login
}