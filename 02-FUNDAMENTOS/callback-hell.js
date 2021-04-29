// callback anidados

// arreglo empleados
const empleados = [
    {
        id: 1,
        nombre: 'Kratos'
    },
    {
        id: 2,
        nombre: 'Juanito'
    },
    {
        id: 3,
        nombre: 'chiquilicuatre'
    },
]
// arreglo salarios
const salarios = [
    {
        id: 1,
        salario: 1500
    },
    {
        id: 2,
        salario: 1000
    },

]

// funcion con callback para retornan un empleado por id
const getEmpleado = (id, callback) => {

    // .find  arreglos, pasamos el id del parametro para buscar el id del arreglo
    const empleado = empleados.find((e) => e.id === id)

    if (empleado) {
        //  el null es como un false al ejecutar el callback
        callback(null, empleado);
    } else {
        callback(`El empleado con id= ${id} no existe!`)
    }


}

// el callback se le pasa un error y un objeto 
getEmpleado(7, (err,empleado)=> {
    // comprobamos que el usuario esiste, si hay error es que no existe
    if (err){
        console.log('ERROR!!');
        return console.log(err);
    }else{
        // mostramos mensaje que si existe el usuario
        console.log('el usuario existe')
    }
})