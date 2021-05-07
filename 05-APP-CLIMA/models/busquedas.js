// para hacer las peticiones http
const axios = require('axios');

const fs = require('fs');

class Busquedas {


    historial = [];
    dbPath= './db/database.json';

    constructor() {
        //TODO: leer DB si existe
        this.leerDB()

    }
    // funciona para poner el primer caracter en mayuscula
    get historialCapitalizado(){

        return this.historial.map(lugar => {
            // partimos por los espacions
            let palabras = lugar.split (' ')
            // en cada palabra la primera la pasamos a mayuscula
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1));
            // retornamos todo unido
            return palabras.join(' ');
        })
    }


    // funcion para configurar los parametros  de la peticion a mapbox
    get paramsMapbox() {
        return {
            // api key configurado en archivo .env configurando el modulo dotenv
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    // obtenemos datos de la localizacion
    async ciudad(lugar = '') {
        try {


            // peticion hhttp 
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();

            // retornamos los datos con un objeto de forma implicita ({})
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],



            }));

        } catch (error) {
            console.log(error);
        }
    }


    // funcion para configurar los parametros  de la peticion a mapbox
    get paramsWeather() {
        return {
            // api key configurado en archivo .env configurando el modulo dotenv
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }

    async climaLugar(lat, lon) {
        try {

            // peticion hhttp , cuidado se tiene que poner https:// 
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                // desestructurado i le pasamos la lat y long
                params: { ...this.paramsWeather, lat, lon }
            });

            const respc = await instance.get();

            // desestructuramos para recuperar valores de la peticion el weather para la desc
            // otros valores en el main
            const { weather, main } = respc.data;

            return {
                des: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }



        } catch (error) {
            console.log(error)
        }
    }


    guardarHistorial( lugar= ''){
        // no duplicados
        if(this.historial.includes(lugar.toLocaleLowerCase())){
            return;
        }

        // con esto hacemos que solo guardamos 6 registros al archivo
        this.historial= this.historial.splice(0,5);
        
        // afegim al inici
        this.historial.unshift(lugar.toLocaleLowerCase());

        // guardar bbd
        this.guardarDB();

    }

    // guadamos el historial al json
    guardarDB (){
        const payload ={
            historial: this.historial
        };

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));

    }

    leerDB(){

        // comprobamos que no exista
        if(!fs.existsSync(this.dbPath)){
            return;
        }

        // si existe lo leemos
        const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
        const data = JSON.parse(info);
        this.historial= data.historial;

    }



}

module.exports = Busquedas;

