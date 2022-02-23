import { createTransport } from "nodemailer";

const appPwd = "moxcpzxeztbogyhd";

const transport = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "carrerafranco825@gmail.com",
    pass: appPwd,
  },
});
const mail = {
  from: "Clase de <coder hacking two>",
  to: "ing_mauricioespinosa@hotmail.com",
  subject: "Pruebita bien poderosa",
  html: `
  <h1 style="color:green;">¡10 STARS!</h1>
  <br>
  <small>Un pequeño saludo</small>
  `,
  attachments: {
    path: "",
  },
};
//SIMULANDO UN ENDPOINT DE TU SERVIDOR
try {
  const result = await transport.sendMail(mail);
  console.log(result);
} catch (err) {
  console.log(err);
}
