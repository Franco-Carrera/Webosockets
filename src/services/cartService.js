import Cart from "../dao/models/Cart.js";
import GenericQueries from "./genericQueries.js";

export default class CartService extends GenericQueries {
  constructor(dao) {
    super(dao, Cart.model);
  }
}

/*
import Cart from "../dao/models/Cart.js";
import Product from "../dao/models/Product.js";
import User from "../dao/models/User.js";

export default class CartService {
  async getCart(cartId) {
    if (!cartId) throw new Error("Losing 'cartId' parameter!");

    const cartFound = await Cart.findById(cartId).populate("products");
    if (!cartFound) throw new Error("Cart not found.");

    return cartFound;
  }

  async getCarts() {
    return await Cart.find();
  }

  async createCart(userId) {
    if (!userId) throw new Error("Losing 'userId' parameter!");

    const userFound = await User.findById(userId);
    if (!userFound) throw new Error("User not found.");

    const cartCreated = await Cart.create({
      products: [],
      user: userFound._id,
    });

    userFound.cart = cartCreated._id;
    userFound.save();

    return cartCreated;
  }
  */

/*
  async addProduct(cartId, productId) {
    if (!cartId || !productId)
      throw new Error("Losing 'cartId' or 'productId' parameter!");

    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error("Not exists cart.");

    const product = await Product.findById(productId);
    if (!product) throw new Error("Not exists product.");

    const productFound = await Cart.findById(cartId).findOne({
      products: productId,
    });
    if (productFound) throw new Error("Product already exists in cart.");

    await Cart.findByIdAndUpdate(cartId, { $push: { products: product } });
  }
*/

/*

  async getProducts(cartId) {
    if (!cartId) throw new Error("Losing 'cartId' parameter!");

    const cart = await Cart.findById(cartId).populate("products");
    if (!cart) throw new Error("Not exists cart.");

    const products = cart.products;
    return products;
  }

  async deleteProduct(cartId, productId) {
    if (!cartId || !productId)
      throw new Error("Losing 'cartId' or 'productId' parameter!");

    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error("Not exists cart.");

    const product = await Cart.findById(cartId).findOne({
      products: productId,
    });
    if (!product) throw new Error("Not exists product in cart.");

    await Cart.findByIdAndUpdate(cartId, { $pull: { products: productId } });
  }

  async deleteCart(cartId) {
    if (!cartId) throw new Error("Losing 'cartId' parameter!");

    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error("Not exists cart.");

    const userFound = await User.findById(cart.user);
    if (!userFound) throw new Error("User not found.");

    userFound.cart = undefined;
    userFound.save();

    await Cart.findByIdAndDelete(cartId);
  }
}
*/
