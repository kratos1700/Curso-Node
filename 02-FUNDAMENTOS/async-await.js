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

// funcion con callback para retornan un empleado por id
const getSalario = (id) => {

    // resolve=> callback que se ejecuta si todo funciona   
    // reject=> callback que se ejecuta si hay algun error
    const promesa = new Promise((resolve, reject) => {
        // .find  arreglos, pasamos el id del parametro para buscar el id del arreglo
        const salario = salarios.find((e) => e.id === id)?.salario

        if (salario) {
            resolve(salario);
        } else {
            reject(`El Salario con id= ${id} no existe!`)
        }

    });
    return promesa

}

const id= 22;

// await dentro de una funcion asincrona

// agregamos async a la funcion y la transorma a una funcion asincrona 
// para devolver una promesa
const  getInfoUsuario = async( id )=>{
try {
    const empleado = await getEmpleado(id);
const salario = await getSalario(id);
return `El salario del empleado: ${empleado} es de: ${salario} euros`;
} catch (error) {
    // llama el error del catch
   // return error;
    // llama el error del reject
    throw error;
}



}

getInfoUsuario(id)
.then(msg=> console.log(msg))
.catch(err=> console.log(err))
