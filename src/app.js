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
import { Server } from "socket.io";
import { productService } from "./services/services.js";
import { engine } from "express-handlebars";

import loggerHandler from "./utils/loggerHandler.js";
const logger = loggerHandler();

const app = express();

const server = app.listen(PORT, () => {
  const link = ` -http://localhost:${PORT}`;
  console.log(`Listening on ${PORT}`);
  console.log(link);
  logger.info(`Server listen on port ${PORT}`);
});
server.on("error", (err) => logger.error(`Error server: ${err}`));

export const io = new Server(server);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(passport.initialize());
initializePassport();

//middelware admin
const admin = true;
app.use((req, res, next) => {
  console.log(new Date().toTimeString().split(" ")[0], req.method, req.url);
  req.auth = admin;
  next();
});

app.use("/uploads/", express.static(__dirname + "/uploads"));
app.use(express.static(__dirname + "/public"));

app.use("/session", sessionRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

//-------------------- socket ----------------//
io.on("connection", async (socket) => {
  console.log(`the socket ${socket.id} is connected`);
  let allProducts = await productService.getAll();
  socket.emit("deliverProducts", allProducts);

  //socket.emit('messagelog', await chats.getAll())

  // socket.on('message', async data => {
  //     await chats.saveChat(data)
  //     io.emit('messagelog', await chats.getAll())
  // })
});
//------------------ end socket ----------------//

//views
app.get("/", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/logout", (req, res) => {
  res.render("logout");
});
app.get("/home", (req, res) => {
  res.render("home");
});

app.use("/*", (req, res) =>
  res.send({
    error: -2,
    description: `Path ${req.originalUrl} and method ${req.method} aren't implemented`,
  })
);
