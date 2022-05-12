import { productService } from "../services/services.js";

const saveProduct = async (req, res) => {
  let { title, description, code, stock, price } = req.body;
  if (!title || !description || !code || !stock || !price)
    return res
      .status(400)
      .send({ status: "error", error: "Incomplete values" });
  await productService.save({
    title,
    description,
    code,
    stock,
    price,
    thumbnail: req.file.location,
  });
  res.send({ status: "success", message: "Product added" });
};

// export const fetchProducts = async (req, res) => {
//   try {
//     const products = await productService.getAll();
//     res.send({ status: "success", payload: products });
//   } catch (err) {
//     logger.error(err.message);
//     res.status(400).json({ message: err.message });
//   }
// };

// export const fetchProduct = async (req, res) => {
//   try {
//     const { productId } = req.params;

//     const product = await productService.getBy({ _id: id });
//     if (!product) throw new Error("Non-existent product.");

//     res.send({ status: "success", payload: product });
//   } catch (err) {
//     logger.error(err.message);
//     res.status(400).json({ message: err.message });
//   }
// };

// export const updateProduct = async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const { file } = req;
//     let { content } = req.body;

//     const productFound = await productService.getBy({ _id: productId });
//     if (!productFound) throw new Error("Non-existent product.");

//     await productService.update(productId, content);
//     res.send({ status: "success", message: "Product updated" });
//   } catch (err) {
//     logger.error(err.message);
//     res.status(400).json({ message: err.message });
//   }
// };

// export const deleteProduct = async (req, res) => {
//   try {
//     const { productId } = req.params;
//     await productService.delete(productId);
//     res.sendStatus(204);
//     res.send({ status: "success", message: "Product deleted" });
//   } catch (err) {
//     logger.error(err.message);
//     res.status(400).json({ message: err.message });
//   }
// };

export default {
  saveProduct,
};
