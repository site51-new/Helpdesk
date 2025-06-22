const Usuario = require('../models/usuario.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 

exports.login = async (req, res) => {
    try {
        const { usuario, contrasena } = req.body;
        const usuarioEncontrado = await Usuario.obtenerUsuarioPorNombre(usuario);

        if (!usuarioEncontrado) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas (usuario)' });
        }

        const passwordValido = await bcrypt.compare(contrasena, usuarioEncontrado.password);
        if (!passwordValido) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas (contraseña)' });
        }

        const token = jwt.sign(
            { usuarioId: usuarioEncontrado.Id_Personal },
            process.env.SECRET_KEY,
            { expiresIn: '8h' }
        );

        res.status(200).json({ token }); 
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ mensaje: 'Error al autenticar usuario' });
    }
};

exports.register = async (req, res) => {
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

        const nuevoUsuario = {
            usuario: dni,
            password: hashedPassword,
            nombre,
            apellido,
            dni,
            correo,
            Id_Dependencia: Id_Dependencia || '1'
        };

        await Usuario.crearUsuario(nuevoUsuario);
        res.status(201).json({ mensaje: 'Usuario registrado con éxito' });

    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ mensaje: 'Error al registrar usuario', error: error.message });
    }
};

exports.logout = (req, res) => {
    res.status(200).json({ mensaje: 'Sesión cerrada con éxito' });
};

exports.verificarToken = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ mensaje: 'Token no proporcionado o inválido' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        req.usuario = await Usuario.obtenerUsuario(decoded.usuarioId);
        next();
    } catch (error) {
        console.error('Error en verificación de token:', error);
        res.status(401).json({ mensaje: 'Token inválido o expirado' });
    }
};
