const express = require('express');
const cors = require('cors');
const colors = require('colors');




// clase server
class Server {

    constructor() {
        // creamos la variable app
        this.app = express();
        this.port = process.env.PORT;
        // importamos el socket server y le pasamos la app de express linia 13
        this.server = require('http').createServer(this.app);
        // en io habra tona la info de los clientes conectados
        this.io = require('socket.io')(this.server);

        /**
         * Creamos el path para las direcciones
         */
        this.path = {}


        //Middlewares , funciones añadir funcionalidades personalizadas
        this.middlewares();

        // creamos las rutas
        this.rutas();

        // configuracion de sockets
        this.sockets();


    }


    middlewares() {

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
        // creamos la ruta para auth
        //this.app.use(this.path.auth, require('../routes/auth'));


    }





    // funcion de sockets
    sockets() {

        this.io.on('connection', socket =>{
            console.log('Cliente Conectado!'.green, socket.id)

            socket.on('disconnect', ()=>{
                console.log('Cliente Desconectado'.red, socket.id)
            });

            // escuchamos lo que envia el cliente desde el servidor, 
            //el payload es donde esta la info que enviamos desde el html
            socket.on('enviar-mensaje',(payload)=>{
                // Ejemplo de recibir mensajes desde el front end
                //console.log('Recibiendo mensajes del cliente ... : '.yellow )
                //console.log(payload)
                
                //------ ENVIAR MENSAJES A OTROS CLIENTES--------------
                this.io.emit('enviar-mensaje',payload);

            })
        })

    }



    // funcion para arrancar el servidor por el puerto configurado
    listen() {
        // le pasamos el server para los sockets y  puerto configurado en .env
        this.server.listen(this.port, () => {

            console.log(`Escuchando por el Puerto: ${this.port}`.cyan)
        })
    }


}

module.exports = Server;