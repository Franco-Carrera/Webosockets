import Product from "../dao/models/Product.js";
import GenericQueries from "./genericQueries.js";

export default class ProductsService extends GenericQueries {
  constructor(dao) {
    super(dao, Product.model);
  } //Aquí sin constructor dao puedo meter products.
}
