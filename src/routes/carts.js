import express from "express";
import CartsFile from "../dao/carts/cartsFile.js";
import CartsMongoDB from "../dao/carts/cartsMongoDB.js";
import CartsFirebase from "../dao/carts/cartsFirebase.js";
import { TECHNOLOGY } from "../config/config.js";

let cartsService;

switch (TECHNOLOGY) {
  case "file":
    cartsService = new CartsFile();
    break;
  case "mongodb":
    cartsService = new CartsMongoDB();
    break;
  case "firebase":
    cartsService = new CartsFirebase();
    break;
  default:
    cartsService = new CartsFile();
    break;
}

const cartsRouter = express.Router();

cartsRouter.post("/", (req, res) => {
  cartsService.createCart().then((result) => {
    if (result.status === "success") res.status(200).json(result);
    else res.status(500).send(result);
  });
});

cartsRouter.delete("/:id", (req, res) => {
  const cartId = req.params.id;
  cartsService.deleteCartById(cartId).then((result) => {
    if (result.status === "success") res.status(200).json(result);
    else res.status(500).send(result);
  });
});

cartsRouter.get("/:id/products", (req, res) => {
  const cartId = req.params.id;
  cartsService.getProductsByCartId(cartId).then((result) => {
    if (result.status === "success") res.status(200).json(result);
    else res.status(500).send(result);
  });
});

cartsRouter.post("/:id/products/:productId", (req, res) => {
  const cartId = req.params.id;
  const productId = req.params.productId;
  cartsService.addProductToCart(cartId, productId).then((result) => {
    if (result.status === "success") res.status(200).json(result);
    else res.status(500).send(result);
  });
});

cartsRouter.delete("/:id/products/:productId", (req, res) => {
  const cartId = req.params.id;
  const productId = req.params.productId;
  cartsService.deleteProductFromCart(cartId, productId).then((result) => {
    if (result.status === "success") res.status(200).json(result);
    else res.status(500).send(result);
  });
});

export default cartsRouter;
