import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import cors from "cors";
import MongoStore from "connect-mongo";
import passport from "passport";
import { __dirname } from "./utils.js";
import { engine } from "express-handlebars";
import { PORT, MONGO_URI } from "./config/config.js";
import { UserModel } from "./dao/models/User.js";
import uploader from "./services/uploader.js";
import initializePassportConfig from "./config/passport.js";

const expires = 30;
///
export const getConnection = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const app = express();
app.listen(PORT, () => {
  console.log(`Server running on ${PORT} port.`);
  getConnection();
});

////
//Middlewares  ///
app.use(
  session({
    store: MongoStore.create({ mongoUrl: MONGO_URI }),
    secret: "datingmoro",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: expires * 1000 },
  })
);

app.use(cors());
app.use(express.json());

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use("/uploads/", express.static(__dirname + "/uploads"));
app.use(express.static(__dirname + "/public"));

initializePassportConfig();
app.use(passport.initialize());
app.use(passport.session());
/////////////

//////POSTS register + login

app.post("/api/register", uploader.single("avatar"), async (req, res) => {
  try {
    const file = req.file;
    const user = req.body;
    user.age = parseInt(user.age);
    user.avatar = `${req.protocol}://${req.hostname}:${PORT}/uploads/${file.filename}`;

    const emailFound = await UserModel.findOne({ email: user.email });
    if (emailFound) throw new Error("Email already exists.");

    const usernameFound = await UserModel.findOne({ username: user.username });
    if (usernameFound) throw new Error("username already exists.");

    await UserModel.create(user);

    res.send({
      status: "success",
      message: "Successfully Registred!",
    });
  } catch (err) {
    console.error(err);
    return { status: "error", message: err.message };
    //res.status(400).send({});
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new Error("Email or password attribute is not complete."); //Validamos si son correctos

    const user = await UserModel.findOne({ email: email });
    if (!user) throw new Error("Not exists user.");

    req.session.user = {
      username: user.username,
      email: user.email,
    }; //instanciamos session de user al encontrarlo por email
    res.send({ status: "success" });
  } catch (err) {
    console.error(err);
    res.status(400).send({ status: "error", message: err.message });
  }
});
//------------------------------------------/
app.post("/api/logout", (req, res) => {
  req.session.destroy();
  req.logout();
  res.send({ status: "success", message: "Se cerró la sesión exitosamente." });
});

//////////GETS
//lógica session
app.get("/api/login", (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else if (req.session.user) res.send(req.session.user);
  else res.send({ status: "error", mesage: "Login failed." });
});

////Rutas facebook
app.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] }),
  (req, res) => {
    //
  }
);
app.get("/fail", (req, res) => {
  res.send({
    status: "error",
    message: "Ha fallado el inicio de sesión en Facebook.",
  });
});

///////Rutas render de carpeta Js
app.get("/", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get(
  "/home",
  passport.authenticate("facebook", { failureRedirect: "/fail" }),
  (req, res) => {
    res.render("home");
  }
);

// app.get("/", (req, res) => {
//   console.log("hola");
// });
