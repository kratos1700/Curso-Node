// importamos el JWT
const jwt = require('jsonwebtoken');
// importamos el modelo usuario 
const { Usuario } = require('../models')

// creamos la promesa

const generarJWT = (uid = '') => {

    return new Promise((resolve, reject) => {

        // datos a guardar en el payload
        const payload = { uid };

        // firmamos el token, pasando la clave creada y se le puede pasar opciones 
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            // tiempo de 3 h 
            expiresIn: '3h'
        },
            // si da error al generar el token
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject('No se puede generar JWT')
                    // si se creo correctamente lo devolvemos
                } else {
                    resolve(token);
                }
            })

    })
}

// funcion para comprobar el JWT en la conexion socket
const comprobarJWT = async (token = '') => {
    try {
        // comprobamos el token sea mayor a 10 de longitud
        if (token.length < 10) {

            return null;
        }

        // comprovamos el uid que viene del JWT
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // buscamos el usuario por el uid extraido
        const usuario = await Usuario.findById(uid);
        // si el usuario existe
        if(usuario){
            // si el estado es true y no esta marcado como borrado
            if(usuario.estado){
                return usuario;
            }else{
                return null;
            }
            
        }else{
            return null;
        }


    } catch (error) {
        return null;
    }

}

module.exports = {
    generarJWT,
    comprobarJWT
}