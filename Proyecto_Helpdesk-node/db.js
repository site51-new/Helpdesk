const { Pool } = require('pg');
require('dotenv').config();

if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL no está definida');
    process.exit(1);
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.on('connect', () => {
    console.log('✅ Conexión exitosa a PostgreSQL');
});

pool.on('error', (err) => {
    console.error('❌ Error en conexión PostgreSQL:', err);
});

module.exports = pool;
