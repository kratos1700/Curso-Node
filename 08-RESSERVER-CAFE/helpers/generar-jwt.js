// importamos el JWT
const jwt = require('jsonwebtoken');

// creamos la promesa

const generarJWT = (uid = '') => {

    return new Promise((resolve, reject) => {

        // datos a guardar en el payload
        const payload = { uid };

        // firmamos el token, pasando la clave creada y se le puede pasar opciones 
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
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

module.exports = {
    generarJWT
}