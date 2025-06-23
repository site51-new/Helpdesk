const express = require('express');
const router = express.Router();

let incidencias = [];
let idCounter = 1;

router.get('/incidencias', (req, res) => {
    res.json(incidencias);
});

router.post('/incidencias', (req, res) => {
    const nueva = { ...req.body, id_incidencia: idCounter++ };
    incidencias.push(nueva);
    res.status(201).json(nueva);
});

router.put('/incidencias/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = incidencias.findIndex(i => i.id_incidencia === id);
    if (index === -1) return res.status(404).json({ mensaje: 'Incidencia no encontrada' });

    incidencias[index] = { ...incidencias[index], ...req.body };
    res.json(incidencias[index]);
});

module.exports = router;
