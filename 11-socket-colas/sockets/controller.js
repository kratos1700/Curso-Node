const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {

    // mostramos el ultimo ticket
    socket.emit('ultimo-ticket', ticketControl.ultimo);
    // mostramos los ultimos 4 tiquets
    socket.emit('estado-actual', ticketControl.ultimos4);

    // escuchamos siguiente tiquet
    socket.on('siguiente-ticket', (payload, callback) => {

        //generamos un ticket
        const siguiente = ticketControl.siguiente();
        // enviamos siguiente
        callback(siguiente);

        // TODO : notificar que hay un ticket pendiente

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

