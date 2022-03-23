import Cart from "../dao/models/Cart.js";
import GenericQueries from "./genericQueries.js";

export default class CartService extends GenericQueries {
  constructor(dao) {
    super(dao, Cart.model);
  }
}
