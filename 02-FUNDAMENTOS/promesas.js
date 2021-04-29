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
const getEmpleado = (id) => {

    // resolve=> callback que se ejecuta si todo funciona   
    // reject=> callback que se ejecuta si hay algun error
    const promesa = new Promise((resolve, reject) => {
        // .find  arreglos, pasamos el id del parametro para buscar el id del arreglo
        const empleado = empleados.find((e) => e.id === id)?.nombre

        if (empleado) {
            resolve(empleado);
        } else {
            reject(`El empleado con id= ${id} no existe!`)
        }

    });
    return promesa

}

const id = 22;

getEmpleado(id)
.then(empleado => console.log(empleado))
.catch(err => console.log(err));

getSalario(id)
.then(salario => console.log(salario))
.catch(err => console.log(err));