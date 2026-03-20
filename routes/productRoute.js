import { Router } from "express";
import { listProducts, addProduct, deleteProduct } from "../controllers/productController.js";   

const router = Router();


router.get("/", listProducts);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);

export default router;
    