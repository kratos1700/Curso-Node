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

// sirve para extraer atributos que se guardan a la db y no queremos grardar
// se sobrescribe el metodo toObject
CategoriaSchema.methods.toJSON = function() {
    // extraemos --v y estado y el resto lo guardamos como data
    const{__v, estado, ...data} = this.toObject();
    return data;

}


module.exports = model('Categoria', CategoriaSchema);