import FileContainer from "../../containers/fileContainer.js";
import { __dirname } from "../../utils.js";
import fs from "fs";

export default class ProductsFile extends FileContainer {
  constructor() {
    super(__dirname + "/dao/db/products.json");
  }

  async getProducts() {
    const productsFile = await fs.promises.readFile(this.filePath, "utf-8");
    const products = productsFile ? JSON.parse(productsFile) : [];
    return { status: "success", payload: products };
  }
  catch(err) {
    return { status: "error", message: err.message };
  }

  async getProductById(productId) {
    try {
      if (!productId) throw new Error("Missing 'product' parameter!");
      productId = Number(productId);

      const productsFile = await fs.promises.readFile(this.filePath, "utf-8");
      const products = productsFile ? JSON.parse(productsFile) : [];

      const product = products.find((p) => p.id === productId);
      if (!product) throw new Error("Dont exist product.");

      return { status: "success", payload: product };
    } catch (err) {
      return { status: "error", message: err.message };
    }
  }

  async createProduct(body) {
    try {
      if (Object.keys(body).length === 0)
        throw new Error("Missing or lost 'body product' parameter");

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

      const productsFile = await fs.promises.readFile(this.filePath, "utf-8");
      let products = productsFile ? JSON.parse(productsFile) : [];

      let product = products.find((e) => (e.name = body.name));

      if (product) throw new Error("Product already exists.");

      product = {
        id: 1,
        name: body.name,
        description: body.description,
        category: body.category,
        code: body.code,
        timestamp: Date.now(),
        price: parseInt(body.price),
        stock: parseInt(body.stock),
        picture: body.picture,
      };

      if (products.length >= 0) {
        const ids = products.map((product) => product.id);
        const maxId = Math.max(...ids);
        product.id = maxId + 1;
      }

      products = [...products, product];

      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(products, null, 2)
      );
      return {
        status: "success",
        message: `Product with ID ${product.id} has been created successfully.`,
      };
    } catch (err) {
      return { status: "error", message: err.message };
    }
  }
  ///Update y delete
  async updateProductById(productId, body) {
    try {
      if (!productId || Object.keys(body).length === 0)
        throw new Error(
          "Missing or empty 'productId' or 'body product' parameter!"
        );
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
      productId = parseInt(productId);

      const productsFile = await fs.promises.readFile(this.filePath, "utf-8");
      let products = productsFile ? JSON.parse(productsFile) : [];

      let product = products.find((e) => e.id === productId);
      if (!product) throw new Error("Non-existent product.");

      products = products.filter((e) => e.id !== productId);

      product = {
        ...product,
        name: body.name,
        category: body.category,
        description: body.description,
        code: body.code,
        timestamp: body.timestamp,
        price: parseInt(body.price),
        stock: parseInt(body.stock),
        picture: body.picture,
      };

      products = [...products, product];

      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(products, null, 2)
      );

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
      if (!productId) throw new Error("Missing 'productId' attributes!");
      productId = parseInt(productId);

      const productsFile = await fs.promises.readFile(this.filePath, "utf-8");
      let products = productsFile ? JSON.parse(productsFile) : [];

      const product = products.find((e) => e.id === productId);
      if (!product) throw new Error("Not exist product");

      super.deleteFileFromServer(product);

      products = products.filter((e) => e.id !== productId);
      if (products.length === 0) products = [];

      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(products, null, 2)
      );

      return {
        status: "success",
        message: "Product has been deleted successfully.",
      };
    } catch (err) {
      console.error(err);
      return { status: "error", message: err.message };
    }
  }
}
