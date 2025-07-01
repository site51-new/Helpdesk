const { Pool } = require('pg');
require('dotenv').config();

if (!process.env.DATABASE_URL) {
    console.error('❌ Falta DATABASE_URL');
    process.exit(1);
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.on('connect', () => console.log('✅ Conexión PostgreSQL exitosa'));
pool.on('error', err => console.error('❌ Conexión PostgreSQL falló:', err));

module.exports = pool;
