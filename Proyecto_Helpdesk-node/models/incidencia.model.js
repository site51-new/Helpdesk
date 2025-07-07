const pool = require('../db');
const { v4: uuidv4 } = require('uuid');

const Incidencia = {
    async crearIncidencia(req, res) {
    try {
        const incidencia = req.body;

        const camposObligatorios = [
            'Id_Dependencia',
            'categoria',
            'tipo_dispositivo',
            'marca',
            'glosa',
            'fechayhora',
            'codigo_del_bien',
        ];

        for (const campo of camposObligatorios) {
            if (!incidencia[campo]) {
                return res.status(400).json({ mensaje: `Falta el campo obligatorio ${campo}` });
            }
        }

        const nuevaIncidencia = await Incidencia.crearIncidencia(incidencia);
        res.status(201).json({
            mensaje: 'Incidencia creada correctamente',
            incidencia: nuevaIncidencia,
        });
    } catch (error) {
        console.error('Error al crear incidencia:', error);
        res.status(500).json({
            mensaje: 'Error al crear incidencia',
            detalles: error.message,
            errorCompleto: error, 
        });
    }
}

    async obtenerIncidencia(id) {
        try {
            const result = await pool.query(
                `SELECT * FROM helpdesk_system."tIncidencias" WHERE "Id_Incidencia" = $1`,
                [id]
            );
            return result.rows[0];
        } catch (error) {
            console.error("❌ Error al obtener incidencia:", error.message);
            throw new Error('Error al obtener incidencia.');
        }
    },

    async obtenerTodasLasIncidencias() {
        try {
            const result = await pool.query(
                `SELECT * FROM helpdesk_system."tIncidencias" ORDER BY fechayhora DESC`
            );
            return result.rows;
        } catch (error) {
            console.error("❌ Error al obtener todas las incidencias:", error.message);
            throw new Error('Error al obtener incidencias.');
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
                    id,
                ],
            };

            const result = await pool.query(query);
            return result.rows[0];
        } catch (error) {
            console.error("❌ Error al actualizar incidencia:", error.message);
            throw new Error('Error al actualizar la incidencia.');
        }
    },

    async eliminarIncidencia(id) {
        try {
            await pool.query(
                `DELETE FROM helpdesk_system."tIncidencias" WHERE "Id_Incidencia" = $1`,
                [id]
            );
        } catch (error) {
            console.error("❌ Error al eliminar incidencia:", error.message);
            throw new Error('Error al eliminar incidencia.');
        }
    },

    async obtenerIncidenciasPorUsuario(idUsuario) {
        try {
            const result = await pool.query(
                `SELECT * FROM helpdesk_system."tIncidencias"
                 WHERE "Id_Dependencia" = $1
                 ORDER BY fechayhora DESC`,
                [idUsuario]
            );
            return result.rows;
        } catch (error) {
            console.error("❌ Error al obtener incidencias por usuario:", error.message);
            throw new Error('Error al obtener incidencias por usuario.');
        }
    },
};

module.exports = Incidencia;
