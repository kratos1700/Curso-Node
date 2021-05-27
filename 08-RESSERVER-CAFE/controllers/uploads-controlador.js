
const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2
// configuramos el backend con cloudinary
cloudinary.config(process.env.CLOUDINARY_URL);

// importamos el helper del uploads
const { subirArchivo } = require('../helpers')

const { response } = require("express");

const { Usuario, Producto } = require('../models');




/**
 *FUNCION PARA SUBIR ARCHIVO
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const cargarArchivo = async (req, res = response) => {


    try {

        // subimos imagen  y archivos de txt en la carpeta textos, si no esta se crea.
        //const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos');
        const nombre = await subirArchivo(req.files, undefined, 'imagenes');
        res.json({
            // mostraba el path donde estava la imagen, al no estar en la carpeta publica el usuario no puede verla
            //path: pathCompleto
            nombre
        });

    } catch (error) {
        // mostramos error 400 y el tipo del error
        res.status(400).json({ error });

    }




}



/**
 * FUNCION PARA ACTUALIZAR IMAGEN
 * ejemplo de como seria en una carpeta en el servidor
 */
const actualizarImagen = async (req, res = response) => {

    // extraemos el id y coleccion que son los parametros pasados en la ruta uploads.js
    const { id, coleccion } = req.params;

    let modelo;


    switch (coleccion) {
        case 'usuarios':
            // comprobamos que el id exista en bbdd
            modelo = await Usuario.findById(id);
            // si el usuario no existe
            if (!modelo) {
                return res.status(400).json({
                    msg: `Error, El usuario con id: ${id} no existe`
                });
            }
            break;

        case 'productos':
            // comprobamos que el id exista en bbdd
            modelo = await Producto.findById(id);
            // si el usuario no existe
            if (!modelo) {
                return res.status(400).json({
                    msg: `Error, El producto con id: ${id} no existe`
                });
            }
            break;

        default:
            return res.status(500).json({ msg: 'Error, opcion no creada' });

    }

    // limpieza de imagenes anteriores

    try {
        // si la imagen existe
        if (modelo.imagen) {
            //tenemos que borrar el path, le pasamos el directorio uploads, la coleccion y el nombre del archivo
            const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.imagen);
            // comprovamos que exista el path
            if (fs.existsSync(pathImagen)) {
                // borra el archivo
                fs.unlinkSync(pathImagen);

            }

        }
    } catch (error) {
        // mostramos error 400 y el tipo del error
        res.status(400).json({ error });

    }



    // subimos imagen (undefined) en la carpeta imagenes, si no esta se crea.
    const nombre = await subirArchivo(req.files, undefined, coleccion);

    modelo.imagen = nombre
    // guardamos en bbdd
    await modelo.save();

    res.json({
        modelo
    });

}







/**
 * FUNCION PARA ACTUALIZAR IMAGEN A CLOUDINARY
 */
const actualizarImagenCloudinary = async (req, res = response) => {

    // extraemos el id y coleccion que son los parametros pasados en la ruta uploads.js
    const { id, coleccion } = req.params;

    let modelo;


    switch (coleccion) {
        case 'usuarios':
            // comprobamos que el id exista en bbdd
            modelo = await Usuario.findById(id);
            // si el usuario no existe
            if (!modelo) {
                return res.status(400).json({
                    msg: `Error, El usuario con id: ${id} no existe`
                });
            }
            break;

        case 'productos':
            // comprobamos que el id exista en bbdd
            modelo = await Producto.findById(id);
            // si el usuario no existe
            if (!modelo) {
                return res.status(400).json({
                    msg: `Error, El producto con id: ${id} no existe`
                });
            }
            break;

        default:
            return res.status(500).json({ msg: 'Error, opcion no creada' });

    }

    // limpieza de imagenes anteriores
    if (modelo.imagen) {
        // extraemos el nombre de la imagen para poder borrarla con /
        const nombreArray = modelo.imagen.split('/');
        // obtenemos la ultima parte del array
        const nombreImagen = nombreArray[nombreArray.length - 1];
        // separamos el nombre de la extension de la imagen , le asignamos public_id
        const[public_id] = nombreImagen.split('.');

        // borramos la imagen 
        await cloudinary.uploader.destroy(public_id);


    }

    // extraemos el valor del campo para subir la imagen
    const { tempFilePath } = req.files.archivo;
    // subimos imagen a cloudinary
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    modelo.imagen = secure_url;

    // guardamos en bbdd
    await modelo.save();

    res.json({
        modelo
    });

}




/**
 * FUNCION DE OBTENER IMAGENES
 */

const mostrarImagen = async (req, res = response) => {

    // extraemos el id y coleccion que son los parametros pasados en la ruta uploads.js
    const { id, coleccion } = req.params;

    let modelo;


    switch (coleccion) {
        case 'usuarios':
            // comprobamos que el id exista en bbdd
            modelo = await Usuario.findById(id);
            // si el usuario no existe
            if (!modelo) {
                return res.status(400).json({
                    msg: `Error, El usuario con id: ${id} no existe`
                });
            }
            break;

        case 'productos':
            // comprobamos que el id exista en bbdd
            modelo = await Producto.findById(id);
            // si el usuario no existe
            if (!modelo) {
                return res.status(400).json({
                    msg: `Error, El producto con id: ${id} no existe`
                });
            }
            break;

        default:
            return res.status(500).json({ msg: 'Error, opcion no creada' });

    }

    // limpieza de imagenes anteriores

    try {
        // si la imagen existe
        if (modelo.imagen) {
            //tenemos que borrar el path, le pasamos el directorio uploads, la coleccion y el nombre del archivo
            const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.imagen);
            // comprovamos que exista el path
            if (fs.existsSync(pathImagen)) {
                // mostramos el archivo
                return res.sendFile(pathImagen);

            }

        }

        // creamos la direccion de la imagen a mostrar
        const placeHolder = path.join(__dirname, '../assets/no-image.jpg');
        // si no hay imagen mostramos una por defecto
        return res.sendFile(placeHolder);

    } catch (error) {
        // mostramos error 400 y el tipo del error
        res.status(400).json({ error });

    }
}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary


}

//https://github.com/richardgirges/express-fileupload/tree/master/example