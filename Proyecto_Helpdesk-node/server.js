require('dotenv').config();

const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const router = require('./routes');

const app = express();

const corsOptions = {
    origin: 'https://visitante1204.github.io', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || 'mi-secreto-123',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2
    }
}));

app.use(express.static(path.join(__dirname, '../public')));

app.use(router);

app.use((err, req, res, next) => {
    console.error('Error inesperado:', err);
    res.status(500).json({ mensaje: 'Error inesperado en el servidor' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor iniciado en puerto ${port}`);
});
