import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import passport from "passport";
import minimist from "minimist";
import dotenv from "dotenv";
import cors from "cors";
import initializePassportConfig from "./passport-config.js";
import randomApiRouter from "./routers/random.js";

dotenv.config();

let minimizedArg = minimist(process.argv.slice(2));
let config = {
  port: minimizedArg.p || 8080,
};

console.log();
const app = express();
const server = app.listen(config.port, () =>
  console.log(`Listening on port: ${config.port}`)
);
const connection = mongoose.connect(process.env.MONGO_URI);

//console.log();

///Middlewares
app.use(cors());
app.use(
  session({
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.static("public"));
app.use(express.json());
initializePassportConfig();
app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] }),
  (req, res) => {}
);

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/failPage",
  }),
  (req, res) => {
    res.send({ message: "FINALMENTE, logueado (;" });
  }
);

app.get("/failPage", (req, res) => {
  res.send({ message: "El inicio de sesión con Facebook ha fallado." });
});

app.get("/logout", (req, res) => {
  req.logout();
});

//////////////info
app.get("/info", (req, res) => {
  const info = {
    argv: process.argv,
    execPath: process.execPath,
    platform: process.platform,
    processId: process.pid,
    version: process.version,
    projectDir: process.cwd(),
    reservedMemory: process.memoryUsage().rss,
  };
  res.send(info);
});

app.use("/api", randomApiRouter);
