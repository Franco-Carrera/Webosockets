import { Router } from "express";
import { passportCall, checkAuthorization } from "../middlewares/passport.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import uploadService from "../services/uploadService.js";

const sessionRouter = Router();

sessionRouter.get(
  "/current",
  passportCall("jwt"),
  checkAuthorization(["ADMIN", "USER"]),
  (req, res) => {
    let user = req.user;
    res.send(user);
  }
);

sessionRouter.post(
  "/register",
  uploadService.single("avatar"),
  passportCall("register"),
  (req, res) => {
    res.send({ status: "success", message: "Signed up" });
  }
);
sessionRouter.post("/login", passportCall("login"), (req, res) => {
  let user = req.user;
  let token = jwt.sign(user, config.jwt.SECRET);
  res.cookie("JWT_COOKIE", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
  });
  res.send({ status: "success", message: "Logged in" });
});

sessionRouter.post("/logout", (req, res) => {
  //change to POST
  res.clearCookie("JWT_COOKIE");
  res.send({ message: "Logged Out" });
});

export default sessionRouter;
