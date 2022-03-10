import express from "express";
import cors from "cors";
import passport from "passport";
import initializePassport from "./config/passport-config.js";
import { __dirname } from "./utils.js";
import cookieParser from "cookie-parser";

import sessionRouter from "./routes/session.js";

import userRouter from "./routes/users.js";
import productsRouter from "./routes/products.js";

import { PORT } from "./config/config.js";
//import pkg from "../package.json";

import loggerHandler from "./utils/loggerHandler.js";
const logger = loggerHandler();

export default class Server {
  constructor() {
    this.app = express();
    this.port = PORT;
  }
  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(cors());
    this.app.use("/uploads/", express.static(__dirname + "/uploads"));
    this.app.use(express.static(__dirname + "/public"));
    this.app.use(passport.initialize());
    initializePassport();
  }
  routes() {
    //    this.app.get("/api", (req, res) => {
    //   res.json({
    //     name: pkg.name,
    //     description: pkg.description,
    //     version: pkg.version,
    //     author: pkg.author,
    //   });
    // });
    this.app.use("/session", sessionRouter);
    this.app.use("/api/users", userRouter);
    this.app.use("/api/products", productsRouter);
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

// app.get("/", (req, res) => {
//   res.send("index.html");
// });
