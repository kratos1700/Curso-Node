// desestructuramos express para usar Router
const{Router} = require('express');
const { check } = require('express-validator');
///importamos las funciones del controlador
const { usuariosGet, 
        usuariosPut,
        usuariosPost,
        usuariosPatch,
        usuariosDelete } = require('../controllers/usuarios_controller');


const rutas = Router();



rutas.get('/', usuariosGet);

// asignamos :id a la ruta
rutas.put('/:id',usuariosPut);

// el midd se pasa en el 1er parameto si se usan mas de 1 se pasa por arrego
// comprobamos el correo con check de express validator, se le pasa que se quiere comprobar y el mensage
//con .not().isEmpty() comprobamos que no sea nulo
rutas.post('/', [ 
        check ('nombre', 'El nombre es obligatorio.').not().isEmpty(),
        check ('password', 'El password debe tener mas de 6 caracteres.').isLength({min:6}),
        check ('correo', 'El correo no es valido.').isEmail(),
        check ('rol', 'No es un rol Valido').isIn(['ADMIN_ROLE','USER_ROLE'])


]
,usuariosPost);

rutas.patch('/', usuariosPatch);

rutas.delete('/', usuariosDelete);



module.exports = rutas;