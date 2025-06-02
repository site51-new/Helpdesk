const express = require('express');
const router = express.Router();
const path = require('path');
const autenticacionController = require('./controllers/autenticacion.controller');
const incidenciaController = require('./controllers/incidencia.controller');
const appviewController = require('./controllers/appview.controller');
const administradorController = require('./controllers/administrador.controller');

//const allowedDomains = ['munipiura.gob.pe'];

/*Código de restricción de dominio
router.use((req, res, next) => {
    const domain = req.headers.host;
    if (allowedDomains.includes(domain)) {
        next();
    } else {
        res.status(403).send('Acceso denegado');
    }
});
*/

// Ruta para la página inicial
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

// Rutas de autenticación
router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/signup.html'));
});
router.post('/login', autenticacionController.login);
router.post('/register', autenticacionController.register);
router.get('/logout', autenticacionController.logout);

// Rutas de appview
router.get('/appview', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/appview.html'));
});

router.get('/helper', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/helper.html'));
});

// Rutas de administrador
router.get('/administrador', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/administrador.html'));
});

// Rutas adicionales
router.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/form.html'));
});

module.exports = router;
