import mongoose from "mongoose";
//import { productsSchema } from "./products.js";
const { Schema, model } = mongoose;

const CartSchema = new Schema(
  // products: { type: [ProductSchema] }
  {
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

CartSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject._v;
  },
});

export const CartModel = model("Cart", CartSchema);
