const { response } = require('express');
const { Categoria } = require('../models');

/**
 * Funcion para crear las categorias
 * @param {*} req 
 * @param {*} res 
 */
const crearCategoria = async (req, res = response) => {

    // extraemos el nombre que viene en el body y lo hacemos en mayusculas
    const nombre = req.body.nombre.toUpperCase();

    // funcion para comprobar la categoria en bbdd
    const categoriaDB = await Categoria.findOne({ nombre });

    // si la categoria existe mostramos error
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        });
    }


    // generamos la info a guardar
    const data = {
        nombre,
        usuario: req.usuario._id

    }
    // creamos la categoria
    const categoria = new Categoria(data); 

    // guardar a bbd
    await categoria.save();

    res.status(201).json(categoria);

}


module.exports = {
    crearCategoria
}