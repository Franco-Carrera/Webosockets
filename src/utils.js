import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";

const filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(filename);

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);
export const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["JWT_COOKIE"];
  }
  return token;
};

export const authMiddleware = (req, res, next) => {
  if (!req.auth) {
    res.status(403).send({
      error: -1,
      description: `Path ${req.originalUrl} with method ${req.method} are Not Authorised `,
    });
    console.log(
      `Path ${req.originalUrl} with method ${req.method} are Not Authorised `
    );
  } else {
    next();
  }
};
