import express from "express";
//import { createProduct } from "../controllers/productController.js";
import { uploader } from "../utils/uploader.js";
import ProductsMongoDB from "../dao/products/productsMongoDB.js";

const productService = new ProductsMongoDB();
const productRouter = express.Router();

productRouter.post("/create", uploader.single("picture"), (req, res) => {
  const file = req.file;
  const product = req.body;
  console.log(product);

  product.picture = `${req.protocol}://${req.hostname}:${process.env.PORT}/uploads/${file.filename}`;
  productService.createProduct(product).then((result) => {
    if (result.status === "success") return res.status(200).json(result);
    else return res.status(500).json(result);
  });
});

export default productRouter;
