
const path = require('path');
const fs= require('fs');
// importamos el helper del uploads
const { subirArchivo } = require('../helpers')

const { response} = require("express");

const {Usuario, Producto}= require ('../models');




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
            if(!modelo){
                return res.status(400).json({
                    msg:`Error, El usuario con id: ${id} no existe`
                });
            }
            break;

        case 'productos':
            // comprobamos que el id exista en bbdd
            modelo = await Producto.findById(id);
            // si el usuario no existe
            if(!modelo){
                return res.status(400).json({
                    msg:`Error, El producto con id: ${id} no existe`
                });
            }
            break;

        default:
            return res.status(500).json({ msg:'Error, opcion no creada' });
       
    }

    // limpieza de imagenes anteriores

    try {
        // si la imagen existe
        if (modelo.imagen){
            //tenemos que borrar el path, le pasamos el directorio uploads, la coleccion y el nombre del archivo
            const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.imagen);
            // comprovamos que exista el path
            if(fs.existsSync(pathImagen)){
                // borra el archivo
                fs.unlinkSync(pathImagen);

            }

        }
    } catch (error) {
        
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

module.exports = {
    cargarArchivo,
    actualizarImagen


}

//https://github.com/richardgirges/express-fileupload/tree/master/example