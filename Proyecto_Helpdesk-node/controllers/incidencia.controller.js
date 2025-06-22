const Incidencia = require('../models/incidencia.model');

const incidenciaController = {
    async listarIncidencias(req, res) {
        try {
            const incidenciasRaw = await Incidencia.obtenerTodasLasIncidencias();
            const incidencias = incidenciasRaw.map(inc => ({
                id_incidencia: inc.Id_Incidencia,
                Id_incidencia: inc.Id_Incidencia,
                Id_Dependencia: inc.Id_Dependencia,
                fechayhora: inc.fechayhora,
                categoria: inc.categoria || '',
                glosa: inc.glosa || '',
                tecnico_encargado: inc.tecnico_encargado || '',
                estado_incidencia: inc.estado_incidencia || 'Pendiente',
                tipo_dispositivo: inc.tipo_dispositivo || '',
                marca: inc.marca || '',
                modelo: inc.modelo || '',
                codigo_del_bien: inc.codigo_del_bien || ''
            }));

            res.status(200).json(incidencias);
        } catch (error) {
            console.error('Error al listar incidencias:', error);
            res.status(500).json({ mensaje: 'Error al obtener incidencias', detalles: error.message });
        }
    },

    async crearIncidencia(req, res) {
        try {
            const incidencia = req.body;

            if (!incidencia.Id_Dependencia) {
                return res.status(400).json({ mensaje: 'Falta el campo obligatorio Id_Dependencia' });
            }
            if (!incidencia.categoria || !incidencia.tipo_dispositivo || !incidencia.marca ||
                !incidencia.glosa || !incidencia.fechayhora || !incidencia.codigo_del_bien) {
                return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
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
                detalles: error.message
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

            res.status(200).json({
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
