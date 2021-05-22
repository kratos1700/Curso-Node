const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

// clase server
class Server {

    constructor() {
        // creamos la variable app
        this.app = express();
        this.port = process.env.PORT;
        /**
         * Creamos elpath para las direcciones
         */
        this.path = {
            // creamos la direccion de auth
            auth: '/api/auth',
            // creamos la direccion para buscar
            buscar: '/api/buscar',
            // creamos la direccion usuarios
            usuarios: '/api/usuarios',
            // creamos la direccion categorias y productos
            categorias: '/api/categorias',
            productos: '/api/productos'

        }


        // conectamos con la base de datos
        this.cotenctarDB();

        //Middlewares , funciones añadir funcionalidades personalizadas
        this.middlewares();

        // creamos las rutas
        this.rutas();

    }
    async cotenctarDB() {
        await dbConnection()
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
        this.app.use(this.path.auth, require('../routes/auth'));
        // creamos la ruta de busqueda
        this.app.use(this.path.buscar, require('../routes/buscar'));
        // creamos la ruta de usuarios
        this.app.use(this.path.usuarios, require('../routes/user'));
        // creamos la ruta de categorias
        this.app.use(this.path.categorias, require('../routes/categorias'));
        // creamos la ruta de productos
        this.app.use(this.path.productos, require('../routes/productos'));

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