"use strict";
/**
 * Clase Server con TypeScript
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import moduleName from 'express';
const express_1 = __importDefault(require("express"));
const usuario_1 = __importDefault(require("../routes/usuario"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
class Server {
    constructor() {
        // objeto para las rutas
        this.apiPath = {
            usuarios: '/api/usuarios',
        };
        this.app = express_1.default();
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
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('BBDD conectada!');
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // metodo para los middlewares, funciones que se ejecutan antes de las rutas 
    middlewares() {
        //CORS
        this.app.use(cors_1.default());
        //lectura del body para pharsearlo
        this.app.use(express_1.default.json());
        // configurando carpeta publica para mostrar contenido estatico
        this.app.use(express_1.default.static('public'));
    }
    // metodo para las rutas
    routes() {
        this.app.use(this.apiPath.usuarios, usuario_1.default);
    }
    // funcion para arrancar el servidor
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor escuchando por el puerto: ' + `${this.port}`);
        });
    }
}
// exportamos el archivo ts
exports.default = Server;
//# sourceMappingURL=server.js.map