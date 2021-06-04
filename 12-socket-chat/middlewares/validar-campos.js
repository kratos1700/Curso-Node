// para recuperar el check de las rutas
const { validationResult }= require ('express-validator');



// funcion middelware personalizada, se le pasa el request, response y otra que es next
// ya que tiene que ir recorriendo asta la ejecucion del controlador
const validarCampos=(req,res, next )=>{

 // comprobamos que no haya errores en el check
 const errors = validationResult(req);

 if(!errors.isEmpty()){
     return res.status(400).json(errors);
 }

 next();

}

module.exports={
    validarCampos
}

 