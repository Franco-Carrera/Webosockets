import dotenv from "dotenv";
dotenv.config();
export default {
  mongo: {
    url: process.env.MONGO_URI || "mongodb://localhost:27017/coderback",
  },
  session: {
    ADMIN: process.env.ADMIN,
    PASSWORD: process.env.PASSWORD,
  },
  jwt: {
    SECRET: process.env.JWT_SECRET,
  },
};

export const TWILIO = {
  CLIENT_SID: process.env.TWILIO_CLIENT_SID,
  AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
  SANDBOX_WHATSAPP_NUMBER: process.env.TWILIO_SANDBOX_WHATSAPP_NUMBER,
  PERSONAL_NUMBER: process.env.TWILIO_PERSONAL_NUMBER,
};

export const PORT = process.env.PORT || 8080;

//export const MONGO_URI = process.env.MONGO_URI || "";
//Sacar

// export const MAILER_AUTH = {
//   USER: process.env.MAILER_AUTH_USER,
//   PASSWORD: process.env.MAILER_AUTH_PASSWORD,
// }; SIRVE
