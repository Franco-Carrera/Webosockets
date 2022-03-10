import pkg from "mongoose";
const { Schema, model } = pkg;

const PurchaseSchema = new Schema(
  {
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, versionKey: false }
);

const Purchase = model("Purchase", PurchaseSchema);

export default Purchase;
