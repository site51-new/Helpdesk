const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes');

// Configuración de Express
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', './views');

// Middleware para parsear JSON y URL encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Rutas
app.use('/', routes);

// Iniciar servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});
