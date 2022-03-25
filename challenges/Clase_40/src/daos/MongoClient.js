import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default class MongoClient {
  constructor() {
    this.connected = true;
    this.client = mongoose;
  }
  connect = async () => {
    try {
      await this.client.connect(process.env.MONGO_URI, {
        userNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      throw new Error("can not connect to database");
    }
  };
}

//Check package master luego
