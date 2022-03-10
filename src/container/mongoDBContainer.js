import mongoose from "mongoose";
//////MONGO_URI = CLAVE MONGO PARA CONECTAR
import { MONGO_URI } from "../config/config.js";
import loggerHandler from "../utils/loggerHandler.js";

const logger = loggerHandler();

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
    logger.info("A connection to MongoDB realized.");
  }
}
