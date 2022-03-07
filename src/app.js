import express from "express";
import cors from "cors";
import passport from "passport";
import initializePassport from "./config/passport-config.js";
import { __dirname } from "./utils.js";
import sessionRouter from "./routes/session.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use("/uploads/", express.static(__dirname + "/uploads"));
app.use(express.static("public"));
initializePassport();
app.use(passport.initialize());
app.use("/session", sessionRouter);
