import fs from "fs";

class ContenedorProductos {
  constructor() {
    this.fileLocation = "src/files/products.txt";
  }

  async getById(id) {
    try {
      if (!id) throw new Error("Missing 'id' parameter!");
      const productsFile = await fs.promises.readFile(
        this.fileLocation,
        "utf-8"
      );
      if (!productsFile) throw new Error("The document is empty!");

      const product = JSON.parse(productsFile).find((e) => e.id === id);
      if (!product) throw new Error("Product not found.");
      return { status: "success", payload: product };
    } catch (err) {
      console.log(`Read file error: ${err.message}`);
      return { status: "error", message: "Product not found." };
    }
  }

  async save(item) {
    try {
      if (Object.keys(item).length === 0)
        throw new Error("Missing or empty 'item' parameter!");

      const productsFile = await fs.promises.readFile(
        this.fileLocation,
        "utf-8"
      );
      let products = productsFile ? JSON.parse(productsFile) : [];

      const hasProduct = products.find((e) => e.name === item.name);
      if (hasProduct)
        throw new Error("The product already exists with the same name.");

      const product = {
        id: 1,
        name: item.name,
        description: item.description,
        code: item.code,
        timestamp: Date.now(),
        price: parseInt(item.price),
        stock: parseInt(item.stock),
        picture: item.picture,
      };

      if (products.length > 0) {
        const ids = products.map((product) => product.id);
        const maxId = Math.max(...ids);
        product.id = maxId + 1;
      }

      products = [...products, product];

      await fs.promises.writeFile(
        this.fileLocation,
        JSON.stringify(products, null, 2)
      );
      return { status: "success", payload: product };
    } catch (err) {
      console.log(`Save file error: ${err.message}`);
      return { status: "error", message: "Save product error." };
    }
  }

  async updateById(id, item) {
    try {
      if (!id || Object.keys(item).length === 0)
        throw new Error("Missing or empty 'id' or body parameter!");
      const productsFile = await fs.promises.readFile(
        this.fileLocation,
        "utf-8"
      );
      if (!productsFile) throw new Error("The document is empty!");
      let products = productsFile ? JSON.parse(productsFile) : [];

      let product = products.find((e) => e.id === id);
      if (!product) throw new Error("Product not found.");
      products = products.filter((e) => e.id !== id);

      product = {
        ...product,
        name: item.name,
        description: item.description,
        code: item.code,
        timestamp: item.timestamp,
        price: parseInt(item.price),
        stock: parseInt(item.stock),
        picture: item.picture,
      };

      products = [...products, product];
      await fs.promises.writeFile(
        this.fileLocation,
        JSON.stringify(products, null, 2)
      );
      return { status: "success", message: "Product updated successfully." };
    } catch (err) {
      console.log(`Save file error: ${err.message}`);
      return { status: "error", message: "Save product error." };
    }
  }

  async deleteById(id) {
    try {
      if (!id) throw new Error("Missing 'id' parameter!");
      const productsFile = await fs.promises.readFile(
        this.fileLocation,
        "utf-8"
      );
      const products = productsFile ? JSON.parse(productsFile) : [];

      const product = products.find((e) => e.id === id);
      if (!product) throw new Error("Product not found.");

      let newProducts = products.filter((e) => e.id !== id);
      if (newProducts.length === 0) newProducts = "";
      else newProducts = JSON.stringify(newProducts);

      await fs.promises.writeFile(this.fileLocation, newProducts);
      return { status: "success", message: "Product deleted successfully." };
    } catch (err) {
      console.log(`Save file error: ${err.message}`);
      return { status: "error", message: "Delete product error." };
    }
  }

  async getAll() {
    try {
      const productsFile = await fs.promises.readFile(
        this.fileLocation,
        "utf-8"
      );
      if (!productsFile) throw new Error("The document is empty!");
      return { status: "success", payload: JSON.parse(productsFile) };
    } catch (err) {
      console.log(`Read file error: ${err.message}`);
      return { status: "error", message: err.message };
    }
  }
}

export default ContenedorProductos;
