import { unlink } from "fs/promises";
import { __dirname } from "../utils.js";
import { productsModel } from "../dao/models/products.js";
//productsModel

///Modelo de productos dao.
// se encuentra mediante función asíncrona fetchProducts

//Relacionar lógica de creación como Profe
//

//
//
export default class ProductsService {
  /**Aquí se crean productos, luego se comentan para no interceder con el desarrollo */

  fetchProducts = async () => {
    await productsModel.find();
    try {
      const products = await select().table("products");
      return { status: "success", payload: products };
    } catch (err) {
      console.log(`Error: ${err}`);
      return { status: "error", message: err.message };
    }
  };

  fetchProduct = async (id) => {
    await productsModel.findById(id);
    try {
      const product = await select().table("products").where("id", id).first();
      if (!product) throw new Error("Product not found.");
      return { status: "success", payload: product };
    } catch (err) {
      console.log(`Error: ${err}`);
      return { status: "error", message: err.message };
    }
  };

  createProduct = async (product) => {
    await productsModel.create(product);
    try {
      const exists = await select()
        .table("products")
        .where("name", item.name)
        .first();
      if (exists) throw new Error("Product already exists.");
      await insert(item).table("products");
      return {
        status: "success",
        payload: "Product has been created successfully.",
      };
    } catch (err) {
      console.log(`Error: ${err}`);
      return { status: "error", message: err.message };
    }
  };

  updateProduct = async (id, item) => {
    try {
      const updated = await update(item).table("products").where("id", id);
      if (!updated) throw new Error("Product update error.");
      return {
        status: "success",
        payload: "Product has been updated successfully.",
      };
    } catch (err) {
      console.log(`Error: ${err}`);
      return { status: "error", message: err.message };
    }
  };

  deleteProduct = async (id) => {
    try {
      const row = await select().table("products").where("id", id).first();
      const product = JSON.parse(JSON.stringify(row));
      const picture = product.picture;
      const index = picture.lastIndexOf("/") + 1;
      const pictureName = picture.substring(index, picture.length);
      await unlink(__dirname + "/uploads/" + pictureName);
      const deleted = await del().table("products").where("id", id);
      if (!deleted) throw new Error("Product delete error.");
      return {
        status: "success",
        payload: "Product has been deleted successfully.",
      };
    } catch (err) {
      console.log(`Error: ${err}`);
      return { status: "error", message: err.message };
    }
  };
}
