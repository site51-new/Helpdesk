const express = require('express');
const router = express.Router();
const path = require('path');

const autenticacionController = require('./controllers/autenticacion.controller');
const incidenciaController = require('./controllers/incidencia.controller');
const administradorController = require('./controllers/administrador.controller');
const appviewController = require('./controllers/appview.controller');
const { verificarToken } = require('./middlewares/auth');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});
router.get('/signup.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/signup.html'));
});
router.get('/appview.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/appview.html'));
});
router.get('/administrator.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/administrator.html'));
});
router.get('/helper.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/helper.html'));
});
router.get('/form.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/form.html'));
});

router.post('/login', autenticacionController.login);
router.post('/register', autenticacionController.register);
router.get('/logout', autenticacionController.logout);

router.get('/api/incidencias', verificarToken, incidenciaController.listarIncidencias);
router.post('/api/incidencias', verificarToken, appviewController.crearIncidencia);

router.put('/api/incidencias/:id', verificarToken, administradorController.actualizarIncidencia);

router.get('/api/mis-incidencias', verificarToken, appviewController.obtenerIncidenciasPorUsuario);

module.exports = router;
