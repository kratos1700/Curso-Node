
const express = require('express')
const app = express()
const port = 8080

// para servir contenido estatico
// esto tiene preerencia a las linias siguientes  app.get('/')...
app.use(express.static('public'))
 
/* app.get('/',  (req, res) => {
  res.send('Hola Bixitooo')
}); */

// muestra la paguina de error si no hay nada a mostrar
app.get('*',  (req, res) => {
    // con sendfile enviamos el archivo
    // con __dirname creamos el path donde se encuentra
    res.sendFile(__dirname + '/public/404.html')
  });

  app.listen(port, () => {
    console.log(`Se esta escuchando por:  http://localhost:${port}`)
  })

  