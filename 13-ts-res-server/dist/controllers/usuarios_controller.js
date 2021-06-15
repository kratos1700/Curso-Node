"use strict";
// funcion para obtener usuarios
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
// en typescript tenemos que especificar el tipo de variables
// con export al principio exportamos
// funcion para obtener todos los usuarios
const getUsuarios = (req, res) => {
    // mandamos el mensaje de la peticion
    res.json({
        msg: 'getUsuarios'
    });
};
exports.getUsuarios = getUsuarios;
// funcion para obtener 1 usuario
const getUsuario = (req, res) => {
    const { id } = req.params;
    // mandamos el mensaje de la peticion
    res.json({
        msg: 'getUsuario',
        id
    });
};
exports.getUsuario = getUsuario;
// funcion para añadir usuario
const postUsuario = (req, res) => {
    const { body } = req;
    // mandamos el mensaje de la peticion
    res.json({
        msg: 'postUsuario',
        body
    });
};
exports.postUsuario = postUsuario;
// funcion para actualizar usuario
const putUsuario = (req, res) => {
    const { id } = req.params;
    const { body } = req;
    // mandamos el mensaje de la peticion
    res.json({
        msg: 'putUsuario',
        body,
        id
    });
};
exports.putUsuario = putUsuario;
// funcion para eliminar usuario
const deleteUsuario = (req, res) => {
    const { id } = req.params;
    // mandamos el mensaje de la peticion
    res.json({
        msg: 'deleteUsuario',
        id
    });
};
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios_controller.js.map