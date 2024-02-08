import { Router } from "express";
import { login, register, logout, profile, updateUser, getUsers, getUserById } from '../controllers/user-controllers.js';
import { authRequired } from "../middlewares/validarToken.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", authRequired, profile);
router.get("/users", authRequired, getUsers);
router.get("/users/:id", authRequired, getUserById); // Nueva ruta para obtener un usuario por su ID específico
router.put("/update/:id", authRequired, updateUser);

export default router;
