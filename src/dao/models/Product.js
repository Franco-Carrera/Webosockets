import mongoose from "mongoose";
const { Schema, model } = mongoose;

export const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    picture: { type: String, required: true },
  },
  { timestamps: true }
);

ProductSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject._v;
  },
});

export const ProductModel = model("Product", ProductSchema);
