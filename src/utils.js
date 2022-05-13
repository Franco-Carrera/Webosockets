import multer from "multer";
import { fileURLToPath } from "url";
import { dirname } from "path";

const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const uploader = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "src/public/avatars");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);
    },
  }),
});

export default __dirname;
