const Incidencia = require('../models/incidencia.model');

const incidenciaController = {
    async listarIncidencias(req, res) {
        try {
            const incidenciasRaw = await Incidencia.obtenerTodasLasIncidencias();

            const incidencias = incidenciasRaw.map(inc => ({
                id_incidencia: inc.Id_Incidencia || inc.id_incidencia || inc.id || inc.Id || null,
                Id_incidencia: inc.Id_Incidencia || inc.id_incidencia || inc.id || inc.Id || null,
                Id_Dependencia: inc.Id_Dependencia || inc.Id_dependencia || inc.id_dependencia || inc.sede || '',
                fechayhora: inc.fechayhora || inc.fecha || inc.fecha_hora || inc.created_at || '',
                categoria: inc.categoria || '',
                glosa: inc.glosa || '',
                tecnico_encargado: inc.tecnico_encargado || '',
                estado_incidencia: inc.estado_incidencia || inc.estado || 'Pendiente',
                tipo_dispositivo: inc.tipo_dispositivo || '',
                marca: inc.marca || '',
                modelo: inc.modelo || '',
                codigo_del_bien: inc.codigo_del_bien || ''
            }));

            res.json(incidencias);
        } catch (error) {
            console.error('Error al listar incidencias:', error);
            res.status(500).json({ mensaje: 'Error al obtener incidencias', detalles: error.message });
        }
    },

    async crearIncidencia(req, res) {
        try {
            const incidencia = req.body;

            if (!incidencia.Id_Dependencia && !incidencia.Id_dependencia && !incidencia.id_dependencia) {
                return res.status(400).json({ mensaje: 'Falta el campo obligatorio Id_Dependencia' });
            }
            if (!incidencia.categoria) {
                return res.status(400).json({ mensaje: 'Falta el campo obligatorio categoría' });
            }
            if (!incidencia.tipo_dispositivo) {
                return res.status(400).json({ mensaje: 'Falta el campo obligatorio tipo_dispositivo' });
            }
            if (!incidencia.marca) {
                return res.status(400).json({ mensaje: 'Falta el campo obligatorio marca' });
            }
            if (!incidencia.glosa) {
                return res.status(400).json({ mensaje: 'Falta el campo obligatorio glosa' });
            }
            if (!incidencia.fechayhora) {
                return res.status(400).json({ mensaje: 'Falta el campo obligatorio fechayhora' });
            }
            if (!incidencia.codigo_del_bien) {
                return res.status(400).json({ mensaje: 'Falta el campo obligatorio codigo_del_bien' });
            }

            const nuevaIncidencia = await Incidencia.crearIncidencia(incidencia);
            res.status(201).json({
                mensaje: 'Incidencia creada correctamente',
                incidencia: nuevaIncidencia
            });
        } catch (error) {
            console.error('Error al crear incidencia:', error);
            res.status(500).json({
                mensaje: 'Error al crear incidencia',
                detalles: error.message,
                stack: error.stack
            });
        }
    },

    async actualizarIncidencia(req, res) {
        try {
            const id = req.params.id;
            const incidencia = req.body;
            const incidenciaActualizada = await Incidencia.actualizarIncidencia(id, incidencia);
            if (!incidenciaActualizada) {
                return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
            }
            res.json({
                mensaje: 'Incidencia actualizada correctamente',
                incidencia: incidenciaActualizada
            });
        } catch (error) {
            console.error('Error al actualizar incidencia:', error);
            res.status(500).json({ mensaje: 'Error al actualizar incidencia', detalles: error.message });
        }
    }
};

module.exports = incidenciaController;
