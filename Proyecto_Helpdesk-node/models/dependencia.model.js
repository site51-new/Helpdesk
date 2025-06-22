const pool = require('../db');

const Dependencia = {
    async crearDependencia(dependencia) {
        try {
            const query = {
                text: `INSERT INTO tDependencias (Nombre_Dependencia)
         VALUES ($1) RETURNING *`,
                values: [dependencia.Nombre_Dependencia],
            };
            const result = await pool.query(query);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    async obtenerDependencia(id) {
        try {
            const query = {
                text: `SELECT * FROM tDependencias WHERE Id_Dependencia = $1`,
                values: [id],
            };
            const result = await pool.query(query);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    async obtenerTodasLasDependencias() {
        try {
            const query = {
                text: `SELECT * FROM tDependencias`,
            };
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    },

    async actualizarDependencia(id, dependencia) {
        try {
            const query = {
                text: `UPDATE tDependencias SET Nombre_Dependencia = $1
         WHERE Id_Dependencia = $2 RETURNING *`,
                values: [dependencia.Nombre_Dependencia, id],
            };
            const result = await pool.query(query);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    async eliminarDependencia(id) {
        try {
            const query = {
                text: `DELETE FROM tDependencias WHERE Id_Dependencia = $1`,
                values: [id],
            };
            await pool.query(query);
        } catch (error) {
            throw error;
        }
    },
};

module.exports = Dependencia;