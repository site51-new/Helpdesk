const pool = require('../db');

const Estado = {
    async crearEstado(estado) {
        try {
            const query = {
                text: `INSERT INTO tEstados (Id_Incidencia, descripci�n)
         VALUES ($1, $2) RETURNING *`,
                values: [estado.Id_Incidencia, estado.descripci�n],
            };
            const result = await pool.query(query);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    async obtenerEstado(id) {
        try {
            const query = {
                text: `SELECT * FROM tEstados WHERE Id_Estado = $1`,
                values: [id],
            };
            const result = await pool.query(query);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    async obtenerTodosLosEstados() {
        try {
            const query = {
                text: `SELECT * FROM tEstados`,
            };
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    },

    async actualizarEstado(id, estado) {
        try {
            const query = {
                text: `UPDATE tEstados SET Id_Incidencia = $1, descripci�n = $2
         WHERE Id_Estado = $3 RETURNING *`,
                values: [estado.Id_Incidencia, estado.descripci�n, id],
            };
            const result = await pool.query(query);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    async eliminarEstado(id) {
        try {
            const query = {
                text: `DELETE FROM tEstados WHERE Id_Estado = $1`,
                values: [id],
            };
            await pool.query(query);
        } catch (error) {
            throw error;
        }
    },
};

module.exports = Estado;