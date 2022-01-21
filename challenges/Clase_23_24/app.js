import express from "express";
import mongoose from "mongoose";
import session from "express-session";
//import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import cors from "cors";
import { __dirname } from "./utils.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { PORT, MONGO_URI } from "./config/config.js";
import ChatsService from "./services/ChatsService.js";
import chats from "./routes/chats.js";
import { UserModel } from "./dao/models/User.js";
import upload from "./services/uploader.js";

////tiempo en que expira cookie///////
const expires = 60;
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
  console.log(`Server running on port ${PORT}`);
  getConnection();
});

const io = new Server(server);

io.on("connection", (socket) => {
  //socket emite, para establecer conexión
  socket.emit("Welcome, ¡Se ha establecido una conexión con socket.io !");
  console.log("Cliente conectado");
  //Se obtiene el chatsService en promesa, io emite payload del result.
  chatsService
    .getChats()
    .then((result) => {
      io.emit("chats", result.payload);
    })
    .catch((err) => {
      console.error(err);
    });
  //socket en on para traspasar data
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

//////////////
/// Middlewares //
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(__dirname + "/public"));

app.use(
  session({
    store: MongoStore.create({ mongoUrl: MONGO_URI }),
    secret: "moro22Dating",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: expires * 1000 },
  })
);

//router
app.use("/api/chats", chats);

//POSTS: para registrar
app.post("/api/register", upload.single("avatar"), async (req, res) => {
  const user = req.body;
  const userSaved = await UserModel.save(user);
  res.send({ status: "success", payload: userSaved });
});

// para loguear
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .send({ status: "error", message: "Data incomplete." });
  const user = await UserModel.find({ email: email });
  if (!user)
    return res
      .status(400)
      .send({ status: "error", message: "User not exists." });
});
//para desloguear
app.post("/api/logout", (req, res) => {
  //Invocamos session del usuario
  const { username } = req.session.user;
  req.session.user = null;
  res.send({ status: "success", payload: { username: username } });
});

///////GETS
app.get("/", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/chat", (req, res) => {
  if (req.session.user) res.render("chat");
  else res.render("login");
});
app.get("/logout", (req, res) => {
  res.render("logout");
});
