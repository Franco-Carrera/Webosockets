import express from "express";
import {
  createCart,
  addProduct,
  getProducts,
  deleteProduct,
  deleteCart,
} from "../controllers/cartsController.js";

const carts = express.Router();

carts.post("/", createCart);

carts.post("/cartId/products/:productId", addProduct);

carts.get("/:cartId/products/:productId", getProducts);

carts.delete(":/cartId", deleteCart);

carts.delete(":/cartId/products/:productId", deleteProduct);

export default carts;
