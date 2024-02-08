import { Router } from "express";
import { getFavorites, addToFavorites } from '../controllers/user-controllers.js';
import { authRequired } from "../middlewares/validarToken.js";

const router = Router();

// Ruta para obtener los favoritos de un usuario
router.get("/favorites/:userId", authRequired, getFavorites);

// Ruta para agregar un producto a favoritos
router.post("/favorites/:userId/add/:productId", authRequired, addToFavorites);

export default router;
