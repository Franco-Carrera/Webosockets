import mongoose from "mongoose";

let Schema = mongoose.Schema;
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
      adress: { type: String, required: true, trim: true },
      age: { type: String, required: true, trim: true },
      products: [
        {
          type: Boolean,
          default: true,
        },
      ],
      role: { type: String },
      profile_picture: String,
    };
  }
}
