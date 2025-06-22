const pool = require('../db');

const Sede = {
    async crearSede(sede) {
        try {
            const query = {
                text: `INSERT INTO tSedes (Nombre_Sede)
         VALUES ($1) RETURNING *`,
                values: [sede.Nombre_Sede],
            };
            const result = await pool.query(query);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    async obtenerSede(id) {
        try {
            const query = {
                text: `SELECT * FROM tSedes WHERE Id_Sede = $1`,
                values: [id],
            };
            const result = await pool.query(query);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    async obtenerTodasLasSedes() {
        try {
            const query = {
                text: `SELECT * FROM tSedes`,
            };
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    },

    async actualizarSede(id, sede) {
        try {
            const query = {
                text: `UPDATE tSedes SET Nombre_Sede = $1
         WHERE Id_Sede = $2 RETURNING *`,
                values: [sede.Nombre_Sede, id],
            };
            const result = await pool.query(query);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    async eliminarSede(id) {
        try {
            const query = {
                text: `DELETE FROM tSedes WHERE Id_Sede = $1`,
                values: [id],
            };
            await pool.query(query);
        } catch (error) {
            throw error;
        }
    },
};

module.exports = Sede;