const Usuario = require('../models/usuario.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    try {
        const usuario = await Usuario.obtenerUsuarioPorNombre(req.body.usuario);
        if (!usuario) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas' });
        }

        const isValidPassword = await bcrypt.compare(req.body.contrasena, usuario.password);
        if (!isValidPassword) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas' });
        }

        const token = jwt.sign({ id: usuario.Id_Personal }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.json({ token: `Bearer ${token}` });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ mensaje: 'Error al autenticar usuario' });
    }
};

exports.register = async (req, res) => {
    console.log('Registro de usuario iniciado');
    try {
        const { nombre, apellido, dni, correo, contrasena, Id_Dependencia } = req.body;

        if (!nombre || !apellido || !dni || !correo || !contrasena) {
            return res.status(400).json({ mensaje: 'Por favor, complete todos los campos' });
        }

        const dniRegex = /^\d{8}$/;
        if (!dniRegex.test(dni)) {
            return res.status(400).json({ mensaje: 'El DNI debe tener 8 dígitos' });
        }

        const contrasenaRegex = new RegExp(`^${dni}p[1-9]$`);
        if (!contrasenaRegex.test(contrasena)) {
            return res.status(400).json({ mensaje: 'La contraseña debe ser el DNI seguido de la letra "p" y un dígito del 1 al 9' });
        }

        const existe = await Usuario.existeUsuarioPorCorreoODni(correo, dni);
        if (existe) {
            return res.status(409).json({ mensaje: 'El correo o DNI ya están registrados' });
        }

        const hashedPassword = await bcrypt.hash(contrasena, 10);

        const usuario = {
            usuario: dni,
            password: hashedPassword,
            nombre,
            apellido,
            dni,
            correo,
            Id_Dependencia: Id_Dependencia || '1'  // Puedes ajustar según la lógica de dependencia
        };

        const nuevoUsuario = await Usuario.crearUsuario(usuario);

        console.log('Usuario creado con éxito:', nuevoUsuario);
        res.status(201).json({ mensaje: 'Usuario registrado con éxito' });

    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ mensaje: 'Error al registrar usuario', error: error.message });
    }
};

exports.logout = async (req, res) => {
    try {
        res.json({ mensaje: 'Sesión cerrada con éxito' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al cerrar sesión' });
    }
};

exports.verificarToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ mensaje: 'Token no proporcionado' });
        }
        const tokenWithoutBearer = token.replace('Bearer ', '');
        const decoded = jwt.verify(tokenWithoutBearer, process.env.SECRET_KEY);
        req.usuario = await Usuario.obtenerUsuario(decoded.id);
        next();
    } catch (error) {
        res.status(401).json({ mensaje: 'Token inválido' });
    }
};
