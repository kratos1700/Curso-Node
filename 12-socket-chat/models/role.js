// medelo de roles 

const {Schema, model}= require('mongoose');

// creamos el objeto del objeto
const RoleSchema= Schema({
rol:{
    type: String,
    required:[true, 'El rol es obligatorio']
}

});


module.exports= model('Role',RoleSchema);