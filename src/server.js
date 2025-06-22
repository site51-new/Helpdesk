require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

const app = express();

// ✅ CONFIGURAR CORS PERMITIENDO SOLO TU DOMINIO
const corsOptions = {
    origin: 'https://visitante1204.github.io', // Solo este dominio puede hacer peticiones
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// ✅ Middleware para parsear JSON y datos urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Servir archivos estáticos desde docs/public si es necesario
app.use('/public', express.static(path.join(__dirname, '../docs/public')));

// ✅ Registrar rutas
app.use('/', routes);

// ✅ Puerto del servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});
