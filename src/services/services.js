import Dao from "../dao/db/Dao.js";
import UserService from "./userService.js";
import ProductsService from "./productService.js";
import config from "../config/config.js";

const dao = new Dao(config.mongo);

export const userService = new UserService(dao);
export const productService = new ProductsService(dao);
