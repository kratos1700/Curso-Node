// desestructuramos express para usar Router
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarArchivoSubir}= require('../middlewares')
const { cargarArchivo, actualizarImagen, mostrarImagen,actualizarImagenCloudinary } = require('../controllers/uploads-controlador');
const { coleccionesPermitidas }= require('../helpers')

const rutas = Router();


// ruta para subir archivos y le pasamos el middleware de validar archivo
rutas.post('/',validarArchivoSubir, cargarArchivo);

// ruta para actualizar 
rutas.put('/:coleccion/:id', [
   validarArchivoSubir, // validamos que haya archivo a subir
    check('id', 'El id debe ser de Mongo DB').isMongoId(),
    // c = coleccion  => es un helper que le llamaremos coleccionesPermitidas, le pasamos la coleccion y las opciones
    check('coleccion').custom(c => coleccionesPermitidas (c, ['usuarios', 'productos'])),
    validarCampos
],  actualizarImagenCloudinary );
// actualizarImagen);


// ruta de peticiones get de imagenes
rutas.get('/:coleccion/:id', [

    check('id', 'El id debe ser de Mongo DB').isMongoId(),
    // c = coleccion  => es un helper que le llamaremos coleccionesPermitidas, le pasamos la coleccion y las opciones
    check('coleccion').custom(c => coleccionesPermitidas (c, ['usuarios', 'productos'])),
    validarCampos
],mostrarImagen )


module.exports = rutas;