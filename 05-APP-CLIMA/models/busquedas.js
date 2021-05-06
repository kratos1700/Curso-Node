// para hacer las peticiones http
const axios = require('axios');

class Busquedas{


    historial =[];

    constructor(){
        //TODO: leer DB si existe

    }

    async ciudad(lugar = ''){
        try {
            
        // peticion http
        //console.log('ciudad',lugar)
        // peticion hhttp 
        const resp = await axios.get('https://reqres.in/api/users?page=2');

        console.log(resp.data);

        return []; // retorna lugares
            
        } catch (error) {
            return [];
        }
    }

}

module.exports = Busquedas;

