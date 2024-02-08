import jwt from 'jsonwebtoken';
import 'dotenv/config';

// Middleware para validar el token desde la cookie
export const authRequired = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]; // Obtener el token de la cookie

    if (!token) {
        return res.status(401).json({ message: "Sin token, Sin autorizacion" });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token invalido" });
        }

        // Si el token es válido, almacenamos la información del usuario en el objeto 'req' para su uso posterior
        req.user = user;
        next();
    });
};
