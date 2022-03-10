/*
import pkg from "mongoose";
const { Schema, model } = pkg;

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    code: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    picture: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const Product = model("Product", ProductSchema);

export default Product;
*/

import mongoose from "mongoose";
const Schema = mongoose.Schema;

export default class Product {
  constructor(data) {
    this.data = data;
  }
  //Momentáneo
  static get model() {
    return "Products";
  }
  static get schema() {
    return {
      productName: { type: String, required: true },
      description: { type: String, required: true },
      category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
      code: { type: String, required: true, unique: true },
      price: { type: Number, required: true },
      stock: { type: Number, required: true },
      picture: { type: String, required: true },
    };
  }
}
