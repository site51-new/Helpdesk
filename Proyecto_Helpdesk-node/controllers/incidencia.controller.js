const Incidencia = require('../models/incidencia.model');

const incidenciaController = {
    async listarIncidencias(req, res) {
        try {
            const incidenciasRaw = await Incidencia.obtenerTodasLasIncidencias();

            const incidencias = incidenciasRaw.map(inc => ({
                Id_Incidencia: inc.Id_Incidencia || null,
                Id_Dependencia: inc.Id_Dependencia || '',
                fechayhora: inc.fechayhora || '',
                categoria: inc.categoria || '',
                glosa: inc.glosa || '',
                tecnico_encargado: inc.tecnico_encargado || '',
                estado_incidencia: inc.estado_incidencia || 'Pendiente',
                tipo_dispositivo: inc.tipo_dispositivo || '',
                marca: inc.marca || '',
                modelo: inc.modelo || '',
                codigo_del_bien: inc.codigo_del_bien || '',
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
        catch (error) {
            console.error('❌ Error al crear incidencia:', error);
            res.status(500).json({
                mensaje: 'Error al crear incidencia',
                detalles: error.message,
                errorCompleto: error.stack, 
            });
        }

}


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
                incidencia: incidenciaActualizada,
            });
        } catch (error) {
            console.error('Error al actualizar incidencia:', error);
            res.status(500).json({ mensaje: 'Error al actualizar incidencia', detalles: error.message });
        }
    },

    async obtenerIncidenciasPorUsuario(req, res) {
        try {
            const usuarioId = req.usuarioId;
            const incidencias = await Incidencia.obtenerIncidenciasPorUsuario(usuarioId);
            res.json(incidencias);
        } catch (error) {
            console.error('Error al obtener incidencias por usuario:', error);
            res.status(500).json({ mensaje: 'Error al obtener incidencias por usuario', detalles: error.message });
        }
    }
};

module.exports = incidenciaController;
