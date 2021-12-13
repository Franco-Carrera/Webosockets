import express from "express";
import { engine } from "express-handlebars";
import cors from "cors";
import Container from "./classes/Container.js";
import upload from "./services/uploader.js";
import __dirname from "./utils.js";
import { Server } from "socket.io";

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log("Listening on port: ", PORT);
});
export const io = new Server(server);

const containerProducts = new Container("products");
const chatContainer = new Container("chat");

//handlebars
app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

const admin = true;

//// use middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(new Date().toTimeString().split(" ")[0], req.method, req.url);
  req.auth = admin;
  next();
});
app.use(express.static(__dirname + "/public"));
app.use("/api/products", productsRouter);
app.use("/api/users", productsRouter);
app.use("/api/cart", cartsRouter);

app.use(upload.single("image"));

import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/cart.js";

app.post("/api/adoption", (req, res) => {
  let userId = parseInt(req.body.uid);
  let productId = parseInt(req.body.pid);
  contenedor.adoptProduct(userId, productId).then((result) => {
    res.send(result);
  });
});

app.post("/api/uploadImage", upload.single("image"), (req, res) => {
  const image = req.file;
  if (!image || image.length === 0) {
    res.status(500).send({ message: "No se subió la imagen" });
  }
  res.send(image);
});

/////Get all Products
app.get("/view/products", (req, res) => {
  containerProducts.getAll().then((result) => {
    let preparedObject = {
      products: result,
    };
    res.render("products", preparedObject);
  });
});

//socket
io.on("connection", async (socket) => {
  console.log(`the socket ${socket.id} is connected`);
  let products = await containerProducts.getAll();
  socket.emit("deliverProducts", products);
});
//--------- end socket ----------------//

app.use("/*", (req, res) =>
  res.send({
    error: -2,
    description: `Path ${req.originalUrl} and method ${req.method} aren't implemented`,
  })
);
