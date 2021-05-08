
const express = require('express')
const app = express()
// para usar el archivo de variables
require('dotenv').config();
const port = process.env.PORT;

// TODO para parciales 
const hbs= require('hbs');

// hbs para renderizar Handlebars
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials', function (err){})

// para servir contenido estatico
// esto tiene preerencia a las linias siguientes  app.get('/')...
app.use(express.static('public'))


app.get('/',  (req, res) => {
    // pasamos opciones para renderizar al home
    res.render('home', {
        titulo: 'Curuso - Node.Js',
        nombre: 'David'
    });
  });
 
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

  