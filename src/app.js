import express from "express";
import cors from "cors";
import passport from "passport";
import initializePassport from "./config/passport-config.js";
import { __dirname } from "./utils.js";
import cookieParser from "cookie-parser";
import sessionRouter from "./routes/session.js";

const app = express();
const PORT = process.env.PORT || 8080;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use("/uploads/", express.static(__dirname + "/uploads"));
app.use(express.static(__dirname + "/public"));
app.use(passport.initialize());
initializePassport();
//routers
app.use("/session", sessionRouter);

app.get("/", (req, res) => {
  res.send("index.html");
});

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
server.on("error", (err) => console.error(`Error server: ${err}`));
