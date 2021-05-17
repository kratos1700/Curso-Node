
// Los middlewares recibien req y res

const { response } = require("express")

// funcion para comprobar si el usuario es un admin
const isAdminRole = (req, res = response, next) => {


    // como en validar token ya leemos toda la info del usuario , 
    // podemos usar la req del usuario con todos sus datos

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere validar el rol sense leer el token primero'
        });
    }

    const { rol, nombre } = req.usuario;
    // comprobamos que el ro
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es administrador`
        });

    }

    next();
}


// funcion para comprobar los roles pasados por paramentro
// con ... roles crea un arreglo 
const tieneRole = (...roles) => {

    return (req, res = response, next) => {
        // muestra los roles pasados por parametro a user.js
        console.log(roles);

        // como en validar token ya leemos toda la info del usuario , 
        // podemos usar la req del usuario con todos sus datos
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere validar el rol sense leer el token primero'
            });
        }

        // comprobamos que el rol sea diferente 
        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            });
        }


        next();
    }

}

module.exports = {
    isAdminRole,
    tieneRole
}