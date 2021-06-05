 
 // REFERENCIAS AL HTML
 const miFormulario = document.querySelector('form');

  // comprobamos si estamos en produccion o desarrollo
  const url = (window.location.hostname.includes('localhost')) 
  ?'http://localhost:8082/api/auth/' 
  : 'https://curso-node-resserver.herokuapp.com/api/auth/';
 
 
// creamos un listener del evento submit del formulario
 miFormulario.addEventListener('submit', ev =>{
     // evita hacer un refresco del navegador web
     ev.preventDefault();

     // info que enviaremos al servidor
     const formData={};
     // recorremos los campos
     for(let el of miFormulario.elements){
         // si el campo es > a 0, hay info
         if(el.name.length > 0 )
             formData[el.name] = el.value   
     }

     fetch(url + 'login',{
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {'Content-Type':'application/json'}
     })
     .then(resp => resp.json() )
     .then(({msg,token}) =>{
        // si hay un error lo mostramos en pantalla
        if(msg){
            console.error(msg);
        }
        // guardamos el token an el almacenamiento local
        localStorage.setItem('token', token);
     })
     .catch(err => {
        console.log(err)
     })

 });
 


 // funcion para hacer login con una cuenta de google
 function onSignIn(googleUser) {
    // var profile = googleUser.getBasicProfile();
     //console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
     //console.log('Name: ' + profile.getName());
     //console.log('Image URL: ' + profile.getImageUrl());
     //console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
// para el token de google
     var id_token = googleUser.getAuthResponse().id_token;

     const data = {id_token};
     
// hacemos la peticion al backend tipo post
     fetch(url +'google', {
         method: 'POST',
         body: JSON.stringify(data),
         headers: {'Content-Type':'application/json'}
         
     })
     .then ( resp =>  resp.json() )
     // extraemos el valor del token
     .then (({token} ) =>{     
       // guardamos el token en el local storage
        localStorage.setItem('token', token)
     })
      .catch(console.log);


    

 }
 // funcion para desconectar 
 function signOut() {
   var auth2 = gapi.auth2.getAuthInstance();
   auth2.signOut().then(function () {
     console.log('User signed out.');
   });
 }