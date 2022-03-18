import loggerHandler from "../utils/loggerHandler.js";
import { userService } from "../services/services.js";
const logger = loggerHandler();

import { createTransport } from "nodemailer";
import config from "../config/config.js";
import { TWILIO } from "../config/config.js";
import twilio from "twilio";

const client = twilio(TWILIO.CLIENT_SID, TWILIO.AUTH_TOKEN);

const transport = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: config.session.ADMIN,
    pass: config.session.PASSWORD,
  },
});

export const getUsers = (req, res) => {
  userService
    .getAll()
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      logger.error(err);
      return res.status(500).json({ message: err.message });
    });
};

export const getUser = (req, res) => {
  const { userId } = req.params;

  userService
    .getId(userId)
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      logger.error(err);
      return res.status(500).json({ message: err.message });
    });
};

//capaz lleva async

export const confirmUser = async (req, res) => {
  try {
    let userId = req.params.uid;
    let user = await userService.getBy({ _id: userId });
    const mail = {
      from: "Inital Api <Initial E-commerce>",
      to: process.env.ADMIN,
      subject: `nuevo pedido de ${user.first_name} ${user.email}`,
      html: `
                    <h1>Productos a comprar de ${user.first_name} ${
        user.email
      }</h1>
                    <p>${JSON.stringify(user.cart)}</p>
                `,
    };
    let emailResult = transport.sendMail(mail);
    console.log(emailResult);

    let wspResult = await client.messages.create({
      from: "whatsapp:+14155238886",
      to: "whatsapp:+5491151197351",
      body: `nuevo pedido de ${user.first_name} ${
        user.email
      }, productos: ${JSON.stringify(user.cart)}`,
    });
    console.log(wspResult);

    const sms = await client.messages.create({
      body: `Hola ${
        user.first_name
      }, su pedido ha sido registrado y se encuentra en proceso. Productos:${JSON.stringify(
        user.cart
      )}`,
      from: "+19033205689",
      to: `+${user.phone}`,
    });
    console.log(sms);
    res.send(`Felicitaciones ${user.first_name} su compra fue realizada`);
  } catch (err) {
    console.log(err);
  }
};

//crear json con products y cart
