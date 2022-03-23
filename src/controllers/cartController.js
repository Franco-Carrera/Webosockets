import loggerHandler from "../utils/loggerHandler.js";
import { cartService } from "../services/services.js";
import { userService } from "../services/services.js";
const logger = loggerHandler();

import { createTransport } from "nodemailer";
import config from "../config/config.js";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_CLIENT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const transport = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: config.session.ADMIN,
    pass: config.session.APP_PWD,
  },
});

export const createCart = (req, res) => {
  cartService
    .save({ products: [] })
    .then((result) => res.send(result))
    .catch((err) => {
      logger.error(err.message);
      res.status(500).json({ message: err.message });
    });
};

export const addProduct = async (req, res) => {
  let cartId = req.params.cartId;
  let productId = req.body.id;
  cartService
    .addProduct(cartId, productId)
    .then((result) => res.send(result))
    .catch((err) => {
      logger.error(err.message);
      res.status(500).json({ message: err.message });
    });
};

export const fetchCart = async (req, res) => {
  try {
    let cartId = req.params.cartId;
    let result = await cartService.getBy({ _id: cartId });
    res.send(result);
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

export const fetchCarts = async (req, res) => {
  let result = await cartService.getAll();
  res.send(result);
  // .catch((err) => {
  //   logger.error(err.message);
  //   res.status(500).json({ message: err.message });
  // });
};

export const fetchProducts = async (req, res) => {
  let id = req.params.cartId;
  cartService
    .getProductsByCartId(id)
    .then((result) => res.send(result))
    .catch((err) => {
      logger.error(err.message);
      res.status(500).json({ message: err.message });
    });
};

export const deleteProduct = async (req, res) => {
  const cartId = req.params.cartId;
  const productId = req.params.productId;
  cartService
    .delete(cartId, productId)
    .then((result) => res.send(result))
    .catch((err) => {
      logger.error(err.message);
      res.status(500).json({ message: err.message });
    });
};

export const deleteCart = async (req, res) => {
  const id = req.params.cartId;
  cartService
    .delete(id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      logger.error(err.message);
      res.status(500).json({ message: err.message });
    });
};

export const confirmUser = async (req, res) => {
  try {
    let userId = req.params.userId; //tamb {userId} = req.params
    let user = await userService.getId(userId);
    const mail = {
      from: "Inital Api <Initial E-commerce>",
      to: config.session.ADMIN,
      subject: `nuevo pedido de ${user.first_name} ${user.email}`,
      html: `
                    <h1>Productos a comprar de ${user.first_name} ${
        user.email
      }</h1>
                    <small>${JSON.stringify(user.cart)}</small>
                `,
    };
    let emailResult = transport.sendMail(mail);

    let wspResult = await client.messages.create({
      from: "whatsapp:+14155238886",
      to: "whatsapp:+5491151197351",
      body: `nuevo pedido de ${user.first_name} ${
        user.email
      }, productos: ${JSON.stringify(user.cart)}`,
    });

    const sms = await client.messages.create({
      body: `Hola ${
        user.first_name
      }, su pedido ha sido registrado y se encuentra en proceso. Productos:${JSON.stringify(
        user.cart
      )}`,
      from: "+19033205689",
      to: `+${user.phone}`,
    });

    res.send(`Felicitaciones ${user.first_name} su compra fue realizada`);
  } catch (err) {
    console.error(err);
  }
};
