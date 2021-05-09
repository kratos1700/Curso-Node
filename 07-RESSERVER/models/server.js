const express = require('express')

// clase server
class Server {

    constructor() {
        // creamos la variable app
        this.app = express();
        this.port =process.env.PORT;

        // creamos las rutas
        this.rutas();

    }
    // funcion rutas
    rutas() {

        this.app.get('/', (req, res) => {
            res.send('Hello World')
        });

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