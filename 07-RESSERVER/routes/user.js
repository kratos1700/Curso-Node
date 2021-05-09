// desestructuramos express para usar Router
const{Router} = require('express');
///importamos las funciones del controlador
const { usuariosGet, 
        usuariosPut,
        usuariosPost,
        usuariosPatch,
        usuariosDelete } = require('../controllers/usuarios_controller');


const rutas = Router();



rutas.get('/', usuariosGet);

rutas.put('/',usuariosPut);

rutas.post('/', usuariosPost);

rutas.patch('/', usuariosPatch);

rutas.delete('/', usuariosDelete);



module.exports = rutas;