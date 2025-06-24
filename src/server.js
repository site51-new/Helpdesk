
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

//Si en producción se requiere solamente permitir https://visitante1204.github.io , se reemplaza por el comodín:
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.static('public'));

app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
