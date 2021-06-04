// REFERENCIAS DEL ESCRITORIO.HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');








// obtenemos la lectura de parametros del URL
const searchParams = new URLSearchParams (window.location.search);
// comprobamos que exista el parametro escritorio
if(!searchParams.has ('escritorio')){
    window.location='index.html';
    // si no existe mostramos un error
    throw new Error ('El escritorio es obligatorio');

}

const escritorio = searchParams.get('escritorio');
//console.log({escritorio});
// mostramos el escritorio
lblEscritorio.innerText = escritorio;


divAlerta.style.display= 'none';

const socket = io();


// si el socket esta conectado el boton esta activado
socket.on('connect', () => {
    // console.log('Conectado');

    btnAtender.disabled= false;

});

// si el socket se cae  desconectamos el boton
socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnAtender.disabled= true;
});


// escuchamos para mostrar el ultimo ticket 
socket.on('ultimo-ticket', (ultimo)=>{
  //  lblNuevoTicket.innerText= 'Ticket ' + ultimo ;
})




btnAtender.addEventListener( 'click', () => {

    // enviamos el objeto escritorio , y desestructuramos el payload (ok, ticket)
 socket.emit('atender-ticket',{escritorio}, ({ok, ticket})=>{

    if(!ok){
        lblTicket.innerText='Nadie '
        return divAlerta.style.display= '';
    }
    lblTicket.innerText='Ticket '+ ticket.numero;

    
 });
    
 /*    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText= ticket;
    }); */

});