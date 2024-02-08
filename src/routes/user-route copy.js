import { Router } from "express";
import { login, register, logout, profile } from '../controllers/user-controllers.js';
import { authRequired } from "../middlewares/validarToken.js";


const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", authRequired, profile);



export default router 