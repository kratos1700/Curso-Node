/**
 * Controlador de busquedas
 *
 */

const { response } = require("express");
const { ObjectId } = require('mongoose').Types;

const { Usuario, Categoria, Producto } = require('../models');

// colecciones que existen en la bbdd
const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];


/**
 * FUNCION PARA REALIZAR BUSQUEDAS DE USUARIO
 * @param {*} termino 
 * @param {*} res 
 */

const buscarUsuarios = async (termino = '', res = response) => {

    // comprobamos que sea un Id valido en bbdd
    const isMongoID = ObjectId.isValid(termino);
    if (isMongoID) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            // si el usuario existe devuelvo el usuario , si no debuelvo el arreglo vacio
            results: (usuario) ? [usuario] : []
        });
    }

    //  expresion regular para realizar busquedas sensitivas
    const regex = new RegExp(termino, 'i');


    // buscamos por nombre nombre:termino 
    const usuarios = await Usuario.find({
        // expresion OR condicional
        $or: [{ nombre: regex }, { correo: regex }],
        //para que salgan solo los activos
        $and: [{ estado: true }]

    });

    res.json({
        results: usuarios
    });

}



/**
 * FUNCION PARA REALIZAR BUSQUEDAS DE CATEGORIAS
 * @param {*} termino 
 * @param {*} res 
 */

 const buscarCategorias = async (termino = '', res = response) => {

    // comprobamos que sea un Id valido en bbdd
    const isMongoID = ObjectId.isValid(termino);
    if (isMongoID) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            // si la categoria existe devuelvo la categoria , si no debuelvo el arreglo vacio
            results: (categoria) ? [categoria] : []
        });
    }

    //  expresion regular para realizar busquedas sensitivas
    const regex = new RegExp(termino, 'i');


    // buscamos por nombre nombre:termino 
    const categorias = await Categoria.find({
        nombre: regex , estado: true 

    });

    res.json({
        results: categorias
    });

}





/**
 * FUNCION PARA REALIZAR BUSQUEDAS DE PRODUCTOS
 * @param {*} termino 
 * @param {*} res 
 */

 const buscarProductos = async (termino = '', res = response) => {

    // comprobamos que sea un Id valido en bbdd
    const isMongoID = ObjectId.isValid(termino);
    if (isMongoID) {
        const producto = await Producto.findById(termino).populate('categoria','nombre');
        return res.json({
            // si el producto existe devuelvo lo devuelvo , si no devuelvo el arreglo vacio
            results: (producto) ? [producto] : []
        });
    }

    //  expresion regular para realizar busquedas sensitivas
    const regex = new RegExp(termino, 'i');


    // buscamos por nombre nombre:termino 
    const productos = await Producto.find({
        // expresion OR condicional
        $or: [{ nombre: regex }],
        //para que salgan solo los activos
        $and: [{ estado: true }]

    }).populate('categoria','nombre');

    res.json({
        results: productos
    });

}







/**
 * FUNCION PARA BUSCAR
 * @param {*} req 
 * @param {*} res 
 */
const buscar = (req, res = response) => {

    // extraemos de los parametros la coleccion y el termino para la busqueda
    // son los argumentos de la ruta busqueda
    const { coleccion, termino } = req.params;

    // comprobamos que haya la coleccion a buscar
    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })

    }


    // comprovamos la coleccion a buscar
    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'categorias':
            buscarCategorias(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;

        default:
            res.status(500).json({
                msg: 'Se olvido hacer esta busqueda'

            });
            break;
    }




}

module.exports = {

    buscar
}