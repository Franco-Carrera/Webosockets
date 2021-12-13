import express from "express";
const router = express.Router();
import upload from "../services/uploader.js";
import { io } from "../app.js";
import { authMiddleware } from "../utils.js";

import Container from "../classes/Container.js";
const containerProducts = new Container("products");

/// GETS
router.get("/", (req, res) => {
  containerProducts.getAll().then((result) => {
    res.send(result);
  });
});

router.get("/id?", (req, res) => {
  let pid = parseInt(req.query.id);
  containerProducts.getById(pid).then((result) => {
    if (result !== null) {
      res.send(result);
    } else {
      res.send({ error: "producto no encontrado" });
    }
  });
});

router.get("/pid", (req, res) => {
  let id = parseInt(req.params.id);
  containerProducts.getById(id).then((result) => {
    if (result !== null) {
      res.send(result);
    } else {
      res.send({ error: "producto no encontrado" });
    }
  });
});

//POSTS
router.post("/", authMiddleware, upload.single("image"), (req, res) => {
  let file = req.file;
  let product = req.body;
  product.thumbnail =
    req.protocol + "://" + req.hostname + ":8080" + "/images/" + file.filename;
  containerProducts.save(product).then((result) => {
    res.send(result);
    if (result.status === "success") {
      containerProducts.getAll().then((result) => {
        io.emit("deliverProducts", result);
      });
    }
  });
});

//PUTs
router.put("/:pid", authMiddleware, (req, res) => {
  let body = req.body;
  let id = parseInt(req.params.pid);
  containerProducts.updateProduct(id, body).then((result) => {
    res.send(result);
  });
});

//DELETEs
router.delete("/:pid", authMiddleware, (req, res) => {
  let id = parseInt(req.params.pid);
  containerProducts.deleteById(id).then((result) => {
    res.send(result);
  });
});

export default router;
