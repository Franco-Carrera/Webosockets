import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import cors from "cors";
import { __dirname } from "./utils.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { PORT, MONGO_URI } from "./config/config.js";
import ChatsService from "./services/chatsService.js";
import chats from "./routes/chats.js";
import { UserModel } from "./dao/models/User.js";
import uploader from "./services/uploader.js";

const expires = 670;
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
  console.log(`Listening on port: ${PORT}`);
  getConnection();
});

const io = new Server(server);

io.on("connection", (socket) => {
  socket.emit("welcome", "¡Conexión establecida con socket.io!");
  console.log("Cliente conectado.");
  chatsService
    .getChats()
    .then((result) => {
      io.emit("chats", result.payload);
    })
    .catch((err) => {
      console.error(err);
    });
  socket.on("chats", async (data) => {
    chatsService
      .createChat(data)
      .then((result) => {
        io.emit("chats", result.payload);
        chatsService
          .getChats()
          .then((result) => {
            io.emit("chats", result.payload);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  });
});
//Middlewares
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads/", express.static(__dirname + "/uploads"));
app.use(express.static(__dirname + "/public"));

//session
app.use(
  session({
    store: MongoStore.create({ mongoUrl: MONGO_URI }),
    secret: "morodating",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: expires * 1000 },
  })
);

//router
app.use("/api/chats", chats);

//POST para loguear y registrar
app.post("/api/register", uploader.single("avatar"), async (req, res) => {
  try {
    const file = req.file;
    const user = req.body;
    user.age = parseInt(user.age);
    user.avatar = `${req.protocol}://${req.hostname}:${PORT}/uploads/${file.filename}`;

    const emailFound = await UserModel.findOne({ email: user.email });
    if (emailFound) throw new Error("Email already exists.");

    const usernameFound = await UserModel.findOne({ username: user.username });
    if (usernameFound) throw new Error("Username already exists.");

    await UserModel.create(user);
    res.send({
      status: "success",
      message: "User has been registred successfully!",
    });
  } catch (err) {
    console.error(err);
    res.status(400).send({ status: "error", message: err.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new Error("Username or password is not complete.");
    const user = await UserModel.findOne({ email: email });
    if (!user) throw new Error("User not found.");
    if (user.password !== password) throw new Error("Password incorrect.");
    req.session.user = {
      username: user.username,
      email: user.email,
    };
    res.send({ status: "success" });
  } catch (err) {
    console.error(err);
    res.status(400).send({ status: "error", message: err.message });
  }
});

app.get("/api/login", (req, res) => {
  if (req.session.user) res.send(req.session.user);
  else res.send({ status: "error", message: "Login failed." });
});

app.post("/api/logout", (req, res) => {
  const { username } = req.session.user;
  req.session.user = null;
  res.send({ status: "success", payload: { username: username } });
});

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/chat", (req, res) => {
  res.render("chat");
});

app.get("/logout", (req, res) => {
  res.render("logout");
});
