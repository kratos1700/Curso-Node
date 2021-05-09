const {response, request} = require('express');
// importamos el modelo usuario
const Usuario = require('../models/usuario');

// funcion para usuarios
const usuariosGet =(req= request, res = response) => {
    //querys
    //const query = req.query
    // desestructuramos argumentos
    const{q, nombre, apikey} = req.query;
    res.json({
        msg: 'get API - controlador',
       // query
       q,
       nombre,
       apikey
    });
}


const usuariosPost = async (req, res = response) => {
   
   //desestructurando el body podemos seleccionar que datos queremos
   const body = req.body;
   // instanciamos  usuario pasando los datos enviados por el body
   // si no hay los campos en el modelo mongoose los ignora
   const usuario = new Usuario(body);
   // guarda el usuario a la bbd
   await usuario.save();

    // .status especificamos el resultado
    res.status(201).json({
        msg: 'Post API - controlador',
        usuario
    });
}

const usuariosPut =(req, res = response) => {

    // enviamos algun parametro 
    const id= req.params.id;

    res.status(400).json({
        msg: 'Put API - controlador',
        id
    });
}


const usuariosDelete =(req, res = response) => {
    res.json({
        msg: 'delete API - controlador'
    });
}

const usuariosPatch =(req, res = response) => {
    res.json({
        msg: 'Patch API - controlador'
    });
}


module.exports={
usuariosGet,
usuariosPost,
usuariosPut,
usuariosDelete,
usuariosPatch

}