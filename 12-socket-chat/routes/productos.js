// desestructuramos express para usar Router
const { Router } = require('express');
const { check } = require('express-validator');

const { existeCategoriaPorId,
        existeProductosPorId, } = require('../helpers/db-validators');
const {validarCampos,
    validarJWT,
    isAdminRole,
    tieneRole
}= require ('../middlewares');

const {obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto ,
    borrarProducto} = require('../controllers/productos-controlador');



const rutas = Router();

/**
 * {{url}}/api/productos
 */

/**
 * Obtener todas las categorias, Publico
 */
 rutas.get('/', obtenerProductos);




 /**
 * Obtener un producto por id, Publico
 */
  rutas.get('/:id', [
    check('id','No es un ID valido' ).isMongoId(),
    check('id').custom(existeProductosPorId),
    // validamos los campos
    validarCampos
 ], obtenerProducto);




 
/**
 * Crear producto , Privado, cualquier rol
 */
 rutas.post('/',[
    // validamos el JWT
    validarJWT,
    // comprobamos que haya el nombre
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    // comprobamos que haya la categoria
    check('categoria','No es un ID valido' ).isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
  
    // validamos los campos
    validarCampos

], crearProducto);



/**
 * Actualizar producto , Privado, cualquier rol
 */
 rutas.put('/:id', [
    // validamos el JWT
    validarJWT,
     // comprobamos que exista el producto
   check('id').custom(existeProductosPorId),
   validarCampos

], actualizarProducto);

/**
* Borrar producto , Privado, admin
*/
rutas.delete('/:id',[
     // validamos el token, sino es correcto no continua
     validarJWT,
     // comprobamos que sea admin
     isAdminRole,
     // comprobamos los id
     check('id','No es un ID valido' ).isMongoId(),
     check('id').custom(existeProductosPorId),
     validarCampos
  
], borrarProducto);




 module.exports = rutas;