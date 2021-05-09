const {response} = require('express');

// funcion para usuarios
const usuariosGet =(req, res = response) => {
    res.json({
        msg: 'get API - controlador'
    });
}


const usuariosPost =(req, res = response) => {
    // .status especificamos el resultado
    res.status(201).json({
        msg: 'Post API - controlador'
    });
}

const usuariosPut =(req, res = response) => {
    res.status(400).json({
        msg: 'Put API - controlador'
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