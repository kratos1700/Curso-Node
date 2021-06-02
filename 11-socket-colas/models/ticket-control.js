const path = require('path');
const fs = require('fs');



// clase ticket
class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}




// calse de control del ticket
class TicketControl {



    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];
        this.init();

    }

    // funcion para generar los registros en la bd
    get toJson() {
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4,


        }
    }

    // funcion que cuando se inicia la llamada al TicketControl lee el archivo json
    init() {
        const { hoy, tickets, ultimo, ultimos4 } = require('../db/data.json');
        // comparamos que la info del json sea la misma fecha que hoy
        if (hoy === this.hoy) {
            // si es verdadero cargamos los tiquets
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimos4 = ultimos4;
        } else {
            // si es otro dia reinicializa la bbdd
            this.guardarDB();

        }

    }
    // funcion para guardar los datos al archivo json
    guardarDB() {
        const dbPath = path.join(__dirname, '../db/data.json');
        //guardamos el objeto  que convertimos a un json  al path
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));


    }


    // metodo para crear un  ticket añadiendo a un array 
    siguiente() {
        this.ultimo += 1;
        // instanciamos un nuevo ticket, pasandolo como ultimo y ningun escritorio atendiendolo
        const ticket = new Ticket(this.ultimo, null);
        // añadimos el ticket al arreglo
        this.tickets.push(ticket);

        // guardamos en bd
        this.guardarDB();

        return 'Ticket ' + ticket.numero;

    }


    // funcion para atender un ticket
    atenderTicket(escritorio) {

        // si  no hay tickets
        if (this.tickets.length === 0) {
            return null;
        }


        // eliminamos el primer ticket del arreglo
        const ticket = this.tickets.shift(); // this.tickets[0];
        // se le asigna el ticket al escritorio
        ticket.escritorio = escritorio;
        // añadimos el ticket al arreglo al primer lugar
        this.ultimos4.unshift(ticket);

        if (this.ultimos4.length > 4) {
            // eliminamos el ultimo elemento del arreglo y lo regresamos
            this.ultimos4.splice(-1,1);
        }
        // guardamos 
        this.guardarDB();

        return ticket;



    }

}

module.exports = TicketControl;