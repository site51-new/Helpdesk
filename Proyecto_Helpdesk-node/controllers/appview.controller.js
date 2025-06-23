const Incidencia = require('../models/incidencia.model');

exports.obtenerIncidenciasPorUsuario = async (req, res) => {
    const usuarioId = req.session.usuarioId;
    if (!usuarioId) {
        return res.status(401).json({ mensaje: 'No autorizado' });
    }

    try {
        const incidencias = await Incidencia.obtenerIncidenciasPorUsuario(usuarioId);
        res.json(incidencias);
    } catch (error) {
        console.error('Error al obtener incidencias:', error);
        res.status(500).json({ mensaje: 'Error al obtener incidencias' });
    }
};

exports.crearIncidencia = async (req, res) => {
    const usuarioId = req.session.usuarioId;
    if (!usuarioId) {
        return res.status(401).json({ mensaje: 'No autorizado' });
    }

    try {

        req.body.Id_Dependencia = usuarioId;

        const incidencia = await Incidencia.crearIncidencia(req.body);
        res.status(201).json(incidencia);
    } catch (error) {
        console.error('Error al crear incidencia:', error);
        res.status(500).json({ mensaje: 'Error al crear incidencia' });
    }
};

exports.appview = (req, res) => {
    res.render('appview');
};
