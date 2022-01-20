import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { generate, __dirname } from "./utils.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { PORT, MONGO_URI } from "./config/config.js";
import ChatsService from "./services/chatsService.js";
import chats from "./routes/chats.js";


const chatsService = new ChatsService();

export const getConnection = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const app = express();
const server = app.listen(PORT, () => {
  console.log(`Listening on ${PORT} port.`);
  getConnection();
});

const io = new Server(server);

io.on("connection", (socket) => {
  socket.emit("welcome", "¡Se ha establecido una conexión con socket.io!");
  console.log("Cliente conectado");
  chatsService
    .getChats()
    .then((result) => {
      io.emit("chats", result.payload); //Se trae el object payload
    })
    .catch((err) => {
      console.error(err);
    });
  socket.on("chats", (data) => {
    chatsService
      .getChats()
      .then((result) => {
        io.emit("chats", result.payload);
      })
      .catch((err) => {
        console.error(err);
      });
  });
});

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(__dirname + "/public"));

app.use("/api/chats", chats);

app.get("/api/products/test", (req, res) => {
  try {
    const quantity = req.query.quantity ? parseInt(req.query.quantity) : 5;
    res.send({ status: "success", payload: generate(quantity) });
  } catch (err) {
    console.error(err);
    res.send({ status: "error", message: err.message });
  }
});

app.get("/", (req, res) => {
  res.render("index");
});
//documentation Rama master + carpeta challenges
