const { response, request } = require('express');
// importacion para encryptar
const bcryptjs = require('bcryptjs');
// importamos el modelo usuario
const Usuario = require('../models/usuario');


// funcion para recuperar usuarios
const usuariosGet = async (req = request, res = response) => {
    // destructuramos el limete para mostrar los registros
    const { limite = 5, desde = 0 } = req.query;

    // para mostrar los usuarios activos. Los registros no se borran de la bbd
    // se cambian la bandera
    const query = { estado: true };

    /*
        PAGINACION DE REGISTROS
    */

    // recuperamos todos los usuarios de la base de datos
    // para evitar tiempos de espera elevados creamos una coleccion de promesas.
    // se ejecutan las dos a la vez y si una falla , fallan todas
    const [total, usuarios] = await Promise.all([
        // se le pasa el query para que muestre solo el estado a true y no conte los false
        Usuario.countDocuments(query),
        Usuario.find(query)
            //Para mostrar del n al limit
            .skip(Number(desde))
            // con .limit(n) muestra los n primeros registros. 
            //Para castear a numero ponemos Number(String)  
            .limit(Number(limite))

    ])

    res.json({
        total,
        //totalRegistros,
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


const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;

    // lo borramos fisicamente. no se aconseja de hacerlo ya que podemos perder integridad db
    //const usuario = await Usuario.findByIdAndDelete(id);

    // buscamos el usuario por id y lo eliminamos modificando el estado a false
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });


    res.json(usuario);
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


