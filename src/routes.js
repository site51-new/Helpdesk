const express = require('express');
const router = express.Router();
const incidenciaController = require('./controllers/incidencia.controller'); 

router.get('/', (req, res) => res.send('✅ Backend funcionando simple'));

router.post('/api/incidencias', incidenciaController.crearIncidencia);
router.get('/api/incidencias', incidenciaController.listarIncidencias);
router.get('/api/incidencias/:id', incidenciaController.obtenerIncidencia);
router.put('/api/incidencias/:id', incidenciaController.actualizarIncidencia);
router.delete('/api/incidencias/:id', incidenciaController.eliminarIncidencia);

module.exports = router;
