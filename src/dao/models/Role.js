import pkg from "mongoose";
const { Schema, model } = pkg;

export const ROLES = {
  ADMINISTRATOR: "administrator",
  USER: "user",
};

const RoleSchema = new Schema(
  {
    name: {
      type: String,
      enum: Object.entries(ROLES).map((role) => role[1]),
      required: true,
    },
  },
  { versionKey: false }
);

const Role = model("Role", RoleSchema);

export default Role;
