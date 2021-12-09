import express from "express";
import Cart from "../classes/ContenedorCarrito.js";
//import upload from "../services/uploader.js";

const router = express.Router();
const contenedorDos = new Cart();

/////POSTS

////CREANDO CART
router.post("/", (req, res) => {
  let body = req.body;
  console.log(body);
  contenedorDos.createCart(body).then((result) => {
    res.send(result);
  });
});

////AGREGAR PRODUCTS AL CARRITO por id
router.post("/:pid/products", (req, res) => {
  let productid = parseInt(req.params.pid);
  let cuerpo = req.body;
  console.log(cuerpo);
  contenedorDos.addToCart(cuerpo, productid).then((result) => {
    res.send(result);
  });
});

///DELETES

//VACÍA POR ID EL CARRITO
router.delete("/:pid", (req, res) => {
  let id = parseInt(req.params.pid);
  contenedorDos.deleteCart(id).then((result) => {
    res.send(result);
  });
});

///// DELETE DE UN ID DE PRODUCTO DE SU ID CARRITO
router.delete("/:pid/products/id_prod", (req, res) => {
  let productId = parseInt(req.params.pid);
  let idCart = parseInt(req.params.pid);
  contenedorDos.deleteCart(productId, idCart).then((result) => {
    res.send(result);
  });
});

//GETS

////LISTANDO PRODUCTS DEL CARRITO
router.get("/:pid/products", (req, res) => {
  let idProducts = parseInt(req.params.pid);
  contenedorDos.getAllCart(idProducts).then((result) => {
    res.send(result);
    console.log(result.payload);
  });
});

///// Reveer métodos CLASE Contenedora

//// CHEKEAR ROLE USERS // delete

export default router;
