import express from "express";
import cors from "cors";
import passport from "passport";
import initializePassport from "./config/passport-config.js";
import cookieParser from "cookie-parser";

import sessionRouter from "./routes/session.js";
import userRouter from "./routes/users.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";

import { PORT } from "./config/config.js";
import { __dirname } from "./utils.js";
import { engine } from "express-handlebars";

import loggerHandler from "./utils/loggerHandler.js";
const logger = loggerHandler();

export default class ServerApp {
  constructor() {
    this.app = express();
    this.port = PORT;
  }
  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(cors());

    this.app.engine("handlebars", engine());
    this.app.set("view engine", "handlebars");
    this.app.set("views", __dirname + "/views");

    this.app.use("/uploads/", express.static(__dirname + "/uploads"));
    this.app.use(express.static(__dirname + "/public"));
    this.app.use(passport.initialize());
    initializePassport();
  }
  routes() {
    this.app.use("/session", sessionRouter);
    this.app.use("/api/users", userRouter);
    this.app.use("/api/products", productRouter);
    this.app.use("/api/carts", cartRouter);
    //views
    this.app.get("/", (req, res) => {
      res.render("login");
    });
    this.app.get("/register", (req, res) => {
      res.render("register");
    });
    this.app.get("/logout", (req, res) => {
      res.render("logout");
    });
    this.app.get("/home", (req, res) => {
      res.render("home");
    });
  }
  run() {
    this.middlewares();
    this.routes();
    const server = this.app.listen(PORT, () => {
      const link = ` -http://localhost:${PORT}`;
      console.log(`Listening on ${PORT}`);
      console.log(link);
      logger.info(`Server listen on port ${PORT}`);
    });
    server.on("error", (err) => logger.error(`Error server: ${err}`));
  }
}
