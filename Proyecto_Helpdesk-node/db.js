const { Pool } = require('pg');
require('dotenv').config();

const requiredEnv = ['DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_HOST'];
const missing = requiredEnv.filter((key) => !process.env[key]);

if (missing.length > 0) {
    console.error(`Faltan variables de entorno necesarias: ${missing.join(', ')}`);
    process.exit(1);
}

console.log('Variables cargadas correctamente desde .env');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT) || 5432,
    ssl: {
        require: true,                
        rejectUnauthorized: false     
    }
});

pool.on('connect', () => {
    console.log('✅ Conexión exitosa a la base de datos PostgreSQL');
});

pool.on('error', (err) => {
    console.error('❌ Error en la conexión a PostgreSQL:', err);
});

module.exports = pool;
