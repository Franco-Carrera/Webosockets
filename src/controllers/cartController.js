import {
  cartService,
  userService,
  productService,
} from "../services/services.js";
import CartDTO from "../dto/CartDTO.js";
import loggerHandler from "../middlewares/loggerHandler.js";
const logger = loggerHandler();

export const createCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userFound = await userService.getOne({ _id: userId });
    if (!userFound) throw new Error("Non-existent user.");

    const cartFound = await cartService.getOne({ user: userId });
    if (cartFound) throw new Error("Cart already exists for this user.");

    const cart = await cartService.createCart(userId);
    const cartDTO = new CartDTO(cart);
    res.json({ cart: cartDTO });
  } catch (err) {
    logger.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

export const fetchCarts = async (req, res) => {
  try {
    const carts = await cartService.get();
    const cartDTOs = carts.map((cart) => new CartDTO(cart));
    res.json({ carts: cartDTOs });
  } catch (err) {
    logger.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

export const fetchCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const cart = await cartService.getOne({ _id: cartId });
    if (!cart) throw new Error("Non-existent cart.");

    const cartDTO = new CartDTO(cart);
    res.json({ cart: cartDTO });
  } catch (err) {
    logger.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { cartId, productId } = req.params;

    const cart = await cartService.getOne({ _id: cartId });
    if (!cart) throw new Error("Non-existent cart.");

    const product = await productService.getOne({ _id: productId });
    if (!product) throw new Error("Non-existent product.");

    await cartService.update(cartId, { $push: { products: product } });
    res.json({ message: "Product has been added successfully." });
  } catch (err) {
    logger.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

export const fetchProducts = async (req, res) => {
  try {
    const { cartId } = req.params;

    const cart = await cartService.getOne({ _id: cartId });
    if (!cart) throw new Error("Non-existent cart.");

    const products = cart.products;
    res.json({ products });
  } catch (err) {
    logger.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const cart = await cartService.getOne({ _id: cartId });
    if (!cart) throw new Error("Non-existent cart.");

    console.log(cart);
    const product = cart.products.find((id) => id.toString() === productId);
    if (!product) throw new Error("Non-existent product in cart.");

    await cartService.update(cartId, { $pull: { products: productId } });
    res.sendStatus(204);
  } catch (err) {
    logger.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    await cartService.delete(cartId);
    res.sendStatus(204);
  } catch (err) {
    logger.error(err.message);
    res.status(400).json({ message: err.message });
  }
};
