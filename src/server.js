require('dotenv').config(); 
const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', './docs');  // Cambiado de './views' a './docs'

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde docs/public
app.use('/public', express.static(path.join(__dirname, '../docs/public')));

app.use('/', routes);

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});
