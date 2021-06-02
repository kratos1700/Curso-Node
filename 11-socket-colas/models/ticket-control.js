const path = require('path');
const fs = require('fs');




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
            // es otro dia
            this.guardarDB();

        }

    }
    // funcion para guardar los datos al archivo json
    guardarDB() {
        const dbPath = path.join(__dirname, '../db/data.json');
        //guardamos el objeto  que convertimos a un json  al path
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));


    }

}

module.exports = TicketControl;