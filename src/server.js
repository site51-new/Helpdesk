require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes');

app.set('view engine', 'html');
app.set('views', path.join(__dirname, '../docs'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos
app.use('/public', express.static(path.join(__dirname, '../docs/public')));

// Rutas
app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
