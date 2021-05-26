/**
 * modelo de productos 
 */



 const { Schema, model } = require('mongoose');

 // creamos el objeto del objeto
 const ProductoSchema = Schema({
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
     },
     precio:{
         type: Number,
         default: 0
     },
     // campo donde se guardara la categoria del producto
     categoria:{
         type : Schema.Types.ObjectId,
         ref:'Categoria',
         required:true
     } ,
     descripcion:{
         type:String,
     },
     disponible:{
         type:Boolean,
         default:true
     },
     imagen:{
        type:String
    }
 
 });
 
 // sirve para extraer atributos que se guardan a la db y no queremos grardar
 // se sobrescribe el metodo toObject
 ProductoSchema.methods.toJSON = function() {
     // extraemos --v y estado y el resto lo guardamos como data
     const{__v, estado, ...data} = this.toObject();
     return data;
 
 }
 
 
 module.exports = model('Producto', ProductoSchema);