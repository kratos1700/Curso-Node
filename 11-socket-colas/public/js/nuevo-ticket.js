// REFERENCIAS HTML

const lblNuevoTicket=  document.querySelector('#lblNuevoTicket');
const btCrear = document.querySelector('button') ;





const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');

    btCrear.disabled= false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btCrear.disabled= true;
});


// escuchamos para mostrar el ultimo ticket 
socket.on('ultimo-ticket', (ultimo)=>{
    lblNuevoTicket.innerText= 'Ticket ' + ultimo ;
})




btCrear.addEventListener( 'click', () => {

 
    
    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText= ticket;
    });

});