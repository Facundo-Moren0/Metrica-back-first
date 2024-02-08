import jwt from "jsonwebtoken";
import 'dotenv/config';

export const createToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.TOKEN_SECRET_KEY,
            { expiresIn: "1d" },
            (error, token) => {
                if (error) reject(error);
                resolve(token);
            }
        );
    });
};

// Función para establecer la cookie del token en la respuesta
export const setTokenCookie = (res, token) => {
    res.cookie('token', token, {
        httpOnly: true, // La cookie solo es accesible a través de HTTP
        secure: false, // La cookie solo se envía a través de conexiones HTTPS
        maxAge: 24 * 60 * 60 * 1000, // Duración de la cookie en milisegundos (1 día)
        sameSite: 'none' // La cookie solo se envía en solicitudes del mismo sitio
    });
};
