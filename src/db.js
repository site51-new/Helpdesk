const { Pool } = require('pg');
require('dotenv').config();

if (!process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME || !process.env.DB_HOST) {
    console.error("❌ Faltan variables de entorno necesarias para la conexión a la base de datos.");
    process.exit(1); 
}

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT) || 5433,
});

pool.on('connect', () => {
    console.log('✅ Conexión exitosa a la base de datos PostgreSQL');
});

pool.on('error', (err) => {
    console.error('❌ Error en la conexión a PostgreSQL:', err);
});

module.exports = pool;
