import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const isAdmin = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Sin token, Sin autorización" });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token inválido" });
        }

        //  el rol del usuario está en el payload del token
        const { role } = user;

        if (role !== 'admin') {
            return res.status(403).json({ message: "No tienes permisos de administrador" });
        }

        // Si el usuario es un administrador, pasa al siguiente middleware
        next();
    });
};
