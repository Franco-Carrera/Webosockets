import mongoose from "mongoose";
const { Schema, model } = mongoose;

export const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    firstName: { type: String, required: true },
    userName: {
      type: String,
      required: true,
      unique: true,
      default: "anonymus",
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
  },
  { timestamps: true }
);
///Modelo para inputs del User
UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const UserModel = model("User", UserSchema);
