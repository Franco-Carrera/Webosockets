import express from "express";
import productController from "../controllers/productController.js";
import { uploader } from "../utils/uploader.js";

const productRouter = express.Router();

productRouter.post(
  "/",
  uploader.single("thumbnail"),
  productController.insertProduct
);

export default productRouter;
