const Incidencia = require('../models/incidencia.model');

exports.crearIncidencia = async (req, res) => {
    try {
        const incidencia = await Incidencia.crearIncidencia(req.body);
        res.status(201).json(incidencia);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear incidencia' });
    }
};

exports.listarIncidencias = async (req, res) => {
    try {
        const incidencias = await Incidencia.obtenerTodasLasIncidencias();
        res.json(incidencias);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener incidencias' });
    }
};

exports.obtenerIncidencia = async (req, res) => {
    try {
        const incidencia = await Incidencia.obtenerIncidencia(req.params.id);
        if (!incidencia) {
            return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
        }
        res.json(incidencia);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener incidencia' });
    }
};

exports.actualizarIncidencia = async (req, res) => {
    try {
        const incidencia = await Incidencia.obtenerIncidencia(req.params.id);
        if (!incidencia) {
            return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
        }
        const incidenciaActualizada = await Incidencia.actualizarIncidencia(req.params.id, req.body);
        res.json(incidenciaActualizada);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar incidencia' });
    }
};

exports.eliminarIncidencia = async (req, res) => {
    try {
        await Incidencia.eliminarIncidencia(req.params.id);
        res.json({ mensaje: 'Incidencia eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar incidencia' });
    }
};