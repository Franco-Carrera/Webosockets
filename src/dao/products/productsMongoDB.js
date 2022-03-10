import MongoDBContainer from "../../container/mongoDBContainer.js";
import Product from "../models/Product.js";
//import Category from "../models/Category.js";

export default class ProductsMongoDB extends MongoDBContainer {
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

      const product = await Product.findOne({ name: { $eq: body.name } });
      if (product) throw new Error("Product already exists.");

      body.stock = parseInt(body.stock);
      body.price = parseInt(body.price);

      const createdProduct = await Product.create(body);

      return {
        status: "success",
        message: `Product ID ${createdProduct._id} has been created successfully.`,
      };
    } catch (err) {
      console.error(err);
      return { status: "error", message: err.message };
    }
  }
}
