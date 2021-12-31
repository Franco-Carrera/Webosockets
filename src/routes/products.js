import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productsController.js";
import { authMiddleware } from "../utils.js";
import upload from "../services/uploader.js";

const products = express.Router();

products.get("/", getProducts);

products.get("/:id", getProduct);

products.post("/", authMiddleware, upload.single("picture"), createProduct);

products.put("/product/:id", authMiddleware, updateProduct);

products.delete("/:id", authMiddleware, deleteProduct);

export default products;
