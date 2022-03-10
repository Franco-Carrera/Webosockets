import express from "express";
import { createProduct } from "../controllers/productController.js";
import { uploader } from "../utils/uploader.js";
const productRouter = express.Router();

productRouter.post("/createproduct", uploader.single("picture"), createProduct);

export default productRouter;
