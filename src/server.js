require('dotenv').config(); 
const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', './docs');  // Carpeta donde están los archivos HTML

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde docs/public bajo la ruta /public
app.use('/public', express.static(path.join(__dirname, '../docs/public')));

// Rutas definidas en routes.js
app.use('/', routes);

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});
