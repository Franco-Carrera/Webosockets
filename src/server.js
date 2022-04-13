import express from "express";
import cors from "cors";
import passport from "passport";
import initializePassport from "./config/passport-config.js";
import cookieParser from "cookie-parser";

import swaggerUiExpress from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import userRouter from "./routes/user.routes.js";
import sessionRouter from "./routes/session.routes.js";

import notFoundHandler from "./middlewares/notFoundHandler.js";
import loggerHandler from "./middlewares/loggerHandler.js";

import { PORT, SWAGGER } from "./config/config.js";
import { __dirname } from "./utils.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { productService } from "./services/services.js";
// import pkg from '../package.json' EDIT PUBLIC + Views

const logger = loggerHandler();

export default class ServerApp {
  constructor() {
    this.app = express();
    this.port = PORT;
  }

  middlewares() {
    this.app.use(
      "/api/swagger-ui",
      swaggerUiExpress.serve,
      swaggerUiExpress.setup(swaggerJsdoc(SWAGGER.spec))
    );

    this.app.engine("handlebars", engine());
    this.app.set("view engine", "handlebars");
    this.app.set("views", __dirname + "/views");

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(cors());
    this.app.use(passport.initialize());
    initializePassport();

    this.app.use("/uploads/", express.static(__dirname + "/uploads"));
    this.app.use(express.static(__dirname + "/public"));
  }

  routes() {
    this.app.get("/api", (req, res) => {
      // res.json({
      //   name: pkg.name,
      //   description: pkg.description,
      //   version: pkg.version,
      //   author: pkg.author,
      // });
    });
    this.app.use("/api/products", productRouter);
    this.app.use("/api/carts", cartRouter);
    this.app.use("/api/users", userRouter);
    this.app.use("/session", sessionRouter);
    this.app.use(notFoundHandler);
  }

  //database() {}

  run() {
    //this.database();
    this.middlewares();
    this.routes();
    const server = this.app.listen(PORT, () => {
      const message = `| Server listen on port ${PORT} |`;
      const link = `| - http://localhost:${PORT}    |`;
      console.log("-".repeat(message.length));
      console.log(message);
      console.log(link);
      console.log("-".repeat(message.length));
      logger.info(`Server listen on port ${PORT}`);
    });
    server.on("error", (err) =>
      logger.error(`Error server: ${err}
    `)
    );
    const io = new Server(server);
    //-------------------- socket ----------------//
    io.on("connection", async (socket) => {
      console.log(`the socket ${socket.id} is connected`);
      let allProducts = await productService.get();
      socket.emit("deliverProducts", allProducts);
    });
    //------------------ end socket ----------------//
  }
}
