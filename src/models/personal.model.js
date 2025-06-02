const pool = require('../db');

const Personal = {
    async crearPersonal(personal) {
        try {
            const query = {
                text: `INSERT INTO tPersonal (Id_Usuario, Id_Dependencia, Nombres, apellido_paterno, apellido_materno, usuario, password, dni, correo)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
                values: [
                    personal.Id_Usuario,
                    personal.Id_Dependencia,
                    personal.Nombres,
                    personal.apellido_paterno,
                    personal.apellido_materno,
                    personal.usuario,
                    personal.password,
                    personal.dni,
                    personal.correo,
                ],
            };
            const result = await pool.query(query);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    async obtenerPersonal(id) {
        try {
            const query = {
                text: `SELECT * FROM tPersonal WHERE Id_Personal = $1`,
                values: [id],
            };
            const result = await pool.query(query);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    async obtenerTodosLosPersonal() {
        try {
            const query = {
                text: `SELECT * FROM tPersonal`,
            };
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    },

    async actualizarPersonal(id, personal) {
        try {
            const query = {
                text: `UPDATE tPersonal SET Id_Usuario = $1, Id_Dependencia = $2, Nombres = $3, apellido_paterno = $4, apellido_materno = $5, usuario = $6, password = $7, dni = $8, correo = $9
         WHERE Id_Personal = $10 RETURNING *`,
                values: [
                    personal.Id_Usuario,
                    personal.Id_Dependencia,
                    personal.Nombres,
                    personal.apellido_paterno,
                    personal.apellido_materno,
                    personal.usuario,
                    personal.password,
                    personal.dni,
                    personal.correo,
                    id,
                ],
            };
            const result = await pool.query(query);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    async eliminarPersonal(id) {
        try {
            const query = {
                text: `DELETE FROM tPersonal WHERE Id_Personal = $1`,
                values: [id],
            };
            await pool.query(query);
        } catch (error) {
            throw error;
        }
    },
};

module.exports = Personal;