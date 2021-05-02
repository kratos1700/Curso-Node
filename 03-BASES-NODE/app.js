// https://nodejs.org/es/

const fs = require('fs');

console.clear();
console.log('===================');
console.log('   Tabla del 5 ');
console.log('===================');

let total = 0;
let salida='';
let num= 6;

for (let i = 0; i <= 10 ; i++) {
    total = num * i;
    salida += (`${num} x ${i}= ${total}\n`)
    
}
// pasamos por parametro el nombre del archivo a crear, la variable que queremos guardar y u
// un callback por si hay un error
fs.writeFile(`tabala-${num}.txt`, salida,(err)=>{
    if(err) throw err;

    console.log(`tabala-${num}.txt creada!`)
})
console.log(salida);