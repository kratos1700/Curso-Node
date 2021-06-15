
// importamos dotenv para la configuracion de las variables de entorno
import dotenv from 'dotenv';
import Server from './models/server';
dotenv.config();

// instanciamos el servidor
const server = new Server

// arrancamos el server
server.listen();
