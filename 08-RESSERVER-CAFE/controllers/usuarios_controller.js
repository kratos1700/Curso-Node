const { response, request } = require('express');
// importacion para encryptar
const bcryptjs = require('bcryptjs');
// importamos el modelo usuario
const Usuario = require('../models/usuario');
// para recuperar el check de las rutas
const { validationResult }= require ('express-validator');

// funcion para usuarios
const usuariosGet = (req = request, res = response) => {
    //querys
    //const query = req.query
    // desestructuramos argumentos
    const { q, nombre, apikey } = req.query;
    res.json({
        msg: 'get API - controlador',
        // query
        q,
        nombre,
        apikey
    });
}


const usuariosPost = async (req, res = response) => {
    // comprobamos que no haya errores en el check
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    //desestructurando el body podemos seleccionar que datos queremos
    const { nombre, correo, password, rol } = req.body;
    // instanciamos  usuario pasando los datos enviados por el body
    // si no hay los campos en el modelo mongoose los ignora
    const usuario = new Usuario({ nombre, correo, password, rol });
    

    // verificacion correo existe
    const existeEmail = await Usuario.findOne({correo});
    //si existe
    if(existeEmail){
        // retornamos un mensage 400
        return res.status(400).json({
            msg: 'Este correo ya esta en uso'
        })

    }

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

const usuariosPut = (req, res = response) => {

    // enviamos algun parametro 
    const id = req.params.id;

    res.status(400).json({
        msg: 'Put API - controlador',
        id
    });
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