// para hacer las peticiones http
const axios = require('axios');

const fs = require('fs');

class Busquedas {


    historial = [];
    dbPath= './db/database.json';

    constructor() {
        //TODO: leer DB si existe

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

    }



}

module.exports = Busquedas;

