// desestructuramos express para usar Router
const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSingin, renovarToken } = require('../controllers/auth_controller');


const { validarCampos, validarJWT } = require('../middlewares');

//const { route } = require('./user');

const rutas = Router();


// creamos la ruta/login y le pasamos la funcion login del controlador
rutas.post('/login', [
    // validamos que haya el mail y pass
        check('correo', 'El correo es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos
], login );


// creamos la ruta para recibir el token de google
rutas.post('/google', [
    // validamos que haya el mail y pass
        check('id_token', 'El id_token es necesario').not().isEmpty(),
        validarCampos
], googleSingin );

// ruta para validar el JWT
rutas.get('/', validarJWT, renovarToken);


module.exports = rutas;

