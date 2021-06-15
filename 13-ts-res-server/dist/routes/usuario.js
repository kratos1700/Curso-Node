"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_controller_1 = require("../controllers/usuarios_controller");
const rutas = express_1.Router();
// ruta de obtener usuarios
// ruta + controlador por parametros
rutas.get('/', usuarios_controller_1.getUsuarios);
// ruta obtener usuario por id
rutas.get('/:id', usuarios_controller_1.getUsuario);
// ruta añadir usuario
rutas.post('/', usuarios_controller_1.postUsuario);
// ruta actualizar usuario
rutas.put('/:id', usuarios_controller_1.putUsuario);
// ruta eliminar usuario
rutas.delete('/:id', usuarios_controller_1.deleteUsuario);
// EXPORTAMOS LAS RUTAS
exports.default = rutas;
//# sourceMappingURL=usuario.js.map