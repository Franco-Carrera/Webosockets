import pkg from "mongoose";
const { Schema, model } = pkg;

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { versionKey: false }
);

const Category = model("Category", CategorySchema);

export default Category;
