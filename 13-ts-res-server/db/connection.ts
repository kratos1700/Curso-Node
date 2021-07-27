/**
 * configuracion a la conexion de la bbdd
 */

import { Sequelize } from "sequelize";

// pasamos el nombre de la bbd, el user ,el pass, la direccion y el dialecto
const db = new Sequelize('node','root', '123456',{
    host:'localhost',
    dialect:'mysql',
    //logging:false
});

export default db;