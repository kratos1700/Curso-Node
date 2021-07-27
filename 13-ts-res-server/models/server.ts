/**
 * Clase Server con TypeScript
 */

//import moduleName from 'express';
import express, {Application} from 'express';

import userRutas from '../routes/usuario';

import cors from 'cors';

import db from '../db/connection';


class Server {

    private app: Application;
    private port: string;
    // objeto para las rutas
    private apiPath ={
        usuarios:'/api/usuarios',


    }

    constructor(){
        this.app = express();
        // la variable no puede ser nula , en caso de serlo por defecto se asigna el puerto 8000
        this.port = process.env.PORT || '8080';
        //conectamos a la bbdd
        this.dbConnection();
        // ejecutamos los middlewares
        this.middlewares();
        // define mis rutas
        this.routes();
    }

    // conectar bbdd
    async dbConnection(){

        try {
            await db.authenticate();
            console.log('BBDD conectada!')
            
        } catch (error) {
            throw new Error(error);
            
        }

    }


    // metodo para los middlewares, funciones que se ejecutan antes de las rutas 
    middlewares(){
        //CORS
        this.app.use(cors());

        //lectura del body para pharsearlo
        this.app.use(express.json());

        // configurando carpeta publica para mostrar contenido estatico
        this.app.use(express.static('public'));

    }

    // metodo para las rutas
    routes(){
        this.app.use(this.apiPath.usuarios, userRutas)
    }

    // funcion para arrancar el servidor
    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor escuchando por el puerto: ' + `${this.port}`);
        })
    }

}

// exportamos el archivo ts
export default Server;