const { response, request } = require('express');
const { Producto } = require('../models');
const { populate } = require('../models/categoria');


//obtenerProductoss - paginado - total - populate
const obtenerProductos = async (req = request, res = response) => {
    // destructuramos el limete para mostrar los registros
    const { limite = 5, desde = 0 } = req.query;

    // se cambian la bandera
    const query = { estado: true };
    /*
       PAGINACION DE REGISTROS
   */
    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            // para mostrar el nombre del usuario y categoria
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            //Para mostrar del n al limit
            .skip(Number(desde))
            // con .limit(n) muestra los n primeros registros. 
            //Para castear a numero ponemos Number(String)  
            .limit(Number(limite))
    ]);
    res.json({
        total,
       
        // retornamos todos las productos
        productos
    });

}



//obtenerProducto = populate {}
const obtenerProducto = async (req, res = response) => {

    // enviamos algun parametro 
    const { id } = req.params;

    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');

    res.json(producto);

}



/**
 * Funcion para crear productos
 * @param {*} req 
 * @param {*} res 
 */
const crearProducto = async (req, res = response) => {
    // enviamos algun parametro 
    const { estado, usuario, ...body } = req.body;

    // funcion para comprobar el producto en bbdd
    const productoDB = await Producto.findOne({ nombre: body.nombre });

    // si el producto existe mostramos error
    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre}, ya existe`
        });
    }


    // generamos la info a guardar
    const data = {
        // le pasamos el resto de campos
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id,


    }
    // creamos la categoria
    const producto = new Producto(data);

    // guardar a bbd
    await producto.save();

    res.status(201).json(producto);

}



// actualizarProducto 
const actualizarProducto = async (req, res = response) => {

    // recuperamos id del  parametro 
    const { id } = req.params;
    // extraemos lo que no necesitamos
    const { usuario, estado, ...otrasPropiedades } = req.body;
    // si viene el nombre
    if (otrasPropiedades.nombre) {
        // cambiamos a mayusculas el nombre enviado por el body
        otrasPropiedades.nombre = req.body.nombre.toUpperCase();
    }

    // establecemos el usuario que ha actualizado
    otrasPropiedades.usuario = req.usuario._id;

    const producto = await Producto.findOneAndUpdate(id, otrasPropiedades, { new: true });

    res.json(producto);
}


// borrarProducto - estado :false
const borrarProducto = async (req, res = response) => {


    const { id } = req.params;

    // buscamos por id i actualizamos el valor del estado a false
    const producto = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true })

    res.json(producto);

}





module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto

}