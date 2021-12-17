import express from "express";
import Container from "../classes/Container.js";
import upload from "../services/uploader.js";
import { authMiddleware } from "../utils.js";

const router = express.Router();
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

router.get("/:pid", (req, res) => {
  const id = Number(req.params.pid);
  containerProducts.getById(id).then((result) => {
    if (result.status === "success") res.status(200).json(result);
    else res.status(500).send(result);
  });
});

//POSTS
router.post("/", authMiddleware, upload.single("picture"), (req, res) => {
  const file = req.file;
  const product = req.body;
  product.picture = `${req.protocol}://${req.hostname}:${process.env.PORT}/uploads/${file.filename}`;
  containerProducts.save(product).then((result) => {
    if (result.status === "success") res.status(200).json(result);
    else res.status(500).send(result);
  });
});

//PUTs
router.put("/:pid", authMiddleware, (req, res) => {
  let body = req.body;
  let id = parseInt(req.params.pid);
  containerProducts.updateById(id, body).then((result) => {
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
