// es un index con todos los middlewares personalizados
// creamos las constantes de las importaciones para poder unificar
const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');
const validarArchivo = require('../middlewares/validar-archivo');



module.exports = {
    // con ... exportamos todas las funciones que contenga
    ...validarCampos,
    ...validarJWT,
    ...validaRoles,
    ...validarArchivo
}