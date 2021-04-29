

// callback funcion que se ejetuta en un momento determinado
setTimeout(function(){
    console.log('Hola mundo');
}, 1000);


// simulacion peticion a bbdd

const getUsuarioById = (id, callback) => {
    const usuario ={
        id, 
        nombre: 'Kratos'
    }
    setTimeout ( () => {
       callback(usuario)
    },1500)
}

// funcion sin callback
//getUsuarioById(11);

// funcion con callback ( eventualmente)
getUsuarioById(12, (usuario)=> {
    console.log(usuario.id);
    console.log(usuario.nombre.toUpperCase());
});