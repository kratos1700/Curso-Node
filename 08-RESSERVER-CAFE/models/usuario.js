//modelo COLECCION

const {Schema, model}= require('mongoose');

// creacion de la coleccion usuarios
const UsuarioSchema= Schema({
    nombre:{
        type: String,
        required:[true,'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required:[true,'El correo es obligatorio'],
        unique: true

    },
    password:{
        type: String,
        required:[true,'La contraseña es obligatorio'],
    },
    imagen:{
        type: String
        
    },
    rol:{
        type: String,
        required:true,
        enum:['ADMIN_ROLE','USER_ROLE']

        
    },
    estado:{
        type: Boolean,
        default:true
        
    },
    google:{
        type: Boolean,
        default:false
        
    },




});

// sirve para extraer atributos que se guardan a la db y no queremos grardar
// se sobrescribe el metodo toObject
UsuarioSchema.methods.toJSON = function() {
    // extraemo --v y password y el resto lo guardamos como usuario
    const{__v, password, _id, ...usuario} = this.toObject();
    // modificamos el _id por el nombre de uid
    usuario.uid = _id;
    return usuario;

}

// se exporta en singular y se le pasa el esquema para crear la coleccion
module.exports=model('Usuario',UsuarioSchema)


