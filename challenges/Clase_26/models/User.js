import mongoose from "mongoose";
const collection = "User";

export const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  email: String,
  age: Number,
  address: String,
});

export const userModel = mongoose.model(collection, UserSchema);
