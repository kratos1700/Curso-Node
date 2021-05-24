// desestructuramos express para usar Router
const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo } = require('../controllers/uploads-controlador');


const { validarCampos } = require('../middlewares/validar-campos');


const rutas = Router();


rutas.post('/',cargarArchivo);



module.exports = rutas;