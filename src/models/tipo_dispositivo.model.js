const pool = require('../db');

const TipoDispositivo = {
    async crearTipoDispositivo(tipoDispositivo) {
        try {
            const query = {
                text: `INSERT INTO tTipo_Dispositivo (Id_Categoria, tipo_dispositivo, nombre_categoria, marca, modelo, glosa, descripcion)
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
                values: [
                    tipoDispositivo.Id_Categoria,
                    tipoDispositivo.tipo_dispositivo,
                    tipoDispositivo.nombre_categoria,
                    tipoDispositivo.marca,
                    tipoDispositivo.modelo,
                    tipoDispositivo.glosa,
                    tipoDispositivo.descripcion,
                ],
            };
            const result = await pool.query(query);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    async obtenerTipoDispositivo(id) {
        try {
            const query = {
                text: `SELECT * FROM tTipo_Dispositivo WHERE Id_Tipo_Dispositivo = $1`,
                values: [id],
            };
            const result = await pool.query(query);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    async obtenerTodosLosTiposDispositivos() {
        try {
            const query = {
                text: `SELECT * FROM tTipo_Dispositivo`,
            };
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    },

    async actualizarTipoDispositivo(id, tipoDispositivo) {
        try {
            const query = {
                text: `UPDATE tTipo_Dispositivo SET Id_Categoria = $1, tipo_dispositivo = $2, nombre_categoria = $3, marca = $4, modelo = $5, glosa = $6, descripcion = $7
         WHERE Id_Tipo_Dispositivo = $8 RETURNING *`,
                values: [
                    tipoDispositivo.Id_Categoria,
                    tipoDispositivo.tipo_dispositivo,
                    tipoDispositivo.nombre_categoria,
                    tipoDispositivo.marca,
                    tipoDispositivo.modelo,
                    tipoDispositivo.glosa,
                    tipoDispositivo.descripcion,
                    id,
                ],
            };
            const result = await pool.query(query);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    async eliminarTipoDispositivo(id) {
        try {
            const query = {
                text: `DELETE FROM tTipo_Dispositivo WHERE Id_Tipo_Dispositivo = $1`,
                values: [id],
            };
            await pool.query(query);
        } catch (error) {
            throw error;
        }
    },
};

module.exports = TipoDispositivo;