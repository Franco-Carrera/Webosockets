import mongoose from "mongoose";
import { MONGO_URI } from "../../config/config.js";

export const getConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return "Connected to MongoDB.";
  } catch (err) {
    console.log(err);
  }
};
