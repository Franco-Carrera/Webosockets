import express from "express";
import { authMiddleware } from "../utils.js";
import upload from "../services/uploader.js";
import ProductsFile from "../dao/products/productsFile.js";
import ProductsMongoDB from "../dao/products/productsMongoDB.js";
import { TECHNOLOGY } from "../config/config.js";

let productsService;

switch (TECHNOLOGY) {
  case "file":
    productsService = new ProductsFile();
    break;
  case "mongodb":
    productsService = new ProductsMongoDB();
    break;
  default:
    productsService = new ProductsFile();
    break;
}

const productsRouter = express.Router();

productsRouter.get("/", (req, res) => {
  productsService.getProducts().then((result) => {
    if (result.status === "success") return res.status(200).json(result);
    else return res.status(500).json(result);
  });
});

productsRouter.get("/:id", (req, res) => {
  const productId = req.params.id;
  productsService.getProductById(productId).then((result) => {
    if (result.status === "success") return res.status(200).json(result);
    else return res.status(500).json(result);
  });
});

productsRouter.post(
  "/",
  authMiddleware,
  upload.single("picture"),
  (req, res) => {
    const file = req.file;
    const product = req.body;
    product.picture = `${req.protocol}://${req.hostname}:${process.env.PORT}/uploads/${file.filename}`;
    productsService.createProduct(product).then((result) => {
      if (result.status === "success") return res.status(200).json(result);
      else return res.status(500).json(result);
    });
  }
);

productsRouter.put("/:id", authMiddleware, (req, res) => {
  const productId = req.params.id;
  const product = req.body;
  productsService.updateProductById(productId, product).then((result) => {
    if (result.status === "success") return res.status(200).json(result);
    else return res.status(500).json(result);
  });
});

productsRouter.delete("/:id", authMiddleware, (req, res) => {
  const productId = req.params.id;
  productsService.deleteProductById(productId).then((result) => {
    if (result.status === "success") return res.status(200).json(result);
    else return res.status(500).json(result);
  });
});

export default productsRouter;
