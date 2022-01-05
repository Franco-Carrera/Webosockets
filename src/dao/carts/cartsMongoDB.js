import MongoDBContainer from "../../containers/mongoDBContainer.js";
import { CartModel } from "../models/Cart.js";
import { ProductModel } from "../models/Product.js";

export default class CartsMongoDB extends MongoDBContainer {
  async createCart() {
    try {
      const cart = await CartModel.create({ products: [] });
      return {
        status: "success",
        message: `Cart with ID ${cart._id} Created successfully!`,
      };
    } catch (err) {
      console.log(err);
      return { status: "error", message: err.message };
    }
  }
  async addProductToCart(cartId, productId) {
    try {
      if (!cartId || !productId)
        throw new Error("Missing 'cartId' or 'productId' attribute!");

      const cart = await CartModel.findById(cartId);
      if (!cart) throw new Error("Not existst cart.");

      const product = await ProductModel.findById(productId);
      if (!product) throw new Error("Not exists product.");

      const productFound = await CartModel.findById(cartId).findOne({
        products: productId,
      });
      if (productFound) throw new Error("Product already exists in cart.");

      await CartModel.findByIdAndUpdate(cartId, {
        $push: { products: product },
      });

      return {
        status: "success",
        message: "Product has been added successfully.",
      };
    } catch (err) {
      console.error(err);
      return { status: "error", message: err.message };
    }
  }

  async getProductsByCartId(cartId) {
    try {
      if (!cartId) throw new Error("Losing 'cartId' attribute!");

      const cart = await CartModel.findById(cartId);
      if (!cart) throw new Error("Not exists cart.");

      const products = cart.products;

      return { status: "success", payload: products };
    } catch (err) {
      console.error(err);
      return { status: "error", message: err.message };
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      if (!cartId || !productId)
        throw new Error("Losing 'cartId' or 'productId' parameter!");

      const cart = await CartModel.findById(cartId);
      if (!cart) throw new Error("Non-existent cart.");

      const product = await CartModel.findById(cartId).findOne({
        products: productId,
      });
      if (!product) throw new Error("Non-existent product in cart.");

      await CartModel.findByIdAndUpdate(cartId, {
        $pull: { products: productId },
      });

      return {
        status: "success",
        message: "Product has been deleted successfully.",
      };
    } catch (err) {
      console.error(err);
      return { status: "error", message: err.message };
    }
  }

  async deleteCartById(cartId) {
    try {
      if (!cartId) throw new Error("Losing 'cartId' attribute!");

      const cart = await ProductModel.findById(cartId);
      if (!cart) throw new Error("Not exists cart.");

      await CartModel.findByIdAndDelete(cartId);

      return {
        status: "success",
        message: "Cart has been deleted successfully.",
      };
    } catch (err) {
      console.log(err);
      return { status: "error", message: err.message };
    }
  }
}
