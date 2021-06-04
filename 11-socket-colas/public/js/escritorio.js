// REFERENCIAS DEL ESCRITORIO.HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');










// obtenemos la lectura de parametros del URL
const searchParams = new URLSearchParams(window.location.search);
// comprobamos que exista el parametro escritorio
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    // si no existe mostramos un error
    throw new Error('El escritorio es obligatorio');

}

const escritorio = searchParams.get('escritorio');
//console.log({escritorio});
// mostramos el escritorio
lblEscritorio.innerText = escritorio;


divAlerta.style.display = 'none';

const socket = io();


// si el socket esta conectado el boton esta activado
socket.on('connect', () => {
    // console.log('Conectado');

    btnAtender.disabled = false;

});

// si el socket se cae  desconectamos el boton
socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnAtender.disabled = true;
});


// escuchamos para mostrar EL NUMERO DE LA COLA DE LA LISTA DE TICKETS
socket.on('tickets-pendientes', (pendientes) => {
    // en caso de que la cola sea igual a 0 no mostramos la etiqueta 
    if (pendientes === 0) {
        lblPendientes.style.display = 'none';
    } else {
        divAlerta.style.display = 'none'; // ocultamos el mensaje de alerta
        lblPendientes.style.display = ''; // sino si que la mostramos
        lblPendientes.innerText = pendientes;
    }
    
})




btnAtender.addEventListener('click', () => {

    // enviamos el objeto escritorio , y desestructuramos el payload (ok, ticket)
    socket.emit('atender-ticket', { escritorio }, ({ ok, ticket }) => {

        if (!ok) {
            lblTicket.innerText = 'Nadie '
            return divAlerta.style.display = '';
        }
        lblTicket.innerText = 'Ticket ' + ticket.numero;


    });

  

});