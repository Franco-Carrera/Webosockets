import mongoose from "mongoose";
import usersModel from "../models/User.js";

export default class UsersDaoDB {
  constructor() {
    this.model = mongoose.model(usersModel.collectionName, usersModel.schema);
  }
  getAll = async () => {
    let results = await this.model.find();
    return results;
  };
  save = async (user) => {
    let result = await this.model.create(user);
    return result;
  };
}
