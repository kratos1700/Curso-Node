// funcion para obtener usuarios

import { Request, Response } from "express";

// en typescript tenemos que especificar el tipo de variables
// con export al principio exportamos

// funcion para obtener todos los usuarios
export const getUsuarios=(req : Request, res: Response) =>{

    // mandamos el mensaje de la peticion
    res.json({
        msg:'getUsuarios'
    })

}


// funcion para obtener 1 usuario
export const getUsuario=(req : Request, res: Response) =>{

    const {id} =req.params;
    // mandamos el mensaje de la peticion
    res.json({
        msg:'getUsuario', 
        id
    })

}

// funcion para añadir usuario
export const postUsuario=(req : Request, res: Response) =>{

    const {body} = req;
    // mandamos el mensaje de la peticion
    res.json({
        msg:'postUsuario',
        body

    })

}

// funcion para actualizar usuario
export const putUsuario=(req : Request, res: Response) =>{

    const {id}= req.params;
    const {body} = req;
    // mandamos el mensaje de la peticion
    res.json({
        msg:'putUsuario',
        body,
        id

    })

}
// funcion para eliminar usuario
export const deleteUsuario=(req : Request, res: Response) =>{

    const {id}= req.params;
  
    // mandamos el mensaje de la peticion
    res.json({
        msg:'deleteUsuario',
        id
        

    })

}