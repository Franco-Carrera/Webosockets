import multer from "multer";
import { __dirname } from "../utils.js";
import fs from "fs";

const getRandomFileName = (file) => {
  const randomString =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString().substring(2, 15);
  const randomUppercaseLowercaseString = randomString
    .split("")
    .map((v) => (Math.round(Math.random()) ? v.toUpperCase() : v.toLowerCase()))
    .join("");
  const extensionFile =
    "." +
    file.originalname.substring(
      file.originalname.lastIndexOf(".") + 1,
      file.originalname.length
    );
  return randomUppercaseLowercaseString + extensionFile;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = __dirname + "/uploads";
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  //Se llama a la función de arriba para crear file
  filename: (req, file, cb) => {
    cb(null, getRandomFileName(file));
  },
});

const upload = multer({ storage: storage });

export default upload;
