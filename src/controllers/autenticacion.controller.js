const Usuario = require('../models/usuario.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try {
        const { nombre, apellido, dni, correo, contrasena } = req.body;

        if (!nombre || !apellido || !dni || !correo || !contrasena) {
            return res.status(400).json({ mensaje: 'Por favor, complete todos los campos' });
        }

        if (!/^\d{8}$/.test(dni)) {
            return res.status(400).json({ mensaje: 'El DNI debe tener 8 dígitos' });
        }

        if (!new RegExp(`^${dni}p[1-9]$`).test(contrasena)) {
            return res.status(400).json({
                mensaje: 'La contraseña debe ser el DNI seguido de la letra "p" y un dígito del 1 al 9'
            });
        }

        const existe = await Usuario.existeUsuarioPorCorreoODni(correo, dni);
        if (existe) {
            return res.status(409).json({ mensaje: 'El correo o DNI ya están registrados' });
        }

        const hashedPassword = await bcrypt.hash(contrasena, 10);

        const nuevoUsuario = {
            usuario: dni,
            password: hashedPassword,
            nombre,
            apellido,
            dni,
            correo,
            Id_Dependencia: req.body.Id_Dependencia || '1'
        };

        const resultado = await Usuario.crearUsuario(nuevoUsuario);

        return res.status(201).json({ mensaje: 'Usuario registrado con éxito', id: resultado.Id_Personal });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return res.status(500).json({ mensaje: 'Error al registrar usuario', error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { usuario, contrasena } = req.body;

        if (!usuario || !contrasena) {
            return res.status(400).json({ mensaje: 'Usuario y contraseña son requeridos.' });
        }

        const usuarioBD = await Usuario.obtenerUsuarioPorNombre(usuario);
        if (!usuarioBD) {
            return res.status(401).json({ mensaje: 'Usuario no registrado' });
        }

        const isValidPassword = await bcrypt.compare(contrasena, usuarioBD.password);
        if (!isValidPassword) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: usuarioBD.Id_Personal }, process.env.SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token: `Bearer ${token}` });
    } catch (error) {
        console.error('Error en login:', error);
        return res.status(500).json({ mensaje: 'Error al autenticar usuario' });
    }
};

exports.logout = async (req, res) => {
    return res.json({ mensaje: 'Sesión cerrada con éxito' });
};

exports.verificarToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ mensaje: 'Token no proporcionado' });
        }

        const tokenSinBearer = token.replace('Bearer ', '');
        const decoded = jwt.verify(tokenSinBearer, process.env.SECRET_KEY);

        req.usuario = await Usuario.obtenerUsuario(decoded.id);
        next();
    } catch (error) {
        return res.status(401).json({ mensaje: 'Token inválido' });
    }
};
