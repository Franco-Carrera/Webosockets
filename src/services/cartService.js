import Cart from "../model/Cart.js";
import Product from "../model/Product.js";
import User from "../model/User.js";

export default class CartService {
  async getCart(cartId) {
    if (!cartId) throw new Error("Missing 'id' attribute!");

    const cartFound = await Cart.findById(cartId).populate("products");
    if (!cartFound) throw new Error("Not exists cart.");

    return cartFound;
  }
}
