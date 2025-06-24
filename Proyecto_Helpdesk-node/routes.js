const express = require('express');
const router = express.Router();

const { verificarToken } = require('../middlewares/auth');
const Incidencia = require('./models/incidencia.model');

router.get('/incidencias', verificarToken, async (req, res) => {
    try {
        const incidencias = await Incidencia.obtenerTodasLasIncidencias();
        res.json(incidencias);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener incidencias', error: error.message });
    }
});

router.post('/incidencias', verificarToken, async (req, res) => {
    try {
        const nuevaIncidencia = await Incidencia.crearIncidencia(req.body);
        res.status(201).json(nuevaIncidencia);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear incidencia', error: error.message });
    }
});

router.put('/incidencias/:id', verificarToken, async (req, res) => {
    try {
        const id = req.params.id;
        const incidenciaActualizada = await Incidencia.actualizarIncidencia(id, req.body);
        if (!incidenciaActualizada) {
            return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
        }
        res.json(incidenciaActualizada);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar incidencia', error: error.message });
    }
});

router.delete('/incidencias/:id', verificarToken, async (req, res) => {
    try {
        const id = req.params.id;
        await Incidencia.eliminarIncidencia(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar incidencia', error: error.message });
    }
});

module.exports = router;
