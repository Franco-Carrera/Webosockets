import mongoose from "mongoose";
import User from "./User.js";
import Product from "./Product.js";
import Cart from "./Cart.js";

export default class MongoDAO {
  constructor(MONGO_URI) {
    this.mongoose = mongoose
      .connect(MONGO_URI, { useNewUrlParser: true })
      .catch((err) => {
        console.log(err);
        process.exit();
      });
    const userSchema = mongoose.Schema(User.schema, {
      timestamps: true,
      versionKey: false,
    });
    const productSchema = mongoose.Schema(Product.schema, {
      timestamps: true,
      versionKey: false,
    });
    const cartSchema = mongoose.Schema(Cart.schema, {
      timestamps: true,
      versionKey: false,
    });
    this.models = {
      [User.model]: mongoose.model(User.model, userSchema),
      [Product.model]: mongoose.model(Product.model, productSchema),
      [Cart.model]: mongoose.model(Cart.model, cartSchema),
    };
  }

  async get(options, entity) {
    if (!this.models[entity]) throw new Error("Entity not found in models.");
    const results = await this.models[entity].find(options);
    return results.map((result) => result.toObject());
  }

  async getOne(options, entity) {
    if (!this.models[entity]) throw new Error("Entity not found in models.");
    const result = await this.models[entity].findOne(options);
    return result ? result.toObject() : null;
  }

  getUser = async (options, entity) => {
    if (!this.models[entity])
      throw new Error(`Entity ${entity} not in dao schemas`);

    const userFound = await this.models[entity].findById(options);
    // .populate("role");
    if (!userFound) throw new Error("User not found.");
    return userFound; //para passport-config.js
  };

  async add(document, entity) {
    if (!this.models[entity]) throw new Error("Entity not found in models.");
    try {
      const instance = new this.models[entity](document);
      const result = await instance.save();
      return result ? result.toObject() : null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async update(id, document, entity) {
    if (!this.models[entity]) throw new Error("Entity not found in models.");
    try {
      const result = await this.models[entity].findByIdAndUpdate(id, document, {
        new: true,
      });
      return result ? result.toObject() : null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async delete(id, entity) {
    if (!this.models[entity]) throw new Error("Entity not found in models.");
    const result = await this.models[entity].findByIdAndDelete(id);
    return result ? result.toObject() : null;
  }
}
