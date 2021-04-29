// objecte
const deadpool ={
nombre: 'Wade',
apellido: 'Wiston',
poder: 'Regeneracion',
// funcion
getNombre() {
    return `${this.nombre} ${this.apellido} ${this.poder} `
}

}

console.log(deadpool.getNombre())

/*const nombre= deadpool.nombre;
const apellido= deadpool.apellido;
const poder= deadpool.poder;

console.log(nombre, apellido,poder)*/


// desestructuracion de objeto
const { nombre, apellido, poder, edad} = deadpool;
console.log(nombre, apellido,poder,edad);


// declarem funcio de manera antiga
function imprimirHeroe(heroe){
    const { nombre, apellido, poder, edad= 20} = heroe;
    console.log(nombre, apellido,poder,edad);
}

imprimirHeroe(deadpool);