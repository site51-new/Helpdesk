const Usuario = require('../models/usuario.model');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const usuario = await Usuario.obtenerUsuarioPorNombre(req.body.usuario);
        if (!usuario) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas' });
        }

        const password = req.body.contraseña;
        if (password !== usuario.password) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas' });
        }

        const token = jwt.sign({ id: usuario.Id_Usuario }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al autenticar usuario' });
    }
};

exports.register = async (req, res) => {
    console.log('Registro de usuario iniciado');
    try {
        const { nombre, apellido, dni, correo, contraseña } = req.body;
        if (!nombre || !apellido || !dni || !correo || !contraseña) {
            return res.status(400).json({ mensaje: 'Por favor, complete todos los campos' });
        }

        const dniRegex = /^\d{8}$/;
        if (!dniRegex.test(dni)) {
            return res.status(400).json({ mensaje: 'El DNI debe tener 8 dígitos' });
        }

        const contraseñaRegex = new RegExp(`^${dni}p[1-9]$`);
        if (!contraseñaRegex.test(contraseña)) {
            return res.status(400).json({ mensaje: 'La contraseña debe ser el DNI seguido de la letra "p" y un dígito del 1 al 9' });
        }

        const usuario = await Usuario.crearUsuario(req.body);
        console.log('Usuario creado con éxito');
        res.status(201).json({ mensaje: 'Cuenta creada con éxito', usuario });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ mensaje: 'Error al registrar usuario' });
    }
};

exports.logout = async (req, res) => {
    // Código de la función logout
};

exports.verificarToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.usuario = await Usuario.obtenerUsuario(decoded.id);
        next();
    } catch (error) {
        res.status(401).json({ mensaje: 'Token inválido o expirado' });
    }
};
