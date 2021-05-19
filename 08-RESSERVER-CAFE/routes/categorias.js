// desestructuramos express para usar Router
const { Router } = require('express');
const { check } = require('express-validator');

const { existeCategoriaPorId } = require('../helpers/db-validators');
const {validarCampos,
    validarJWT,
    isAdminRole,
    tieneRole
}= require ('../middlewares');
const {crearCategoria, 
    obtenerCategorias,
    borrarCategoria,
    obtenerCategoria,
    actualizarCategoria} = require('../controllers/categorias-controlador');



//const { route } = require('./user');

const rutas = Router();

/**
 * {{url}}/api/categorias
 */

/**
 * Obtener todas las categorias, Publico
 */
rutas.get('/', obtenerCategorias);

/**
 * Obtener una categoria por id, Publico
 */
 rutas.get('/:id', [
    check('id','No es un ID valido' ).isMongoId(),
    check('id').custom(existeCategoriaPorId),
    // validamos los campos
    validarCampos
 ], obtenerCategoria);

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
 rutas.put('/:id', [
     // validamos el JWT
     validarJWT,
      // comprobamos que haya el nombre
      check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos

 ], actualizarCategoria);

/**
 * Borrar categoria , Privado, admin
 */
 rutas.delete('/:id',[
      // validamos el token, sino es correcto no continua
      validarJWT,
      // comprobamos que sea admin
      isAdminRole,
      // comprobamos los id
      check('id','No es un ID valido' ).isMongoId(),
      check('id').custom(existeCategoriaPorId),
      validarCampos
   
 ], borrarCategoria);








module.exports = rutas;