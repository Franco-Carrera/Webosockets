import CartsService from "../services/cartsService.js";
const service = new CartsService();

//Aquí se realizan los servicios del cartsService

export const createCart = (req, res) => {
  service
    .createCart()
    .then((cart) => {
      res.status(200).json({ status: "success", payload: cart });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ status: "error", message: err.message });
    });
};

export const addProduct = async (req, res) => {
  //Para acceder a parámetros en la URL, Según Id.
  const cartId = req.params.cartId;
  const productId = req.params.productId;

  service.addProduct(cartId, productId).then(() => {
    res
      .status(200)
      .json({
        status: "success",
        message: "Product has been added successfully!",
        //payload: cart.products
        //or cartId.productId
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ status: "error", message: err.message });
      });
  });
};

export const getProducts = async (req, res) => {
  const cartId = req.params.cartId;
  service
    .getProducts(cartId)
    .then((products) => {
      res.status(200).json({ status: "success", payload: products });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ status: "error", message: err.message });
    });
};

export const deleteProduct = async (req, res) => {
  const cartId = req.params.cartId;
  const productId = req.params.productId;

  service
    .deleteProduct(cartId, productId)
    //pruebo pasar parámetro sin respuesta
    .then((result) => {
      res.status(200).json({
        status: "success",
        message: "Product has been deleted successfully from the cart!",
      });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).json({ status: "error", message: err.message });
    });
};

export const deleteCart = async (req, res) => {
  const cartId = req.params.cartId;

  service.deleteCart(cartId).then(() => {
    res.status(200).json({
      status: "success",
      message: "Cart has been deleted successfully.",
    });
  });
};
