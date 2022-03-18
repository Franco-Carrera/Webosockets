import mongoose from "mongoose";
const Schema = mongoose.Schema;

export default class Cart {
  constructor(data) {
    this.data = data;
  }
  static get model() {
    return "Carts";
  }
  static get schema() {
    return {
      products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
      user: { type: Schema.Types.ObjectId, ref: "User", unique: true },
    };
  } //probando ref Users como get model () "Users"
}
