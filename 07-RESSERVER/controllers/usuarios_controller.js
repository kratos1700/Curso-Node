const {response} = require('express');

// funcion para usuarios
const usuariosGet =(req, res = response) => {
    res.json({
        msg: 'get API - controlador'
    });
}


const usuariosPost =(req, res = response) => {
    // constante para recuperar informacion del body
   // const body = req.body;
   //desestructurando el body podemos seleccionar que datos queremos
   const {nombre, edad}=req.body

    // .status especificamos el resultado
    res.status(201).json({
        msg: 'Post API - controlador',
        //body
        nombre,
        edad
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