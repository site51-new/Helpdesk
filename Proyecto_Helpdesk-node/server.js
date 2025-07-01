require('dotenv').config();

const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const pool = require('./db');  

const app = express();

const corsOptions = {
    origin: 'https://visitante1204.github.io',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

app.options('*', cors(corsOptions));

app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('✅ Backend funcionando correctamente');
});

app.get('/test-db', async (req, res) => {
    try {
        const query = `SELECT * FROM helpdesk_system."tIncidencias" LIMIT 1;`;
        const { rows } = await pool.query(query);

        res.json({
            message: 'Conexión a base de datos OK y tabla accesible',
            datos: rows.length > 0 ? rows : 'Tabla vacía o sin datos',
        });
    } catch (err) {
        console.error('Error conexión DB o tabla:', err);
        res.status(500).json({
            message: 'Error conexión a base de datos o acceso a tabla',
            error: err.message,
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Servidor escuchando en puerto ${PORT}`));

app.use((err, req, res, next) => {
    console.error('❌ Error capturado en middleware:', err);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
});
