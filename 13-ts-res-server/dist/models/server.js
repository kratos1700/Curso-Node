"use strict";
/**
 * Clase Server con TypeScript
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import moduleName from 'express';
const express_1 = __importDefault(require("express"));
class Server {
    constructor() {
        this.app = express_1.default();
        // la variable no puede ser nula , en caso de serlo por defecto se asigna el puerto 8000
        this.port = process.env.PORT || '8080';
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