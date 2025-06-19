require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir recursos estáticos desde docs/public
app.use('/public', express.static(path.join(__dirname, '../docs/public')));

// Registrar rutas
app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});
