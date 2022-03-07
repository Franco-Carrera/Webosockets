import multer from "multer";
import fs from "fs";
import { __dirname } from "../utils.js";

export const uploader = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const path = __dirname + "/uploads";
      fs.mkdirSync(path, { recursive: true });
      cb(null, path);
      ///fix for public/uploads
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);
    },
  }),
});
