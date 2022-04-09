import MongoDAO from "../models/MongoDAO.js";
import UserService from "./userService.js";
import ProductService from "./productService.js";
import CartService from "./cartService.js";
import { PERSISTENCE, MONGO, ENVIRONMENT } from "../config/config.js";

let dao;

switch (PERSISTENCE) {
  case "MONGO":
    if (ENVIRONMENT === "DEVELOPMENT") {
      dao = new MongoDAO(MONGO.URI_DEVELOPMENT);
    } else if (ENVIRONMENT === "TESTER") {
      dao = new MongoDAO(MONGO.URI_TESTER);
    }
    break;
}

export const userService = new UserService(dao);
export const productService = new ProductService(dao);
export const cartService = new CartService(dao);
