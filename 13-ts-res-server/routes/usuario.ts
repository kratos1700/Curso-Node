import { Router } from "express";
import { deleteUsuario,
         getUsuario,
         getUsuarios, 
         postUsuario,
         putUsuario } from "../controllers/usuarios_controller";

const rutas = Router();


// ruta de obtener usuarios
// ruta + controlador por parametros
rutas.get('/', getUsuarios);
// ruta obtener usuario por id
rutas.get('/:id', getUsuario);
// ruta añadir usuario
rutas.post('/', postUsuario);
// ruta actualizar usuario
rutas.put('/:id', putUsuario);
// ruta eliminar usuario
rutas.delete('/:id', deleteUsuario);



// EXPORTAMOS LAS RUTAS
export default rutas;