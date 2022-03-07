import { Schema, model } from "mongoose";

export const ROLES = {
  ADMINISTRATOR: "administrador",
  USER: "user",
};

const RolesSchema = new Schema(
  {
    name: {
      type: String,
      enum: Object.entries(ROLES).map((role) => role[1]),
      required: true,
    },
  },
  { versionKey: false }
);

const Role = model("Role", RolesSchema);

export default Role;
