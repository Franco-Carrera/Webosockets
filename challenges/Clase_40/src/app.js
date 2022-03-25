import express from "express";
import usersRouter from "./routes/usersRouter.js";
import MongoClient from "./daos/MongoClient.js";

const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => console.log("now listening 8080"));

//let client = new MongoClient();
//client.connect();

app.use(express.json());
app.use("/users", usersRouter);
