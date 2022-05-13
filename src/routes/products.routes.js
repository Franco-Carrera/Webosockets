import express from "express";
const router = express.Router();
import productsController from "../controllers/products.controller.js";
import upload from "../services/uploadService.js";

router.get("/", productsController.getAllProducts);

router.post("/", upload.single("thumbnail"), productsController.saveProduct);

router.put("/:pid", productsController.updateProduct);
router.delete("/:pid", productsController.deleteProduct);
router.get("/:pid", productsController.getProductById);

export default router;
