import loggerHandler from "../utils/loggerHandler.js";
import { PORT } from "../config/config.js";
import { productService } from "../services/services.js";
const logger = loggerHandler(); //

export const createProduct = (req, res) => {
  const { file } = req;
  let product = ({ productName, category, description, code, price, stock } =
    req.body);

  let picture = "";
  if (file) {
    picture = `${req.protocol}://${req.hostname}:${PORT}/uploads/${file.filename}`;
  }

  productService
    .save(product) //
    .then((product) => {
      res.json({ product });
      console.log(product);
    })
    .catch((err) => {
      logger.error(err);
      return res.status(500).json({ message: err.message });
    });
};
//
