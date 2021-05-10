const Role = require('../models/role');

// funcion para validar el rol
const esRoleValido = async(rol = '' ) => {
    // comprobamos que existe el rol
    const existeRol = await Role.findOne({rol});
    //si no existe
    if(!existeRol){
            throw new Error(`El rol ${rol}, no existe`)
    }
}

module.exports = {
    esRoleValido
}