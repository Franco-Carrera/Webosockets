import loggerHandler from "../utils/loggerHandler.js";
import { cartService } from "../services/services.js";
const logger = loggerHandler();

export const fetchCart = (req, res) => {
  const { cartId } = req.params;
  cartService
    .getId(cartId)
    .then((cart) => {
      res.json({ cart });
    })
    .catch((err) => {
      logger.error(err.message);
      res.status(500).json({ message: err.message });
    });
};

export const fetchCarts = (req, res) => {
  cartService
    .getAll()
    .then((carts) => {
      res.json({ carts });
    })
    .catch((err) => {
      logger.error(err.message);
      res.status(500).json({ message: err.message });
    });
};

export const createCart = (req, res) => {
  const { userId } = req.body;
  cartService
    .save(userId)
    .then((cart) => {
      res.json({ cart });
    })
    .catch((err) => {
      logger.error(err.message);
      res.status(500).json({ message: err.message });
    });
};

/////////////////////////////////////
export const addProduct = async (req, res) => {
  const cartId = req.params.cartId;
  const productId = req.body.id; //or _id PROBAL or productId or Params

  cartService
    .exists(cartId, productId)
    .then((result) => res.send(result))
    .catch((err) => {
      logger.error(err.message);
      res.status(500).json({ message: err.message });
    });

  console.log(cartId);
  console.log(productId); //sale
};

export const fetchProducts = async (req, res) => {
  const cartId = req.params.cartId;
  cartService
    .getAll(cartId)
    .then((products) => {
      res.json({ products });
    })
    .catch((err) => {
      logger.error(err.message);
      res.status(500).json({ message: err.message });
    });
};

export const deleteProduct = async (req, res) => {
  const cartId = req.params.cartId;
  const productId = req.params.productId;
  cartService
    .deleteProduct(cartId, productId)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      logger.error(err.message);
      res.status(500).json({ message: err.message });
    });
};
///////////////////////////////////
export const deleteCart = async (req, res) => {
  const cartId = req.params.cartId;
  cartService
    .delete(cartId)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      logger.error(err.message);
      res.status(500).json({ message: err.message });
    });
};

//////////////////////////////
