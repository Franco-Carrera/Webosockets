import dotenv from "dotenv";
dotenv.config();

export const NODE_ENV = process.env.NODE_ENV; // "";
export const PORT = process.env.PORT || 3000; // 8080;
export const MONGO_URI = process.env.MONGO_URI || ""; // "";

//Investig como tipear signo más y palillos.
