require('dotenv').config();  

const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('✅ Backend funcionando correctamente');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Servidor escuchando en puerto ${PORT}`));

app.use((err, req, res, next) => {
    console.error('Error capturado en middleware:', err);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
});
