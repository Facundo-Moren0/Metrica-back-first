import express from "express";
import morgan from "morgan";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import userRoute from "./routes/user-route.js";
import productRoutes from "./routes/product-route.js";
import favoriteRoutes from "./routes/favorite-routes.js";
import cartRoutes from "./routes/cart-routes.js";
import cors from "cors";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

// Configuración personalizada de CORS
const allowedOrigins = ['http://localhost:5173', 'http://localhost:another-port'];
app.use(cors({
    origin: function (origin, callback) {
        // Permite las solicitudes de todos los orígenes si no hay un origen especificado
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Permite el intercambio de cookies y otras credenciales
}));

app.use(cookieParser());
app.use("/api", userRoute);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", favoriteRoutes);

export default app;
