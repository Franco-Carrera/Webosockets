import User from "../models/User.js";
import Repository from "./Repository.js";
import bcrypt from "bcrypt";

export default class UserService extends Repository {
  constructor(dao) {
    super(dao, User.model);
  }

  async getByMail(email) {
    return this.dao.find({ email }, User.model);
  }

  async encryptPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async comparePassword(password, receivedPassword) {
    return await bcrypt.compare(password, receivedPassword);
  }
}
