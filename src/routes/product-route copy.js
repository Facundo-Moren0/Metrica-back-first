import { Router } from "express";
import { setProduct, valorate, getProducts, getOneProduct, updateProduct, deleteProduct } from '../controllers/product-controller.js';
import { authRequired } from "../middlewares/validarToken.js";

const router = Router();

router.get("/", getProducts);

router.get("/:id_prod", getOneProduct);

router.post("/up/create", authRequired, setProduct); (req, res) => res.send('creando producto');

router.post("/valorate/:id_user/:id_prod", authRequired, valorate);

router.put("/up/update/:id", authRequired, updateProduct);

router.delete("/up/delete/:id", authRequired, deleteProduct);

export default router 