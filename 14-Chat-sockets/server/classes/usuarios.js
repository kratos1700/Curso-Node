class Usuarios {

    // constructor que inicializamos un arreglo vacio de personas
    constructor() {
        this.personas = [];
    }

    // agregamos persona al arreglo pasando id y nombre
    agregarPersona(id, nombre) {
        let persona = { id, nombre };
        // agregamos la persona
        this.personas.push(persona);
        //retornamos las personas
        return this.personas; 
    }

    //obtenemos la persona por id
    getPersona(id) {
        // buscamos la persona por id, como sabemos que el resultado es el primero del arreglo
        // le pasamos la primera posicion [0]
        let persona = this.personas.filter(persona =>
            persona.id === id)[0];
            return persona;
    }

    //retornamos todas las personas
    getPersonas(){
        return this.personas
    }
    //obtenemos las personas por salas
    getPersonasPorSala(sala){

    }
    // eliminamos la persona del arreglo por id
    borrarPersona(id){
        // estas linias son lo mismo
       /* this.personas= this.personas.filter(persona =>{
            return persona.id !=id
        }); */
        let personaBorrada = this.getPersona(id);

        this.personas= this.personas.filter(persona =>persona.id !=id);
        // retornamos la persona borrada
        return personaBorrada;
    }

}

module.exports = {
    Usuarios
}