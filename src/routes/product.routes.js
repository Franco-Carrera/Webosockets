import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  // getProductPostman,
} from "../controllers/productController.js";
import { authMiddleware } from "../utils.js";
import { uploader } from "../utils/uploader.js";

const productRouter = Router();

productRouter.post(
  "/",
  authMiddleware,
  uploader.single("picture"),
  createProduct
);

productRouter.get("/", getProducts);

productRouter.get("/:pid", getProduct);
//productRouter.get("/:pid", getProductPostman);

productRouter.put("/:pid", uploader.single("picture"), updateProduct);

productRouter.delete("/:pid", deleteProduct);

export default productRouter;
