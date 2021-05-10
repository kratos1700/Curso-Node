const { response, request } = require('express');
// importacion para encryptar
const bcryptjs = require('bcryptjs');
// importamos el modelo usuario
const Usuario = require('../models/usuario');


// funcion para recuperar usuarios
const usuariosGet = async (req = request, res = response) => {
    //querys
    //const query = req.query
    // desestructuramos argumentos
    //  const { q, nombre, apikey } = req.query;
    /*
        PAGINACION DE REGISTROS
    */
    // destructuramos el limete para mostrar los registros
    const {limite= 5, desde = 0}= req.query;
    // recuperamos todos los usuarios de la base de datos
    // con .limit(n) muestra los n primeros registros. 
    const usuarios = await Usuario.find()
    //Para mostrar del n al limit
    .skip(Number(desde))
  //Para castear a numero ponemos Number(String)  
    .limit(Number(limite));

    res.json({
        // retornamos todos los usuarios
        usuarios
    });
}


const usuariosPost = async (req, res = response) => {
    // comprobamos que no haya errores en el check


    //desestructurando el body podemos seleccionar que datos queremos
    const { nombre, correo, password, rol } = req.body;
    // instanciamos  usuario pasando los datos enviados por el body
    // si no hay los campos en el modelo mongoose los ignora
    const usuario = new Usuario({ nombre, correo, password, rol });
    // encriptar password
    // salt es el numero de vueltas de codificacion defecto 10
    const salt = bcryptjs.genSaltSync(15);
    // le pasamos el password desestructurado del body y el num vueltas salt
    usuario.password = bcryptjs.hashSync(password, salt);


    // guarda el usuario a la bbd
    await usuario.save();

    // .status especificamos el resultado
    res.status(201).json({
        msg: 'Post API - controlador',
        usuario
    });
}

const usuariosPut = async (req, res = response) => {

    // enviamos algun parametro 
    const { id } = req.params;
    // extraemos lo que no necesitamos
    const { _id, password, google, correo, ...otrasPropiedades } = req.body;
    //TODO validar contra bd
    if (password) {
        // salt es el numero de vueltas de codificacion defecto 10
        const salt = bcryptjs.genSaltSync(15);
        // le pasamos el password desestructurado del body y el num vueltas salt
        otrasPropiedades.password = bcryptjs.hashSync(password, salt);
    }
    // actualiza el usuario buscado por id y lo guarda a la constante usuario
    const usuario = await Usuario.findByIdAndUpdate(id, otrasPropiedades);

    res.json(usuario);
}


const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controlador'
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Patch API - controlador'
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch

}