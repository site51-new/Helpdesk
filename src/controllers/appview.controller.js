const Incidencia = require('../models/incidencia.model');

exports.obtenerIncidencias = async (req, res) => {
    try {
        const incidencias = await Incidencia.obtenerTodasLasIncidencias();
        res.json(incidencias);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener incidencias' });
    }
};

exports.crearIncidencia = async (req, res) => {
    try {
        const incidencia = await Incidencia.crearIncidencia(req.body);
        res.status(201).json(incidencia);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear incidencia' });
    }
};

exports.appview = (req, res) => {
    res.render('appview');
};