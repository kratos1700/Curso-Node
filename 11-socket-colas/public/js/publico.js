// REFERENCIAS HTLM
const lblTicket1 = document.querySelector('#lblTicket1');
const lblEscritorio1 = document.querySelector('#lblEscritorio1');

const lblTicket2 = document.querySelector('#lblTicket2');
const lblEscritorio2 = document.querySelector('#lblEscritorio2');

const lblTicket3 = document.querySelector('#lblTicket3');
const lblEscritorio3 = document.querySelector('#lblEscritorio3');

const lblTicket4 = document.querySelector('#lblTicket4');
const lblEscritorio4 = document.querySelector('#lblEscritorio4');

const socket = io();



// escuchamos para mostrar el estado actual , se lanza a 2 lugares, cuando 
// se conecta el socket y cuando lo atendemos
socket.on('estado-actual', (payload) => {
    // desestructuramos el payload
    const [ticket1, ticket2, ticket3, ticket4] = payload;
    // creamos una variable audio y le pasamos la ruta donde esta el archivo mp3
    const audio = new Audio('./audio/new-ticket.mp3');
    audio.play();

    // referenciamos los valores a los campos del html
    if(ticket1){
        lblTicket1.innerText = 'Ticket ' + ticket1.numero;
        lblEscritorio1.innerText = ticket1.escritorio;
    }
    if(ticket2){
        lblTicket2.innerText = 'Ticket ' + ticket2.numero;
        lblEscritorio2.innerText = ticket2.escritorio;
    }
    if(ticket3){
        lblTicket3.innerText = 'Ticket ' + ticket3.numero;
        lblEscritorio3.innerText = ticket3.escritorio;
    }
    if(ticket4){

        lblTicket4.innerText = 'Ticket ' + ticket4.numero;
        lblEscritorio4.innerText = ticket4.escritorio;
    }
    
  
   
})