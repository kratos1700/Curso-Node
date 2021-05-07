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
            // api key configurado en archivo .env configurando el modulo dotenv
            'access_token': process.env.MAPBOX_KEY,
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

        // retornamos los datos con un objeto de forma implicita ({})
        return resp.data.features.map( lugar =>({
            id: lugar.id,
            nombre: lugar.place_name,
            lng: lugar.center[0],
            lat: lugar.center[1],


        }));

        console.log(resp.data.features);

       
            
        } catch (error) {
           console.log(error)
        }
    }

}

module.exports = Busquedas;

