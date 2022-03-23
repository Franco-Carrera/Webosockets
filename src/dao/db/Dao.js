import mongoose from "mongoose";
import User from "../models/User.js";
import loggerHandler from "../../utils/loggerHandler.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Chats from "../models/Chats.js";

const logger = loggerHandler();

export default class Dao {
  constructor(config) {
    this.mongoose = mongoose
      .connect(config.url, { useNewUrlParser: true })
      .catch((err) => {
        logger.error(err);
        process.exit();
      });
    logger.info("Realized connection MongoDB.");
    const timestamp = {
      timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    };
    const userSchema = mongoose.Schema(User.schema, timestamp);
    const cartSchema = mongoose.Schema(Cart.schema, timestamp);
    const productSchema = mongoose.Schema(Product.schema, timestamp);
    const chatSchema = mongoose.Schema(null, timestamp);

    this.models = {
      [User.model]: mongoose.model(User.model, userSchema),
      [Cart.model]: mongoose.model(Cart.model, cartSchema),
      [Product.model]: mongoose.model(Product.model, productSchema),
      [Chats.model]: mongoose.model(Chats.model, chatSchema),
    };
    ``;
  }

  exists = async (entity, options) => {
    if (!this.models[entity])
      throw new error(`Entity ${entity} not in dao schemas`);
    return this.models[entity].exists(options);
  };

  findOne = async (options, entity) => {
    if (!this.models[entity])
      throw new Error(`Entity ${entity} not in dao schemas`);
    let result = await this.models[entity].findOne(options);
    return result ? result.toObject() : null;
  };

  getAll = async (options, entity) => {
    if (!this.models[entity])
      throw new Error(`Entity ${entity} not in dao schemas`);
    let results = await this.models[entity].find(options);
    return results.map((result) => result.toObject());
  };

  getUser = async (options, entity) => {
    if (!this.models[entity])
      throw new Error(`Entity ${entity} not in dao schemas`);

    const userFound = await this.models[entity].findById(options);
    // .populate("role");
    if (!userFound) throw new Error("User not found.");
    return userFound;
  };

  insert = async (document, entity) => {
    if (!this.models[entity])
      throw new Error(`Entity ${entity} not in dao schemas`);
    try {
      let instance = new this.models[entity](document);
      let result = await instance.save();
      return result ? result.toObject() : null;
    } catch (err) {
      logger.error(err);
      return null;
    }
  };

  update = async (document, entity) => {
    if (!this.models[entity])
      throw new Error(`Entity ${entity} not in dao schemas`);
    let id = document._id;
    delete document._id;
    let result = await this.models[entity].findByIdAndUpdate(
      id,
      { $set: document },
      { new: true }
    );
    return result.toObject();
  };

  delete = async (id, entity) => {
    if (!this.models[entity])
      throw new Error(`Entity ${entity} not in dao schemas`);
    let result = await this.models[entity].findByIdAndDelete(id);
    return result ? result.toObject() : null;
  };

  //Cart
  addProductToCart = async (cartId, productId, entity) => {
    if (!this.models[entity])
      throw new Error(`Entity ${entity} not in dao schemas`);

    let result = await this.models[entity].updateOne(
      { _id: cartId },
      { $push: { products: productId } }
    );
    return { status: "success", payload: result };
  };

  getProductsByCartId = async (cartId, entity) => {
    if (!this.models[entity])
      throw new error(`Entity ${entity} not in dao schemas`);
    let cart = await this.models[entity].findById(cartId);
    let products = cart.products;
    return { status: "success", payload: products };
  };
}
