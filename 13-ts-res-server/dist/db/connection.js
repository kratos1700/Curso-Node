"use strict";
/**
 * configuracion a la conexion de la bbdd
 */
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// pasamos el nombre de la bbd, el user ,el pass, la direccion y el dialecto
const db = new sequelize_1.Sequelize('node', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    //logging:false
});
exports.default = db;
//# sourceMappingURL=connection.js.map