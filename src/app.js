import express from "express";
import cors from "cors";
import products from "./routes/products.js";
import carts from "./routes/carts.js";
import { __dirname } from "./utils.js";

const app = express();

const admin = true;

//// use middlewares //
/// /////////////////////
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(new Date().toTimeString().split(" ")[0], req.method, req.url);
  req.auth = admin;
  next();
});
app.use("/uploads/", express.static(__dirname + "/uploads"));
app.use(express.static(__dirname + "/public"));

/// ///////////
///routers ///

app.use("/api/products", products);
app.use("/api/cart", carts);

app.use("/*", (req, res) => {
  const date = new Date().toISOString();
  console.log(`[${date}] - ${req.method} ${req.path} not completed`);
});

export default app;
