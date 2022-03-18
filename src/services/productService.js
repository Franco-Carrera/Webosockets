import Product from "../dao/models/Product.js";
import GenericQueries from "./genericQueries.js";

export default class ProductService extends GenericQueries {
  constructor(dao) {
    super(dao, Product.model);
  }
}

/*
import fs from "fs";
import { __dirname } from "../utils.js";
import Product from "../dao/models/Product.js";
//import Category from "../dao/models/Category.js";

export default class ProductService {
  async getProducts() {
    return await Product.find();
  }

  async getProductById(productId) {
    if (!productId) throw new Error("Losing 'productId' attribute!");

    const product = await Product.findById(productId);
    if (!product) throw new Error("Non-existent product.");

    return product;
  }

  async createProduct(
    name,
    category,
    description,
    code,
    picture,
    price,
    stock
  ) {
    if (
      !name ||
      !category ||
      !description ||
      !code ||
      !picture ||
      !price ||
      !stock
    )
      throw new Error("Body product is badly formed.");

    // const categoryFound = await Category.findOne({ name: { $eq: category } });
    // if (!categoryFound) throw new Error("Category not found.");

    const product = await Product.findOne({ name: { $eq: name } });
    if (product) throw new Error("Product already exists.");

    stock = parseInt(stock);
    price = parseInt(price);

    const createdProduct = await Product.create({
      name,
      category,
      description,
      code,
      picture,
      price,
      stock,
    });
    return createdProduct;
  }

  async updateProductById(productId, body) {
    if (!productId || Object.keys(body).length === 0)
      throw new Error("Losing or empty 'productId' or 'body' product.");

    const product = await Product.findById(productId);
    if (!product) throw new Error("Not exists product.");

    const productFound = await Product.findOne({
      _id: { $ne: productId },
      name: { $eq: body.name },
    });
    if (productFound) throw new Error("Product already exists.");

    body.stock = parseInt(body.stock);
    body.price = parseInt(body.price);

    const updatedProduct = await Product.findByIdAndUpdate(productId, body, {
      new: true,
    });
    return updatedProduct;
  }

  async deleteProductById(productId) {
    if (!productId) throw new Error("Losing 'productId' attribute!");

    const product = await Product.findById(productId);
    if (!product) throw new Error("Non-existent product.");

    await Product.findByIdAndDelete(productId);
    this.deleteFileFromServer(product);
  }

  async deleteFileFromServer(product) {
    try {
      if (!product) throw new Error("Losing 'product' attribute");
      const picture = product.picture;
      const index = picture.lastIndexOf("/") + 1;
      const pictureName = picture.substring(index, picture.length);
      await fs.promises.unlink(__dirname + "/uploads/" + pictureName);
      console.log(
        `Picture ${pictureName} has been deleted successfully from server.`
      );
    } catch (err) {
      console.error(err);
    }
  }
}
*/
