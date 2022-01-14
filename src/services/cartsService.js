import { CartModel } from "../dao/models/Cart.js";
import { ProductModel } from "../dao/models/Product.js";

export default class CartsService {
  createCart = async () => {
    //Create arreglo products
    const cartCreated = await CartModel.create({ products: [] });
    return cartCreated;
  };

  addProduct = async (cartId, productId) => {
    if (!cartId || !productId)
      throw new Error("Losing 'cartId or 'productId attribute.'");

    const cart = await CartModel.findById(cartId);
    if (!cart) throw new Error("Not exists cart.");

    const product = await ProductModel.findById(productId);
    if (!product) throw new Error("Not exists product.");

    const productFound = await CartModel.findById(cartId).findOne({
      products: productId,
    });
    if (productFound) throw new Error("Product already exists in cart.");

    await CartModel.findByIdAndUpdate(cartId, { $push: { products: product } });
  };
  getProducts = async (cartId) => {
    if (!cartId) throw new Error("Losing cartId attribute.");

    const cart = await CartModel.findById(cartId).populate("products");
    if (!cart) throw new Error("Not exists cart.");

    const products = cart.products;
    return products;
  };
  deleteProduct = async (cartId, productId) => {
    if (!cartId || productId)
      throw new Error("Losing 'cartId' or 'productId' attribute.");

    const cart = await CartModel.findById(cartId);
    if (!cart) throw new Error("Not exists cart.");

    const product = await CartModel.findById(productId);
    if (!product) throw new Error("Not exists product in cart.");

    await CartModel.findByIdAndUpdate(cartId, {
      $pull: { products: productId },
    });
  };
  deleteCart = async (cartId) => {
    if (!cartId) throw new Error("Losing 'cartId' attribute.");

    const cart = await CartModel.findById(cartId);
    if (!cart) throw new Error("Not exists cart.");

    await CartModel.findByIdAndDelete(cartId);
  };
}
