// cart-routes.js
import { Router } from "express";
import { getCart, addToCart, removeFromCart, clearCart } from '../controllers/cart-controller.js';
import { authRequired } from "../middlewares/validarToken.js";

const router = Router();

// Ruta para obtener el carrito de un usuario
router.get("/cart/:userId", authRequired, getCart);

// Ruta para agregar un producto al carrito
router.post("/cart/:userId/add/:productId/:quantity", addToCart);

// Ruta para eliminar un producto del carrito
router.delete("/cart/:userId/remove/:productId", authRequired, removeFromCart);

// Ruta para limpiar el carrito
router.delete("/cart/:userId/clear", authRequired, clearCart);

export default router;
