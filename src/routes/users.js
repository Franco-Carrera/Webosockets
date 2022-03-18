import express from "express";
const userRouter = express.Router();
import {
  getUser,
  getUsers,
  confirmUser,
} from "../controllers/userController.js";

userRouter.get("/", getUsers);
userRouter.get("/:userId", getUser);
userRouter.get("/:userId/confirm", confirmUser); //check si lleva await

export default userRouter;

/*
userRouter.get("/:userId/confirm", async (req, res) => {
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
});
*/
