const pool = require('../db');
const { v4: uuidv4 } = require('uuid');

const Incidencia = {
    async crearIncidencia(incidencia) {
        try {
            const nuevaIncidenciaId = uuidv4();

            const query = {
                text: `INSERT INTO helpdesk_system."tIncidencias" (
                    "Id_Incidencia", "Id_Dependencia", categoria, tipo_dispositivo, marca, modelo,
                    glosa, tecnico_encargado, estado_incidencia, fechayhora, codigo_del_bien
                ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
                RETURNING *`,
                values: [
                    nuevaIncidenciaId,
                    incidencia.Id_Dependencia,
                    incidencia.categoria,
                    incidencia.tipo_dispositivo,
                    incidencia.marca,
                    incidencia.modelo || null,
                    incidencia.glosa || null,
                    incidencia.tecnico_encargado || null,
                    incidencia.estado_incidencia || 'Pendiente',
                    incidencia.fechayhora,
                    incidencia.codigo_del_bien || null,
                ],
            };

            const result = await pool.query(query);
            return result.rows[0];
        } catch (error) {
            console.error("Error en modelo crearIncidencia:", error.message);
            throw error;
        }
    },

    async obtenerIncidencia(id) {
        try {
            const query = {
                text: `SELECT * FROM helpdesk_system."tIncidencias" WHERE "Id_Incidencia" = $1`,
                values: [id],
            };
            const result = await pool.query(query);
            return result.rows[0];
        } catch (error) {
            console.error("Error al obtener incidencia:", error.message);
            throw error;
        }
    },

    async obtenerTodasLasIncidencias() {
        try {
            const query = {
                text: `SELECT * FROM helpdesk_system."tIncidencias" ORDER BY fechayhora DESC`,
            };
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            console.error("Error al obtener todas las incidencias:", error.message);
            throw error;
        }
    },

    async actualizarIncidencia(id, incidencia) {
        try {
            const query = {
                text: `UPDATE helpdesk_system."tIncidencias"
                SET "Id_Dependencia" = $1,
                    categoria = $2,
                    tipo_dispositivo = $3,
                    marca = $4,
                    modelo = $5,
                    glosa = $6,
                    tecnico_encargado = $7,
                    estado_incidencia = $8,
                    fechayhora = $9,
                    codigo_del_bien = $10
                WHERE "Id_Incidencia" = $11
                RETURNING *`,
                values: [
                    incidencia.Id_Dependencia,
                    incidencia.categoria,
                    incidencia.tipo_dispositivo,
                    incidencia.marca,
                    incidencia.modelo || null,
                    incidencia.glosa || null,
                    incidencia.tecnico_encargado || null,
                    incidencia.estado_incidencia,
                    incidencia.fechayhora,
                    incidencia.codigo_del_bien || null,
                    id
                ],
            };
            const result = await pool.query(query);
            return result.rows[0];
        } catch (error) {
            console.error("Error al actualizar incidencia:", error.message);
            throw error;
        }
    },

    async eliminarIncidencia(id) {
        try {
            const query = {
                text: `DELETE FROM helpdesk_system."tIncidencias" WHERE "Id_Incidencia" = $1`,
                values: [id],
            };
            await pool.query(query);
        } catch (error) {
            console.error("Error al eliminar incidencia:", error.message);
            throw error;
        }
    },

    async obtenerIncidenciasPorUsuario(idUsuario) {
        try {
            const query = {
                text: `SELECT * FROM helpdesk_system."tIncidencias" WHERE "Id_Dependencia" = $1 ORDER BY fechayhora DESC`,
                values: [idUsuario],
            };
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            console.error('Error al obtener incidencias por usuario:', error.message);
            throw error;
        }
    },
};

module.exports = Incidencia;
