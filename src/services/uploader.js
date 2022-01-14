import multer from "multer";
import fs from "fs";
import { __dirname } from "../utils.js";

const getRandomFileName = (file) => {
  const randomString =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
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

//Se crea random String
// Se toma el anterior y se crea randomString nuevo con mayus o minus.
// Se crea la extensión del file con su longitud e índice
// Por último se suma el file al string creado.

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
