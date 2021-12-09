import express from "express";
import Cart from "../classes/ContenedorCarrito.js";
//import upload from "../services/uploader.js";

const router = express.Router();
const contenedorDos = new Cart();

//GETS

////CREANDO CART
router.get("/", (req, res) => {
  contenedorDos.getAllCart().then((result) => {
    res.send(result);
    console.log(result);
    /* if (result.status === "success") {
      contenedorDos.updateCart().then((result) => {
        console.log(result);
      });
    } */
  });
});

////LISTANDO PRODUCTS DEL CARRITO
router.get("/:pid/products", (req, res) => {
  let idProducts = parseInt(req.params.pid);
  contenedorDos.updateCart(idProducts).then((result) => {
    res.send(result);
    console.log(result.message);
  });
});

/////POSTS

////AGREGAR PRODUCTS AL CARRITO
router.post("/:pid/products", (req, res) => {
  let cuerpo = req.body;
  console.log(cuerpo);
  contenedorDos.addToCart(cuerpo).then((result) => {
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
  // contenedor.deleteCart(productId).then((result) => {
  //   res.send(result);
  // });
});

///// REVEER SI ESTÁN BIEN ELEGIDOS MÉTODOS
/// Imitar profe
//// CHEKEAR ROLE USERS

export default router;
