/**
 * Clase Server con TypeScript
 */

//import moduleName from 'express';
import express, {Application} from 'express';

import userRutas from '../routes/usuario';


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
        // define mis rutas
        this.routes();
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