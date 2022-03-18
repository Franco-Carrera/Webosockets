import loggerHandler from "../utils/loggerHandler.js";
import { PORT } from "../config/config.js";
import { productService } from "../services/services.js";
const logger = loggerHandler(); //

export const createProduct = async (req, res) => {
  const { file } = req;
  const { name, category, description, code, price, stock } = req.body;
  let picture = "";
  if (file) {
    picture = `${req.protocol}://${req.hostname}:${PORT}/uploads/${file.filename}`;
  }
  const product = {
    name,
    category,
    description,
    code,
    picture,
    price,
    stock,
  };
  productService
    .save(product)
    .then((product) => {
      res.json({ product });
    })
    .catch((err) => {
      logger.error(err.message);
      res.status(500).json({ message: err.message });
    });
};

export const getProducts = async (req, res) => {
  productService
    .getAll()
    .then((products) => {
      res.json({ products });
    })
    .catch((err) => {
      logger.error(err.message);
      res.status(500).json({ message: err.message });
    });
};

export const getProduct = async (req, res) => {
  const productId = req.params.id;
  productService
    .getId(productId)
    .then((product) => {
      res.json({ product });
    })
    .catch((err) => {
      logger.error(err.message);
      res.status(500).json({ message: err.message });
    });
};

export const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const file = req.file;
  const product = req.body;
  if (file) {
    product.picture = `${req.protocol}://${req.hostname}:${process.env.PORT}/uploads/${file.filename}`;
  }
  productService
    .update(productId, product)
    .then((product) => {
      res.json({ product });
    })
    .catch((err) => {
      logger.error(err.message);
      res.status(500).json({ message: err.message });
    });
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  productService
    .delete(productId)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      logger.error(err.message);
      res.status(500).json({ message: err.message });
    });
};
