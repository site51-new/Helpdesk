const jwt = require('jsonwebtoken');

exports.verificarToken = (req, res, next) => {

    if (req.method === 'OPTIONS') {
        return next();
    }

    const header = req.headers['authorization'];
    if (!header) return res.status(401).json({ mensaje: 'No token proporcionado' });

    const [scheme, token] = header.split(' ');
    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({ mensaje: 'Formato de token inválido' });
    }

    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        req.usuarioId = payload.id || payload.usuarioId;
        next();
    } catch (error) {
        return res.status(401).json({ mensaje: 'Token inválido o expirado' });
    }
};
