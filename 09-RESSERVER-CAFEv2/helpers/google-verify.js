// informacion de https://developers.google.com/identity/sign-in/web/backend-auth

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


const googleVerify = async (idToken = '') => {

    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    // desestructuramos el payload de google para utilizar los campos que nos interesan
    // i asignamos los nombre como los tenemos en el modelo
    const { name: nombre,
            picture: imagen,
            email: correo } = ticket.getPayload();

    // retornamos los datos
    return { nombre, imagen, correo };

}


module.exports = {
    googleVerify
}
