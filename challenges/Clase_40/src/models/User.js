import mongoose from "mongoose";

const collectionName = "users";

const schema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
});

export default {
  collectionName,
  schema,
};
