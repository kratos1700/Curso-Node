/**
 * modelo de categoria 
 */



const { Schema, model } = require('mongoose');

// creamos el objeto del objeto
const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'], 
        unique:true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true

    },
    // campo donde se guardara el usuario que creo la categoria
    usuario: {
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required: true
    }

});


module.exports = model('Categoria', CategoriaSchema);