import express from "express";
import ContainerCart from "../classes/ContainerCart.js";

const router = express.Router();
const containerCarts = new ContainerCart();

/////POSTS
//Creando CART
router.post("/", (req, res) => {
  containerCarts.createCart().then((result) => {
    res.send(result);
    console.log(result);
  });
});

//Agrega productos al carrito por id
router.post("/:cid/products", (req, res) => {
  let cartId = parseInt(req.params.cid);
  let productId = parseInt(req.body.id);
  containerCarts.addToCart(cartId, productId).then((result) => {
    res.send(result);
    console.log(result);
  });
});

///DELETES
//Vacía por id el carrito
router.delete("/:cid", (req, res) => {
  let id = parseInt(req.params.cid);
  containerCarts.deleteById(id).then((result) => {
    res.send(result);
  });
});

//Delete de un id producto de su id carrito
router.delete("/:cid/products/:pid", (req, res) => {
  let cartId = parseInt(req.params.cid);
  let prodId = parseInt(req.params.pid);
  containerCarts.deleteProduct(cartId, prodId).then((result) => {
    res.send(result);
  });
});

//GETS
////Listando productos del carrito
router.get("/:cid/products", (req, res) => {
  let id = parseInt(req.params.cid);
  containerCarts.getProductsByCartId(id).then((result) => {
    res.send(result);
  });
});

export default router;
