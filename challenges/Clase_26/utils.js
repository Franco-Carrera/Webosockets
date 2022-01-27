import { fileURLToPath } from "url";
import { dirname } from "path";

const filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(filename);

export const authMiddleware = (req, res, next) => {
  if (!req.auth)
    res.status(403).send({
      error: -1,
      description: `Path ${req.path} method ${req.method} unauthorized`,
    });
  else next();
};
