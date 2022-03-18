import { Router } from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { uploader } from "../utils/uploader.js";

const productRouter = Router();

productRouter.post("/", uploader.single("picture"), createProduct);

productRouter.get("/", getProducts);

productRouter.get("/:id", getProduct);

productRouter.put("/:id", uploader.single("picture"), updateProduct);

productRouter.delete("/:id", deleteProduct);

export default productRouter;
