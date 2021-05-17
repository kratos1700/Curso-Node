// desestructuramos express para usar Router
const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth_controller');

const { validarCampos } = require('../middlewares/validar-campos');

//const { route } = require('./user');

const rutas = Router();


// creamos la ruta/login y le pasamos la funcion login del controlador
rutas.post('/login', [
    // validamos que haya el mail y pass
        check('correo', 'El correo es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos
], login );




module.exports = rutas;

