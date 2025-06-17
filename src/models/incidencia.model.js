const pool = require('../db');

const Incidencia = {
    async crearIncidencia(incidencia) {
        try {
            const query = {
                text: `INSERT INTO tIncidencias (Id_Dependencia, categoria, tipo_dispositivo, marca, modelo, glosa, tecnico_encargado, estado_incidencia, fechayhora, codigo_del_bien, usuario_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
                values: [
                    incidencia.Id_Dependencia,
                    incidencia.categoria,
                    incidencia.tipo_dispositivo,
                    incidencia.marca,
                    incidencia.modelo,
                    incidencia.glosa,
                    incidencia.tecnico_encargado || null,
                    incidencia.estado_incidencia || 'Pendiente',
                    incidencia.fechayhora,
                    incidencia.codigo_del_bien,
                    incidencia.usuario_id 
                ],
            };
            const result = await pool.query(query);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    async obtenerIncidencia(id) {
        try {
            const query = {
                text: `SELECT * FROM tIncidencias WHERE Id_Incidencia = $1`,
                values: [id],
            };
            const result = await pool.query(query);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    async obtenerIncidenciasPorUsuario(usuario_id) {
        try {
            const query = {
                text: `SELECT * FROM tIncidencias WHERE usuario_id = $1 ORDER BY fechayhora DESC`,
                values: [usuario_id],
            };
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    },

    async obtenerTodasLasIncidencias() {
        try {
            const query = {
                text: `SELECT * FROM tIncidencias`,
            };
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    },

    async actualizarIncidencia(id, incidencia) {
        try {
            const query = {
                text: `UPDATE tIncidencias SET Id_Dependencia = $1, categoria = $2, tipo_dispositivo = $3, marca = $4, modelo = $5, glosa = $6, tecnico_encargado = $7, estado_incidencia = $8, fechayhora = $9, codigo_del_bien = $10, usuario_id = $11
         WHERE Id_Incidencia = $12 RETURNING *`,
                values: [
                    incidencia.Id_Dependencia,
                    incidencia.categoria,
                    incidencia.tipo_dispositivo,
                    incidencia.marca,
                    incidencia.modelo,
                    incidencia.glosa,
                    incidencia.tecnico_encargado,
                    incidencia.estado_incidencia,
                    incidencia.fechayhora,
                    incidencia.codigo_del_bien,
                    incidencia.usuario_id,
                    id,
                ],
            };
            const result = await pool.query(query);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    async eliminarIncidencia(id) {
        try {
            const query = {
                text: `DELETE FROM tIncidencias WHERE Id_Incidencia = $1`,
                values: [id],
            };
            await pool.query(query);
        } catch (error) {
            throw error;
        }
    },
};

module.exports = Incidencia;
