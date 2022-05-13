import { productService } from "../services/services.js";
import { PORT } from "../config/config.js";

const getAllProducts = async (req, res) => {
  let products = await productService.getAll();
  res.send({ status: "success", payload: products });
};
const getProductById = async (req, res) => {
  let id = req.params.pid;
  try {
    let product = await productService.getBy({ _id: id });
    if (!product) res.status(404).send({ status: "error", error: "Not found" });
    res.send({ status: "success", payload: product });
  } catch (error) {
    console.log(error);
  }
};

const saveProduct = async (req, res) => {
  let file = req.file;
  let product = req.body;
  product.thumbnail = `${req.protocol}://${req.hostname}:${PORT}/images/${file.filename}`;
  productService.save(product).then((result) => {
    res.send({ status: "success", payload: result, message: "Product added" });
  });
};

const updateProduct = async (req, res) => {
  let body = req.body;
  let id = req.params.pid;
  productService.update(id, body).then((result) => {
    res.send({
      status: "success",
      payload: result,
      message: "Product updated",
    });
  });
};

const deleteProduct = async (req, res) => {
  let { pid } = req.params;
  let product = await productService.getBy({ _id: pid });
  if (!product)
    return res.status(404).send({ status: "error", error: "Not found" });
  await productService.delete(pid);
  res.send({ status: "success", message: "Product deleted" });
  res.sendStatus(204);
};

export default {
  getAllProducts,
  getProductById,
  saveProduct,
  updateProduct,
  deleteProduct,
};
