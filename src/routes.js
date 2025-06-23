const express = require('express');
const router = express.Router();
const path = require('path');

const autenticacionController = require('./controllers/autenticacion.controller');
const appviewController = require('./controllers/appview.controller');

router.get('/', (req, res) => res.sendFile(path.join(__dirname, '../docs/index.html')));
router.get('/signup.html', (req, res) => res.sendFile(path.join(__dirname, '../docs/signup.html')));
router.get('/appview.html', (req, res) => res.sendFile(path.join(__dirname, '../docs/appview.html')));
router.get('/administrator.html', (req, res) => res.sendFile(path.join(__dirname, '../docs/administrator.html')));
router.get('/helper.html', (req, res) => res.sendFile(path.join(__dirname, '../docs/helper.html')));
router.get('/form.html', (req, res) => res.sendFile(path.join(__dirname, '../docs/form.html')));

router.post('/register', autenticacionController.register);
router.post('/login', autenticacionController.login);
router.get('/logout', autenticacionController.logout);

router.get('/api/incidencias', appviewController.obtenerIncidencias);
router.post('/api/incidencias', appviewController.crearIncidencia);

console.log('--- Rutas cargadas (temporal) ---');
router.stack.forEach(layer => {
    if (layer.route) {
        console.log(Object.keys(layer.route.methods).join(',').toUpperCase(), layer.route.path);
    }
});
console.log('--- Fin rutas ---');

module.exports = router;
