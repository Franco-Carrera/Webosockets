import express from "express";
import { engine } from "express-handlebars";
import cors from "cors";
import ContenedorProductos from "./classes/ContenedorProductos.js";
import productsRouter from "./routes/productos.js";
import usersRouter from "./routes/users.js";
import upload from "./services/uploader.js";
import __dirname from "./utils.js";
import { Server } from "socket.io";

const app = express();
const PORT = process.env.PORT || 8080;
const contenedor = new ContenedorProductos();

const server = app.listen(PORT, () => {
  console.log("Listening on port: ", PORT);
});
export const io = new Server(server);

//const io = new Server(server);

//handlebars
app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//// use middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(new Date().toTimeString().split(" ")[0], req.method, req.url);
  next();
});
app.use(express.static(__dirname + "/public"));
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);

app.post("/api/adoption", (req, res) => {
  let userId = parseInt(req.body.uid);
  let productId = parseInt(req.body.pid);
  contenedor.adoptProduct(userId, productId).then((result) => {
    res.send(result);
  });
});

app.post(
  "/api/uploadfile",
  upload.fields([
    {
      name: "file",
      maxCount: 1,
    },
    {
      name: "documents",
      maxCount: 3,
    },
  ]),
  (req, res) => {
    const files = req.files;
    console.log(files);
    if (!files || files.length === 0) {
      res.status(500).send({ messsage: "No se subió archivo" });
    }
    res.send(files);
  }
);

/////Get all Products
app.get("/view/products", (req, res) => {
  contenedor.getAllProducts().then((result) => {
    let info = result.payload;
    let preparedObject = {
      products: info,
    };
    res.render("products", preparedObject);
  });
});

//socket
io.on("connection", async (socket) => {
  console.log(`El socket ${socket.id} se ha conetado`);
  let products = await contenedor.getAllProducts();
  socket.emit("deliverProducts", products);
});
