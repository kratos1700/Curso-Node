const {response, request} = require('express');

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