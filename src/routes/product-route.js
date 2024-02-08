import { Router } from "express";
import { setProduct, valorate, getProducts, getOneProduct, updateProduct, deleteProduct, createPreference } from '../controllers/product-controller.js';
import { authRequired } from "../middlewares/validarToken.js";
import { isAdmin } from "../middlewares/isadmin.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { productZodSchema, valoracionesZodSchema } from "../schemas/auth-schema.js";


const router = Router();

router.get("/", getProducts);

router.get("/:id_prod", getOneProduct);

router.post("/buy", createPreference);

router.post("/up/create", authRequired, setProduct);

router.post("/valorate/:id_user/:id_prod", validateSchema(valoracionesZodSchema), valorate);

router.put("/up/update/:id", authRequired, isAdmin, validateSchema(productZodSchema), updateProduct);

router.delete("/up/delete/:id", authRequired, isAdmin, deleteProduct);

export default router;

