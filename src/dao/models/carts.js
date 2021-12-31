import mongoose from "mongoose";
import { productsSchema } from "./products.js";
const { Schema } = mongoose;

const cartSchema = new Schema({
  products: [productsSchema],
});

export const cartsModel = mongoose.model("carts", cartSchema);
