
const express = require('express')
const app = express()
const port = 8080
 
app.get('/',  (req, res) => {
  res.send('Hola Bixitooo')
});


app.get('*',  (req, res) => {
    res.send('404 Pagina no encontrada ')
  });

  app.listen(port, () => {
    console.log(`Se esta escuchando por:  http://localhost:${port}`)
  })