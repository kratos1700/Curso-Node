// funcion para obtener usuarios

import { Request, Response } from "express";
import { json } from 'sequelize/types';
import Usuario from '../models/usuario';

// en typescript tenemos que especificar el tipo de variables
// con export al principio exportamos

// funcion para obtener todos los usuarios
export const getUsuarios = async (req: Request, res: Response) => {

    const usuarios = await Usuario.findAll();

    // mandamos el mensaje de la peticion
    res.json({
        usuarios
    })

}


// funcion para obtener 1 usuario
export const getUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;


    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
        res.status(404).json({
            msg: `El usuario con el id: ${id}, no existe`
        })
    } else {
        // mandamos el mensaje de la peticion
        res.json(usuario);
    }


}

// funcion para añadir usuario
export const postUsuario = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        
        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if (existeEmail) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con el email ' + body.email
            });
        }

// añadido el build por que dava error
        const usuario = Usuario.build(body);
        await usuario.save();

        res.json( {usuario} );


    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })    
    }




}

// funcion para actualizar usuario
export const putUsuario = async(req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;
    // mandamos el mensaje de la peticion
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg:`No existe ningun usuario con el ${id}`
            });
        }

        // enviamos el body con los datos actualizados

        await usuario.update(body)

        res.json(usuario);
       


    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })    
    }

}
// funcion para eliminar usuario
export const deleteUsuario = async(req: Request, res: Response) => {

    const { id } = req.params;


    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        return res.status(404).json({
            msg:`No existe ningun usuario con el ${id}`
        });

    }

        /**
         * ELIMINACION FISICA
         */
       // await usuario.destroy();
       
        /**
         * ELIMINACION LOGICA
         */
        await usuario.update({estado:false}); // actualizamos solo el estado a falso
       
       
       
        res.json(usuario)

}