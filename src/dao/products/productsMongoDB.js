import MongoDBContainer from "../../containers/mongoDBContainer.js";
import { ProductModel } from "../models/Product.js";

export default class ProductsMongoDB extends MongoDBContainer {
  async getProducts() {
    try {
      const products = await ProductModel.find();
      return { status: "success", payload: products };
    } catch (err) {
      console.error(err);
      return {
        status: "error",
        message: err.message,
      };
    }
  }
  async getProductById(productId) {
    try {
      if (!productId) throw new Error("Lost 'productId' attribute!");

      const product = await ProductModel.findById(productId);
      if (!product) throw new Error("Not exist product");

      return { status: "success", payload: product };
    } catch (err) {
      console.error(err);
      return { status: "error", message: err.message };
    }
  }
  async createProduct(body) {
    try {
      if (Object.keys(body).length === 0)
        throw new Error("Missing or lost 'body product' parameter!");
      if (
        !body.name ||
        !body.description ||
        !body.code ||
        !body.picture ||
        !body.price ||
        !body.stock ||
        !body.category
      )
        throw new Error("Body attributes not formed correctly.");

      const product = await ProductModel.findOne({ name: { $eq: body.name } });
      if (product) throw new Error("Product already exists.");

      body.stock = parseInt(body.stock);
      body.price = parseInt(body.price);

      const createdProduct = await ProductModel.create(body);

      return {
        status: "success",
        message: `Product ID ${createdProduct._id} has been created successfully.`,
      };
    } catch (err) {
      console.error(err);
      return { status: "error", message: err.message };
    }
  }

  async updateProductById(productId, body) {
    try {
      if (!productId || Object.keys(body).length === 0)
        throw new Error(
          "Missing or lost 'productId' or  'body product' parameter!"
        );
      if (
        !body.name ||
        !body.description ||
        !body.category ||
        !body.code ||
        !body.price ||
        !body.stock ||
        !body.picture
      )
        throw new Error("Body attributes not formed correctly.");

      const productFound = await ProductModel.findOne({
        _id: { $ne: productId },
        name: { $eq: body.name },
      });
      if (productFound) throw new Error("Product already exists.");

      body.stock = parseInt(body.stock);
      body.price = parseInt(body.price);

      const product = await ProductModel.findById(productId);
      if (!product) throw new Error("Not exists product.");

      await ProductModel.findByIdAndUpdate(productId, { $set: body });

      return {
        status: "success",
        message: "Product has been updated successfully.",
      };
    } catch (err) {
      console.error(err);
      return { status: "error", message: err.message };
    }
  }
  async deleteProductById(productId) {
    try {
      if (!productId) throw new Error("Losing 'productId' attribute! ");

      const product = await ProductModel.findById(productId);
      if (!product) throw new Error("Not exist product.");

      await ProductModel.findByIdAndDelete(productId);
      super.deleteFileFromServer(product);

      return {
        status: "success",
        message: "Product has been deleted successfully",
      };
    } catch (err) {
      console.error(err);
      return { status: "error", message: err.message };
    }
  }
}
