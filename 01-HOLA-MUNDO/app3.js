
console.log ('Inicio del programa');

// funcions no blokejants
setTimeout( ()=>{
    console.log('Primer TimeOut')
}, 3000);

setTimeout( ()=>{
    console.log('Segundo TimeOut')
}, 0);

setTimeout( ()=>{
    console.log('Tercer TimeOut')
}, 0);



console.log ('Fin del programa');