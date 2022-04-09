import express from "express";
import cors from "cors";

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
// import pkg from '../package.json'

const logger = loggerHandler();

export default class Server {
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
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use("/uploads/", express.static(__dirname + "/uploads"));
    this.app.use(express.static(__dirname + "/public"));
  }

  routes() {
    this.app.get("/api", (req, res) => {
      // res.json({
      //   name: pkg.name,
      //   description: pkg.description,
      //   version: pkg.version,
      //   author: pkg.author
      // })
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
    server.on("error", (err) => logger.error(`Error server: ${err}`));
  }
}
