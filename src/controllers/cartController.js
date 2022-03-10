import loggerHandler from "../utils/loggerHandler.js";
import CartService from "../services/cartService.js";
const service = new CartService();
const logger = loggerHandler();

export const createCart = (req, res) => {
  service
    .createCart()
    .then((cart) => {
      res.json({ cart });
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).json({ message: err.message });
    });
};

export const addProduct = async (req, res) => {
  const cartId = req.params.cartId;
  const productId = req.params.productId;
  service
    .addProduct(cartId, productId)
    .then(() => {
      res.json({ message: "Product has been added successfully." });
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).json({ message: err.message });
    });
};

export const getProducts = async (req, res) => {
  const cartId = req.params.cartId;
  service
    .getProducts(cartId)
    .then((products) => {
      res.json({ products });
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).json({ message: err.message });
    });
};

export const deleteProduct = async (req, res) => {
  const cartId = req.params.cartId;
  const productId = req.params.productId;
  service
    .deleteProduct(cartId, productId)
    .then(() => {
      res.status(204).json({
        message: "Product has been removed from the cart successfully.",
      });
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).json({ message: err.message });
    });
};

export const deleteCart = async (req, res) => {
  const cartId = req.params.cartId;
  service
    .deleteCart(cartId)
    .then(() => {
      res.status(204).json({ message: "Cart has been deleted successfully." });
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).json({ message: err.message });
    });
};
