require('dotenv').config();
const { Pool } = require('pg');

// Crear un pool de conexiones usando las variables del .env
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: false, // Desactivar SSL en entorno local
});

// Verificación opcional al iniciar el servidor
pool.connect()
    .then(client => {
        console.log('✅ Conexión a la base de datos PostgreSQL exitosa');
        client.release();
    })
    .catch(err => {
        console.error('❌ Error al conectar a la base de datos:', err.message);
        process.exit(1);
    });

module.exports = pool;
