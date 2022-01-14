import fs from "fs";
import { __dirname } from "../utils.js";
import { ProductModel } from "../dao/models/Product.js";

export default class ProductsService {
  getProducts = async () => await ProductModel.find();
  //Encontrando todos los productos.

  getProduct = async (productId) => {
    if (!productId) throw new Error("Losing 'productId' attribute!"); //Verificamos si no existe productId

    const product = await ProductModel.findById(productId);
    if (!product) throw new Error("Not exists product.");
    //Verificamos si no existe product. Al encontrar por id.
    return product;
  };

  createProduct = async (product) => {
    if (!Object.keys(product).length === 0)
      throw new Error("Losing or empty 'body' product.");

    // declaramos keys of Object product
    let { name, category, description, code, picture, price, stock } = product;
    if (
      !name ||
      !category ||
      !description ||
      !code ||
      !picture ||
      !price ||
      !stock
    )
      throw new Error("Body product is not correctly");

    //Encuentra un producto Por el nombre
    const productFound = await ProductModel.findOne({ name: { $eq: name } });
    if (productFound) throw new Error("Product already exists.");

    //Probamos parsear con Number
    stock = Number(stock);
    price = Number(price);

    //Creamos producto pasándole parámetro
    const productCreated = await ProductModel.create(product);
    return productCreated;
  };

  updateProduct = async (productId, body) => {
    if (!productId) throw new Error("Losing 'productId' attribute!");

    const product = await ProductModel.findById(productId);
    if (!product) throw new Error("Not exists product.");
    //Mismo proceder que getProduct

    const productFound = await ProductModel.findOne({
      _id: { $ne: productId },
      updateName: { $eq: updateName },
      //Encuentra por _id y por nombre
    });
    if (productFound) throw new Error("Product already exists.");

    stock = Number(stock);
    price = Number(price);

    await ProductModel.findByIdAndUpdate(productId, { $set: body }); //Encuentra por id y modifica, el productId y su cuerpo.
  };

  deleteProduct = async (productId) => {
    if (!productId) throw new Error("Losing 'productId' attribute!");

    const product = await ProductModel.findById(productId);
    if (!product) throw new Error("Not exists product.");

    await ProductModel.findByIdAndDelete(productId);
    this.deleteFileFromServer(product);
  };

  deleteFileFromServer = async (product) => {
    try {
      if (!product) throw new Error("Losing 'product' attribute!");
      const picture = product.picture;
      const index = picture.lastIndexOf("/") + 1;
      const pictureName = picture.substring(index, picture.length);
      //Nombre de imagen contiene imagen de product, índice y longitud.

      await fs.promises.unlink(__dirname + "/uploads/" + pictureName);
      // espera a que fs traiga promesa con __dirname como ruta sumada al archivo uploads, con el nombre de imagen.

      console.log(
        `Picture with ${pictureName} has been deleted successfully from server.`
      );
    } catch (err) {
      console.error(err);
    }
  };
}
