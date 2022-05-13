import User from "../models/User.js";
import GenericQueries from "./genericQueries.js";
import bcrypt from "bcrypt";

export default class UserService extends GenericQueries {
  constructor(dao) {
    super(dao, User.model);
  }
  async encryptPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
  async comparePassword(password, receivedPassword) {
    return await bcrypt.compare(password, receivedPassword);
  }
}
