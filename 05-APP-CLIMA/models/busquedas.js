// para hacer las peticiones http
const axios = require('axios');

class Busquedas{


    historial =[];

    constructor(){
        //TODO: leer DB si existe

    }

    // funcion para configurar los parametros  de la peticion a mapbox
    get paramsMapbox(){
        return {
            // api key
            'access_token': 'pk.eyJ1Ijoia3JhdG9zMTcwMCIsImEiOiJja29lNWw0cDUwMjQ2Mm9wMjU1aHpoeHVwIn0.G29OclmpqHa2Wh1xrQOZGw',
            'limit': 5,
            'language':'es'
        }
    }

    async ciudad(lugar = ''){
        try {
            
     
        // peticion hhttp 
        const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
            params: this.paramsMapbox
        });
        
        const resp = await instance.get();

        console.log(resp.data);

        return [] // retorna lugares
            
        } catch (error) {
           console.log(error)
        }
    }

}

module.exports = Busquedas;

