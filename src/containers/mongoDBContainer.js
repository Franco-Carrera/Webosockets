import mongoose from "mongoose";
//////MONGO_URI = CLAVE MONGO PARA CONECTAR
import { MONGO_URI } from "../config/config.js";
import fs from "fs";
import { __dirname } from "../utils.js";

export default class MongoDBContainer {
  constructor() {
    this.getConnection();
  }

  async getConnection() {
    try {
      if (mongoose.connection.readyState === 0) {
        await mongoose.connect(MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
    console.log("realizado connect");
  }

  async deleteFileFromServer(product) {
    try {
      if (!product) throw new Error("Missing 'product' parameter");
      const picture = product.picture;
      const index = picture.lastIndexOf("/") + 1;
      const pictureName = picture.substring(index, picture.length);
      await fs.promises.unlink(__dirname + "/uploads/" + pictureName);
      console.log(
        `Picture ${pictureName} has been deleted successfully from server`
      );
    } catch (err) {
      console.log(err);
    }
  }
}
