const Incidencia = require('../models/incidencia.model');
const Usuario = require('../models/usuario.model');

exports.verificarRolAdministrador = async (req, res, next) => {
    try {
        const usuario = req.usuario;
        if (usuario.rol !== 'administrador') {
            return res.status(403).json({ mensaje: 'Acceso denegado' });
        }
        next();
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al verificar rol' });
    }
};

exports.obtenerIncidenciasPendientes = async (req, res) => {
    try {
        const incidencias = await Incidencia.obtenerTodasLasIncidencias();
        const incidenciasPendientes = incidencias.filter((incidencia) => incidencia.estado_incidencia === 'Pendiente');
        res.json(incidenciasPendientes);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener incidencias pendientes' });
    }
};

exports.actualizarIncidencia = async (req, res) => {
    try {
        const incidencia = await Incidencia.obtenerIncidencia(req.params.id);
        if (!incidencia) {
            return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
        }

        const tecnico = req.body.tecnico_encargado;

        incidencia.tecnico_encargado = tecnico;

        incidencia.estado_incidencia = tecnico === "" ? "ATENDIDO" : "EN PROCESO";

        await Incidencia.actualizarIncidencia(req.params.id, incidencia);
        res.json({ mensaje: 'Incidencia actualizada con éxito' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar incidencia' });
    }
};

exports.obtenerReporteIncidencias = async (req, res) => {
    try {
        const incidencias = await Incidencia.obtenerTodasLasIncidencias();
        res.json(incidencias);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener reporte de incidencias' });
    }
};

exports.administrador = (req, res) => {
    res.sendFile('administrator.html', { root: './views' });
};
