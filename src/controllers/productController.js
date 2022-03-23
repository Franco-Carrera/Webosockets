import loggerHandler from "../utils/loggerHandler.js";
import { PORT } from "../config/config.js";
import { productService } from "../services/services.js";
import { io } from "../app.js";

const logger = loggerHandler(); //

export const createProduct = async (req, res) => {
  const { file } = req;
  const product = req.body;

  if (file) {
    product.picture = `${req.protocol}://${req.hostname}:${PORT}/uploads/${file.filename}`;
  }

  productService
    .save(product)
    .then((result) => {
      res.send(result);
      productService.getAll().then((result) => {
        io.emit("deliverProducts", result);
      });
    })
    .catch((err) => {
      logger.error(err.message);
      res.status(500).json({ message: err.message });
    });
};

export const getProducts = async (req, res) => {
  productService.getAll().then((result) => {
    res.send(result);
  });
};

export const getProduct = async (req, res) => {
  let productId = req.params.pid;
  productService.getBy({ id: productId }).then((result) => {
    res.send(result);
  });
};

/*
export const getProductPostman = async (req, res) => {
  let productId = req.params.pid;
  productService.getId({ _id: productId }).then((result) => {
    res.send(result);
  }); //Modifica front por (userFound)///
};*/ /////

export const updateProduct = async (req, res) => {
  const { file } = req;
  const productId = req.params.pid;
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
  const productId = req.params.pid;
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
