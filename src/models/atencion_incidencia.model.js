const pool = require('../db');

const AtencionIncidencia = {
    async crearAtencionIncidencia(atencionIncidencia) {
        try {
            const query = {
                text: `INSERT INTO tAtencion_Incidencias (Id_Incidencia, Id_Dependencia, categoria, tipo_dispositivo, marca, modelo, glosa, tecnico_encargado, estado_incidencia, IdAtencion_Incidencia, estado_atencion, fechayhora, codigo_del_bien)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
                values: [
                    atencionIncidencia.Id_Incidencia,
                    atencionIncidencia.Id_Dependencia,
                    atencionIncidencia.categoria,
                    atencionIncidencia.tipo_dispositivo,
                    atencionIncidencia.marca,
                    atencionIncidencia.modelo,
                    atencionIncidencia.glosa,
                    atencionIncidencia.tecnico_encargado,
                    atencionIncidencia.estado_incidencia,
                    atencionIncidencia.IdAtencion_Incidencia,
                    atencionIncidencia.estado_atencion,
                    atencionIncidencia.fechayhora,
                    atencionIncidencia.codigo_del_bien,
                ],
            };
            const result = await pool.query(query);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    async obtenerAtencionIncidencia(id) {
        try {
            const query = {
                text: `SELECT * FROM tAtencion_Incidencias WHERE IdAtencion_Incidencia = $1`,
                values: [id],
            };
            const result = await pool.query(query);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    async obtenerTodasLasAtencionesIncidencias() {
        try {
            const query = {
                text: `SELECT * FROM tAtencion_Incidencias`,
            };
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    },

    async actualizarAtencionIncidencia(id, atencionIncidencia) {
        try {
            const query = {
                text: `UPDATE tAtencion_Incidencias SET Id_Incidencia = $1, Id_Dependencia = $2, categoria = $3, tipo_dispositivo = $4, marca = $5, modelo = $6, glosa = $7, tecnico_encargado = $8, estado_incidencia = $9, estado_atencion = $10, fechayhora = $11, codigo_del_bien = $12
         WHERE IdAtencion_Incidencia = $13 RETURNING *`,
                values: [
                    atencionIncidencia.Id_Incidencia,
                    atencionIncidencia.Id_Dependencia,
                    atencionIncidencia.categoria,
                    atencionIncidencia.tipo_dispositivo,
                    atencionIncidencia.marca,
                    atencionIncidencia.modelo,
                    atencionIncidencia.glosa,
                    atencionIncidencia.tecnico_encargado,
                    atencionIncidencia.estado_incidencia,
                    atencionIncidencia.estado_atencion,
                    atencionIncidencia.fechayhora,
                    atencionIncidencia.codigo_del_bien,
                    id,
                ],
            };
            const result = await pool.query(query);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    async eliminarAtencionIncidencia(id) {
        try {
            const query = {
                text: `DELETE FROM tAtencion_Incidencias WHERE IdAtencion_Incidencia = $1`,
                values: [id],
            };
            await pool.query(query);
        } catch (error) {
            throw error;
        }
    },
};

module.exports = AtencionIncidencia;
