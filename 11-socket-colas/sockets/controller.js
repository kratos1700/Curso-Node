const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
    
    // mostramos el ultimo ticket
    socket.emit('ultimo-ticket',ticketControl.ultimo );

    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        //generamos un ticket
        const siguiente = ticketControl.siguiente();
        // enviamos siguiente
        callback( siguiente);
       
        // TODO : notificar que hay un ticket pendiente

    })

}



module.exports = {
    socketController
}

