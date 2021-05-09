const express = require('express');
const cors = require('cors');

// clase server
class Server {

    constructor() {
        // creamos la variable app
        this.app = express();
        this.port =process.env.PORT;
        this.usuariosPath= '/api/usuarios';

        //Middlewares , funciones añadir funcionalidades personalizadas
            this.middlewares();

        // creamos las rutas
        this.rutas();

    }

    middlewares(){

        //CORS evita problemas en las peticiones
        this.app.use(cors());

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

            console.log(`Escuchando por el Puerto: ${this.port}`)
        })
    }


}

module.exports = Server;