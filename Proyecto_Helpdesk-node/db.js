﻿const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT) || 5432,
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
