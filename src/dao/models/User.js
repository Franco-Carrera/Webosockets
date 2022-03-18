import mongoose from "mongoose";
const Schema = mongoose.Schema;

export default class User {
  constructor(data) {
    this.data = data;
  }
  static get model() {
    return "Users";
  }
  static get schema() {
    return {
      first_name: { type: String, required: true, trim: true },
      last_name: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true },
      password: { type: String, required: true },
      username: {
        type: String,
        required: true,
        unique: true,
        default: "anonymus",
      },
      phone: { type: String, required: true, trim: true },
      address: { type: String, required: true, trim: true },
      age: { type: Number, required: true, trim: true },
      role: { type: String },
      profile_picture: { type: String },
      cart: {
        type: Array,
      },
    };
  }
}
