import loggerHandler from "../utils/loggerHandler.js";
import { PORT } from "../config/config.js";
import { productService } from "../services/services.js";
const logger = loggerHandler(); //

const insertProduct = async (req, res) => {
  const { file } = req;
  let { title, description, category, code, price, stock } = req.body;

  let thumbnail = "";
  if (file) {
    thumbnail = `${req.protocol}://${req.hostname}:${PORT}/uploads/${file.filename}`;
  }

  if (
    !title ||
    !description ||
    !category ||
    !code ||
    !price ||
    !stock ||
    !thumbnail
  )
    return res.send({ error: "Fields incompletes." });

  let product = {
    title,
    description,
    category,
    code,
    price,
    stock,
    thumbnail,
  };

  let products = await productService.getAll();
  if (products.length > 0) {
    let id = products[products.length - 1].id;
    product.id = id;
    await productService.save(product);
    res.send({ product: product });
    console.log(product);
  }
  {
    product.id = 1;

    await productService.save(product);
    res.send({ product: product });
  }
};

export default {
  insertProduct,
};
