const Server = require("./models/server");

//IMPORTAMOS DOTENV, PARA VARIABLES DE ENTORNO
require('dotenv').config();

// Instanciamos server
const servidor = new Server();

// arrancamos el servidor
servidor.listen();

 





