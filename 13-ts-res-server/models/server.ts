/**
 * Clase Server con TypeScript
 */

//import moduleName from 'express';
import express, {Application} from 'express';


class Server {

    private app: Application;
    private port: string;

    constructor(){
        this.app = express();
        // la variable no puede ser nula , en caso de serlo por defecto se asigna el puerto 8000
        this.port = process.env.PORT || '8080';
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