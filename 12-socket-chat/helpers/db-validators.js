const { Usuario, Categoria, Producto } = require('../models');
const Role = require('../models/role');
//const Usuario = require('../models/usuario');

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
/**
 * 
 * VALIDADORES PARA PRODUCTOS
 */


const existeProductosPorId = async (id) => {

    // verificacion por id, buscamos si esta en la bbdd
    const existeId = await Producto.findById(id);
    //si no existe
    if (!existeId) {
        throw new Error(`Este id: ${id}  no existe`)

    }

}

/**
 * FUNCION DE VALIDACION DE COLECCIONES PERMITIDAS 
 */
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    // comprobamos que la coleccion pasada este dentro del arreglo de colecciones
    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La coleccion ${coleccion} no esta permitida, use las siguientes: ${colecciones}`);
    }
    // si no hay ningun error devolvemos true ya que hay coleccion
    return true;

}





module.exports = {
    esRoleValido,
    emalExiste,
    existeUserPorId,
    existeCategoriaPorId,
    existeProductosPorId,
    coleccionesPermitidas
}