const { response } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');



//funcion para el login
const login = async (req, res = response) => {

    // extraemos de la req. body el mail y pass
    const { correo, password } = req.body;

    try {
        // verificamos que el email existe
        // buscamos el correo
        const usuario = await Usuario.findOne({ correo });
        // si el usuario no existe
        if (!usuario) {
            // retornamos un error 
            return res.status(400).json({
                msg: 'Usuario / password no son correctos'
            })
        }

        // si el user esta activo
        // si el usuario esta borrado con estado false
        if (!usuario.estado) {
            // retornamos un error 
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - Usuario no existe'
            })
        }

        // verificar pass , comparando el pass pasado por req y el del usuario de la db
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        // si el pas es incorrecto
        if (!validPassword) {
            // retornamos un error 
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - Error pas'
            })
        }

        // generar el JWT
        // guardamos el id usuario
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Pongase en contacto con el admin'
        });

    }

}

// funcion para recibir el token de google
const googleSingin = async (req, res = response) => {
     // recuperamos el id_token de google
     const { id_token } = req.body;

    try {
       

        ///recuperamos el usuario de goole
        const {correo, nombre, imagen} = await googleVerify(id_token);

        // buscamos si existe el usuario por el correo
        let usuario = await Usuario.findOne({correo});
        if(!usuario){
            // tenemos que crear el usuario
            const data ={
                nombre,
                correo,
                password:':P',
                imagen,
                google: true

            };
            // creamos el usuario pasandole la info
            usuario = new Usuario(data);
            // guardamos en bbdd
            await usuario.save();

        }
        // si el usuario en bbd esta borrado , estado :false
        if( !usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        // generamos el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            msg: 'Todo ok! google singin',
            
            
        });

    } catch (error) {
        res.status(400).json({
            msg: 'Token de google no valido',
            
        })
    }



}


module.exports = {
    login,
    googleSingin
}