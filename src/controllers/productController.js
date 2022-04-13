import { productService } from "../services/services.js";
import { PORT } from "../config/config.js";
import loggerHandler from "../middlewares/loggerHandler.js";
const logger = loggerHandler();
import ProductDTO from "../dto/ProductDTO.js";
import { Server } from "socket.io";
const io = new Server();

export const createProduct = async (req, res) => {
  try {
    const { file } = req;
    let { name, category, description, code, price, stock, picture } = req.body;
    picture = file
      ? `${req.protocol}://${req.hostname}:${PORT}/uploads/${file.filename}`
      : picture;

    const productFound = await productService.getOne({ name });
    if (productFound) throw new Error("Product already exists.");

    const document = {
      name,
      category,
      description,
      code,
      price: parseInt(price),
      stock: parseInt(stock),
      picture,
    };

    const product = await productService.add(document);
    const productDTO = new ProductDTO(product);
    productService.get().then((products) => {
      //probar solo poner esto + lógica de que conviene
      io.emit("deliverProducts", products);
      //no le importa _id, sólo trae products
    });
    //ver como trae para el front.
    res.json({ product: productDTO });
  } catch (err) {
    logger.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

export const fetchProducts = async (req, res) => {
  try {
    const products = await productService.get();
    const productDTOs = products.map((product) => new ProductDTO(product));
    res.json({ products: productDTOs });
  } catch (err) {
    logger.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

export const fetchProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await productService.getOne({ _id: productId });
    if (!product) throw new Error("Non-existent product.");

    const productDTO = new ProductDTO(product);
    res.json({ product: productDTO });
  } catch (err) {
    logger.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { file } = req;
    let { name, category, description, code, price, stock, picture } = req.body;
    picture = file
      ? `${req.protocol}://${req.hostname}:${PORT}/uploads/${file.filename}`
      : picture;

    const productNotFound = await productService.getOne({ _id: productId });
    if (!productNotFound) throw new Error("Non-existent product.");

    const productFound = await productService.getOne({
      _id: { $ne: productId },
      name: { $eq: name },
    });
    if (productFound) throw new Error("Product already exists.");

    const document = {
      name,
      category,
      description,
      code,
      price: parseInt(price),
      stock: parseInt(stock),
      picture,
    };

    const product = await productService.update(productId, document);
    const productDTO = new ProductDTO(product);
    res.json({ product: productDTO });
  } catch (err) {
    logger.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    await productService.delete(productId);
    res.sendStatus(204);
  } catch (err) {
    logger.error(err.message);
    res.status(400).json({ message: err.message });
  }
};
