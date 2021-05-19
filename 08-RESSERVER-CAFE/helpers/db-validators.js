const { Categoria } = require('../models');
const Role = require('../models/role');
const Usuario = require('../models/usuario');

// funcion para validar el rol
const esRoleValido = async (rol = '') => {
    // comprobamos que existe el rol
    const existeRol = await Role.findOne({ rol });
    //si no existe
    if (!existeRol) {
        throw new Error(`El rol ${rol}, no existe`)
    }
}

// funcion para validar el correo
const emalExiste = async (correo = '') => {

    // verificacion correo existe
    const existeEmail = await Usuario.findOne({ correo });
    //si existe
    if (existeEmail) {
        throw new Error(`Este correo ya ${correo}, esta en uso`)
        // retornamos un mensage 400
        /*  return res.status(400).json({
             msg: `Este correo ya ${correo},esta en uso`
         }) */

    }

}


// funcion para validar el id
const existeUserPorId = async (id) => {

    // verificacion por id, buscamos si esta en la bbdd
    const existeId = await Usuario.findById(id);
    //si no existe
    if (!existeId) {
        throw new Error(`Este id: ${id}  no existe`)

    }

}
/**
 * 
 * VALIDADORES PARA CATEGORIAS
 */

// funcion para validar el id
const existeCategoriaPorId = async (id) => {

    // verificacion por id, buscamos si esta en la bbdd
    const existeId = await Categoria.findById(id);
    //si no existe
    if (!existeId) {
        throw new Error(`Este id: ${id}  no existe`)

    }

}





module.exports = {
    esRoleValido,
    emalExiste,
    existeUserPorId,
    existeCategoriaPorId
}