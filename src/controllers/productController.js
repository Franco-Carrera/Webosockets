import loggerHandler from "../utils/loggerHandler.js";
import { PORT } from "../config/config.js";
import ProductsMongoDB from "../dao/products/productsMongoDB.js";
const productService = new ProductsMongoDB();
const logger = loggerHandler(); //

export const createProduct = (req, res) => {
  const { file } = req;
  let product = ({ prodName, category, description, code, price, stock } =
    req.body);
  console.log(product);

  let picture = "";
  if (file) {
    picture = `${req.protocol}://${req.hostname}:${PORT}/uploads/${file.filename}`;
  }

  productService
    .createProduct(product) //
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
