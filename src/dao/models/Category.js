import mongoose from "mongoose";
const Schema = new mongoose.Schema();

export default class Category {
  constructor(data) {
    this.data = data;
  }
  //Momentáneo
  static get model() {
    return "Category";
  }
  static get schema() {
    return {
      name: { type: String, required: true },
    };
  }
}
