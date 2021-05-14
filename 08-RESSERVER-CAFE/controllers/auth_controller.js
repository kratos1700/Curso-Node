const { response } = require("express");

const Usuario = require('../models/usuario');



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


    // verificar pass

    // generar el JWT



    res.json({
        msg:'Login ok'
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