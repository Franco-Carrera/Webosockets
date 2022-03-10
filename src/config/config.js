import dotenv from "dotenv";
dotenv.config();
export default {
  mongo: {
    url: process.env.MONGO_URI || "mongodb://localhost:27017/coderback",
  },
  aws: {
    ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    SECRET_KEY: process.env.AWS_SECRET_KEY,
  },
  session: {
    ADMIN: process.env.ADMIN,
    PASSWORD: process.env.PASSWORD,
  },
  jwt: {
    SECRET: process.env.JWT_SECRET,
  },
};

export const PORT = process.env.PORT || 8080;

export const MAILER_AUTH = {
  USER: process.env.MAILER_AUTH_USER,
  PASSWORD: process.env.MAILER_AUTH_PASSWORD,
};
