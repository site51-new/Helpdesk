require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const router = require('./routes');

const app = express();

const corsOptions = {
    origin: 'https://visitante1204.github.io',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.originalUrl}`);
    next();
});

app.use('/', router);


if (app._router && app._router.stack) {
    console.log('========== RUTAS DEFINIDAS EN SERVER ===========');
    app._router.stack.forEach(layer => {
        if (layer.route) {
            const methods = Object.keys(layer.route.methods).join(',').toUpperCase();
            console.log(`${methods} ${layer.route.path}`);
        }
    });
    console.log('===============================================');
}

app.use((req, res) => {
    res.status(404).json({ mensaje: 'Ruta no encontrada' });
});


app.use((err, req, res, next) => {
    console.error('Error inesperado:', err);
    res.status(500).json({ mensaje: 'Error inesperado en el servidor' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor iniciado en puerto ${port}`);
});
