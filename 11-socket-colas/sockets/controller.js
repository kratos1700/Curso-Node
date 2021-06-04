const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
    /**
     * ESTOS EVENTOS SE LANZAN CUANDO UN CLIENTE SE CONECTA
     */
    // mostramos el ultimo ticket
    socket.emit('ultimo-ticket', ticketControl.ultimo);
    // mostramos los ultimos 4 tiquets
    socket.emit('estado-actual', ticketControl.ultimos4);
    // mostramos la cola de los tickets
    socket.emit('tickets-pendientes', ticketControl.tickets.length)



    // escuchamos siguiente tiquet
    socket.on('siguiente-ticket', (payload, callback) => {

        //generamos un ticket
        const siguiente = ticketControl.siguiente();
        // enviamos siguiente
        callback(siguiente);
        //notificar que hay un ticket pendiente
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length) 
        // TODO : 

    });


    //escuchamos atender tiquet
    socket.on('atender-ticket', ({ escritorio }, callback) => {

        if (!escritorio) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        }

        // atendemos el ticket
        const ticket = ticketControl.atenderTicket(escritorio);

        // mostramos los ultimos 4 tiquets , emitiendo a todas las pantallas con el broadcast
        socket.broadcast.emit('estado-actual', ticketControl.ultimos4);
        // mostramos la cola de los tickets
        socket.emit('tickets-pendientes', ticketControl.tickets.length) //al escritorio actual que atiende
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length) // a los demas escritorios
        // si el ticket no existe
        if (!ticket) {
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            });
        } else { // en caso de quedar alguno ,  le pasamos el ticket
            callback({
                ok: true,
                ticket
            })
        }

    })

}



module.exports = {
    socketController
}

