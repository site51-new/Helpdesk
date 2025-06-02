const pool = require('../db');

const Usuario = {
    async crearUsuario(usuario) {
        try {
            const query = {
                text: `INSERT INTO tUsuarios (Id_Dependencia, usuario, password, dni, correo)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
                values: [
                    usuario.Id_Dependencia,
                    usuario.usuario,
                    usuario.password,
                    usuario.dni,
                    usuario.correo,
                ],
            };
            const result = await pool.query(query);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    async obtenerUsuario(id) {
        try {
            const query = {
                text: `SELECT * FROM tUsuarios WHERE Id_Usuario = $1`,
                values: [id],
            };
            const result = await pool.query(query);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    async obtenerTodosLosUsuarios() {
        try {
            const query = {
                text: `SELECT * FROM tUsuarios`,
            };
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    },

    async actualizarUsuario(id, usuario) {
        try {
            const query = {
                text: `UPDATE tUsuarios SET Id_Dependencia = $1, usuario = $2, password = $3, dni = $4, correo = $5
         WHERE Id_Usuario = $6 RETURNING *`,
                values: [
                    usuario.Id_Dependencia,
                    usuario.usuario,
                    usuario.password,
                    usuario.dni,
                    usuario.correo,
                    id,
                ],
            };
            const result = await pool.query(query);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    async eliminarUsuario(id) {
        try {
            const query = {
                text: `DELETE FROM tUsuarios WHERE Id_Usuario = $1`,
                values: [id],
            };
            await pool.query(query);
        } catch (error) {
            throw error;
        }
    },
};

module.exports = Usuario;
