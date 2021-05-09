const express = require('express');
const cors = require('cors');

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

        //CORS evita problemas en las peticiones
        this.app.use(cors());

        //con .use le decimos que es un middlewares
        // directorio publico
        this.app.use(express.static('public'));

    }


    // funcion rutas
    rutas() {

        this.app.get('/api', (req, res) => {
            res.json({
                msg: 'get API'
            })
        });

        this.app.put('/api', (req, res) => {
            res.status(400).json({
                msg: 'put API'
            })
        });

        this.app.post('/api', (req, res) => {
            // .status especificamos el resultado
            res.status(201).json({
                msg: 'post API'
            })
        });

        this.app.delete('/api', (req, res) => {
            res.json({
                msg: 'delete API'
            })
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