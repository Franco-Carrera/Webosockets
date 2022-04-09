import { __dirname } from "../utils.js";
import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 3000;
export const PERSISTENCE = process.env.PERSISTENCE;
export const ENVIRONMENT = process.env.ENVIRONMENT;

export const SWAGGER = {
  spec: {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Mutant API",
        version: "1.0.0",
      },
      servers: [
        {
          url: `http://localhost:${PORT}`,
        },
      ],
    },
    apis: [`${__dirname}/routes/*.js`],
  },
};

export const MONGO = {
  URI_DEVELOPMENT: process.env.MONGO_URI_DEVELOPMENT || "",
  URI_TESTER: process.env.MONGO_URI_TESTER || "",
};

export default {
  session: {
    ADMIN: process.env.ADMIN,
    PASSWORD: process.env.PASSWORD,
    APP_PWD: process.env.MAILER_PWD,
  },
  jwt: {
    SECRET: process.env.JWT_SECRET,
  },
  twilio: {
    CLIENT_SID: process.env.TWILIO_CLIENT_SID,
    AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
    SANDBOX_WHATSAPP_NUMBER: process.env.TWILIO_SANDBOX_WHATSAPP_NUMBER,
    PERSONAL_NUMBER: process.env.TWILIO_PERSONAL_NUMBER,
  },
};
