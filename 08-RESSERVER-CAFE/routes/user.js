// desestructuramos express para usar Router
const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { isAdminRole } = require('../middlewares/validar-roles');

const {esRoleValido, 
        emalExiste, 
        existeUserPorId} = require('../helpers/db-validators');
///importamos las funciones del controlador
const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosPatch,
        usuariosDelete } = require('../controllers/usuarios_controller');


const rutas = Router();



rutas.get('/', usuariosGet);

// asignamos :id a la ruta
rutas.put('/:id',[
        // validamos que sea un id de mongo
        check('id','No es un ID valido' ).isMongoId(),
        check('id').custom(existeUserPorId),
        // comprobamos el rol valido 
        check('rol').custom( esRoleValido),
        //validamos los campps personalizados
        validarCampos


], usuariosPut);

// el middlewares se pasa en el 1er parameto si se usan mas de 1 se pasa por arrego
// comprobamos el correo con check de express validator, se le pasa que se quiere comprobar y el mensage
//con .not().isEmpty() comprobamos que no sea nulo
rutas.post('/', [
        check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
        check('password', 'El password debe tener mas de 6 caracteres.').isLength({ min: 6 }),
        check('correo', 'El correo no es valido.').isEmail(),
        // comprobamos que el correo no este en uso/registrado
        check('correo').custom( emalExiste),
        //check('rol', 'No es un rol Valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        // comprobamos el rol valido 
        check('rol').custom( esRoleValido),
        validarCampos


]
        , usuariosPost);

rutas.patch('/', usuariosPatch);

rutas.delete('/:id',[
      
        // validamos el token, sino es correcto no continua
        validarJWT,  
        // comprobamos que el rol es de admin
        isAdminRole,
        // validamos que sea un id de mongo
        check('id','No es un ID valido' ).isMongoId(),
        check('id').custom(existeUserPorId),
        validarCampos
], usuariosDelete);




module.exports = rutas;

