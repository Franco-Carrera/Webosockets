import mongoose from "mongoose";
const { Schema } = mongoose;

const collectionRef = "products";

export const productsSchema = new Schema({
  name: { type: String, required: true, max: 50 },
  description: { type: String, required: true, max: 250 },
  code: { type: String, required: true, unique: true, max: 10 },
  price: { type: Number, required: true },
  picture: { type: String, required: true, max: 100 },
});

export const productsModel = mongoose.model(collectionRef, productsSchema);
