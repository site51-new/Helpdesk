const Incidencia = require('../models/incidencia.model');
const Usuario = require('../models/usuario.model');

const validarId = (id) => /^[0-9]+$/.test(id);

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

exports.asignarIncidencia = async (req, res) => {
    const { id } = req.params;
    if (!validarId(id)) {
        return res.status(400).json({ mensaje: 'ID inválido' });
    }
    try {
        const incidencia = await Incidencia.obtenerIncidencia(id);
        if (!incidencia) {
            return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
        }
        incidencia.tecnico_encargado = req.body.tecnico_encargado;
        incidencia.estado_incidencia = 'Asignada';
        await Incidencia.actualizarIncidencia(id, incidencia);
        res.json({ mensaje: 'Incidencia asignada con éxito' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al asignar incidencia' });
    }
};

exports.actualizarEstadoIncidencia = async (req, res) => {
    const { id } = req.params;
    if (!validarId(id)) {
        return res.status(400).json({ mensaje: 'ID inválido' });
    }
    try {
        const incidencia = await Incidencia.obtenerIncidencia(id);
        if (!incidencia) {
            return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
        }
        incidencia.estado_incidencia = req.body.estado_incidencia;
        await Incidencia.actualizarIncidencia(id, incidencia);
        res.json({ mensaje: 'Estado de incidencia actualizado con éxito' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar estado de incidencia' });
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
