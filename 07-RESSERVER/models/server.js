const express = require('express')

// clase server
class Server {

    constructor() {
        // creamos la variable app
        this.app = express();
        this.port =process.env.PORT;

        //Middlewares , funciones añadir funcionalidades personalizadas
            this.middlewares();

        // creamos las rutas
        this.rutas();

    }

    middlewares(){

        //con .use le decimos que es un middlewares
        // directorio publico
        this.app.use(express.static('public'));

    }


    // funcion rutas
    rutas() {

        this.app.get('/api', (req, res) => {
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