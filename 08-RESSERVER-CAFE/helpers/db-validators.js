const Role = require('../models/role');
const Usuario = require('../models/usuario');

// funcion para validar el rol
const esRoleValido = async(rol = '' ) => {
    // comprobamos que existe el rol
    const existeRol = await Role.findOne({rol});
    //si no existe
    if(!existeRol){
            throw new Error(`El rol ${rol}, no existe`)
    }
}

// funcion para validar el correo
const emalExiste = async(correo='') =>{

// verificacion correo existe
const existeEmail = await Usuario.findOne({correo});
//si existe
if(existeEmail){
    throw new Error(`Este correo ya ${correo}, esta en uso`)
    // retornamos un mensage 400
   /*  return res.status(400).json({
        msg: `Este correo ya ${correo},esta en uso`
    }) */

}

}

module.exports = {
    esRoleValido,
    emalExiste
}