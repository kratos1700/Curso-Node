// importamos mongoose
const mongoose = require('mongoose');
require('colors');

// funcion de conexion a la bbdd
const dbConnection = async()=>{

    try {
        // configurando la conexion a la bbdd mongo
       await mongoose.connect(process.env.MONGODB_ATLAS, {
           useNewUrlParser: true,
           useUnifiedTopology:true,
           useCreateIndex:true,
           useFindAndModify:false
       });
       console.log('Base de datos Online...'.cyan);

    } catch (error) {
        // controlamos el error
        console.log(error);
        throw new Error('Error al iniciar la base de datos'.red);
        
    }

}

module.exports={
    dbConnection
}