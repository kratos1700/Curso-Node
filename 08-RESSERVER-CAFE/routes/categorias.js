// desestructuramos express para usar Router
const { Router } = require('express');
const { check } = require('express-validator');

const {validarCampos,
    validarJWT,
    isAdminRole,
    tieneRole
}= require ('../middlewares')
const {crearCategoria} = require('../controllers/categorias-controlador')


//const { route } = require('./user');

const rutas = Router();

/**
 * {{url}}/api/categorias
 */

/**
 * Obtener todas las categorias, Publico
 */
rutas.get('/', (req, res) => {
    res.json('get');
});

/**
 * Obtener una categoria por id, Publico
 */
 rutas.get('/:id', (req, res) => {
    res.json('get - id');
});

/**
 * Crear categoria , Privado, cualquier rol
 */
 rutas.post('/',[
     // validamos el JWT
     validarJWT,
     // comprobamos que haya el nombre
     check('nombre', 'El nombre es obligatorio').not().isEmpty(),
     // validamos los campos
     validarCampos

], crearCategoria);

/**
 * Actualizar categoria , Privado, cualquier rol
 */
 rutas.put('/:id', (req, res) => {
    res.json('put');
});

/**
 * Borrar categoria , Privado, admin
 */
 rutas.delete('/:id', (req, res) => {
    res.json('delete');
});







module.exports = rutas;