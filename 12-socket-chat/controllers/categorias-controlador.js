const { response, request } = require('express');
const { Categoria } = require('../models');
const { populate } = require('../models/usuario');


//obtenerCategorias - paginado - total - populate
const obtenerCategorias =async (req = request, res = response) =>{
     // destructuramos el limete para mostrar los registros
     const { limite = 5, desde = 0 } = req.query;

      // se cambian la bandera
    const query = { estado: true };
     /*
        PAGINACION DE REGISTROS
    */
   const [total, categorias] =  await Promise.all([
       Categoria.countDocuments(query),
       Categoria.find(query)
       // para mostrar el nombre del usuario
       .populate('usuario', 'nombre')
        //Para mostrar del n al limit
        .skip(Number(desde))
        // con .limit(n) muestra los n primeros registros. 
        //Para castear a numero ponemos Number(String)  
        .limit(Number(limite))
   ]);
   res.json({
    total,
    //totalRegistros,
    // retornamos todos las categorias
    categorias
});

}

//obtenerCategoria = populate {}
const obtenerCategoria= async (req, res = response) =>{

     // enviamos algun parametro 
     const { id } = req.params;

     const categoria = await Categoria.findById(id).populate('usuario', 'nombre');   

     res.json(categoria);

}




/**
 * Funcion para crear las categorias
 * @param {*} req 
 * @param {*} res 
 */
const crearCategoria = async (req, res = response) => {
     // enviamos algun parametro 
     const { id } = req.params;

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



// actualizarCategoria 
const actualizarCategoria= async (req, res = response) => {

      // recuperamos id del  parametro 
      const { id } = req.params;
      // extraemos lo que no necesitamos
      const { _id, usuario, estado, ...otrasPropiedades } = req.body;
      // cambiamos a mayusculas el nombre enviado por el body
      otrasPropiedades.nombre = req.body.nombre.toUpperCase();
      // establecemos el usuario que ha actualizado
      otrasPropiedades.usuario = req.usuario._id;

      const categoria = await Categoria.findOneAndUpdate(id, otrasPropiedades, {new :true});

      res.json(categoria);
}


// borrarCategoria - estado :false
const borrarCategoria = async (req, res = response) => {


    const { id } = req.params;

    // buscamos por id i actualizamos el valor del estado a false
    const categoria = await Categoria.findByIdAndUpdate(id,{estado:false},  {new :true})

    res.json(categoria);

}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    borrarCategoria,
    actualizarCategoria,
    obtenerCategoria
}