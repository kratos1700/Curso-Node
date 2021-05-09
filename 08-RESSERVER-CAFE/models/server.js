const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

// clase server
class Server {

    constructor() {
        // creamos la variable app
        this.app = express();
        this.port =process.env.PORT;
        this.usuariosPath= '/api/usuarios';

        // conectamos con la base de datos
        this.cotenctarDB();

        //Middlewares , funciones añadir funcionalidades personalizadas
            this.middlewares();

        // creamos las rutas
        this.rutas();

    }
    async cotenctarDB(){
        await dbConnection()
    }

    middlewares(){

        //CORS evita problemas en las peticiones
        this.app.use(cors());
        // parseo y lectura de bodys. Es informacion recibida por un post
        this.app.use(express.json());

        //con .use le decimos que es un middlewares
        // directorio publico
        this.app.use(express.static('public'));

    }


    // funcion rutas
    rutas() {
        // creamos un Middlewares con user de routes
        this.app.use(this.usuariosPath, require('../routes/user'))
    }

    // funcion para arrancar el servidor por el puerto configurado
    listen() {
        // le pasamos el puerto configurado en .env
        this.app.listen(this.port, () => {

            console.log(`Escuchando por el Puerto: ${this.port}`.cyan)
        })
    }


}

module.exports = Server;