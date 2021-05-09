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

// asignamos :id a la ruta
rutas.put('/:id',usuariosPut);

rutas.post('/', usuariosPost);

rutas.patch('/', usuariosPatch);

rutas.delete('/', usuariosDelete);



module.exports = rutas;