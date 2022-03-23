import express from "express";
const userRouter = express.Router();
import { getUser, getUsers } from "../controllers/userController.js";

userRouter.get("/", getUsers);
userRouter.get("/:userId", getUser);

export default userRouter;
