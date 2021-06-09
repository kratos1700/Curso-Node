const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

const fileUpload = require('express-fileupload');
const { socketController } = require('../sockets/socketController');

// clase server
class Server {

    constructor() {
        // creamos la variable app
        this.app = express();
        this.port = process.env.PORT;
        // configuramos el socket para el server
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server)






        /**
         * Creamos el path para las direcciones
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
            productos: '/api/productos',
            // path para la carga de archivos
            uploads: '/api/uploads'


        }


        // conectamos con la base de datos
        this.cotenctarDB();

        //Middlewares , funciones añadir funcionalidades personalizadas
        this.middlewares();

        // creamos las rutas
        this.rutas();

        //Sockets -- para gestionar las escuchas de los sockets
        this.sockets();

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


        // Fileupload --CARGA DE ARCHIVOS
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true // habilitamos la creacion de carpetas si no estan creadas en la direccion
        }));

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
        // creamos la ruta de carga de archivos
        this.app.use(this.path.uploads, require('../routes/uploads'));

    }


    // metodo para gestionar los sockets
    sockets(){
       this.io.on("connection",(socket)=>  socketController(socket, this.io))
    }

    // funcion para arrancar el servidor por el puerto configurado
    listen() {
        // le pasamos el puerto configurado en .env
        this.server.listen(this.port, () => {

            console.log(`Escuchando por el Puerto: ${this.port}`.cyan)
        })
    }


}

module.exports = Server;