const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors({
    origin: 'https://visitante1204.github.io',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('/api/incidencias', cors());

app.use(express.json());
app.use(express.static('public'));

app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
