import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CartSchema = new Schema(
  {
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

CartSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const CartModel = model("Cart", CartSchema);
