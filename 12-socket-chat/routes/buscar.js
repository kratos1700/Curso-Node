/**
 * Ruta para busqueda
 */

const { Router }= require ('express');
const { buscar } = require('../controllers/buscar-controlador');

const rutas = Router();



rutas.get('/:coleccion/:termino', buscar)







module.exports = rutas;