import { __dirname } from "../utils.js";
import fs from "fs";

export default class FileContainer {
  constructor(path) {
    this.filePath = path;
  }

  async deleteFileFromServer(product) {
    try {
      if (!product) throw new Error("Missing 'product' parameter");
      const picture = product.picture;
      const index = picture.lastIndexOf("/") + 1;
      const pictureName = picture.substring(index, picture.length);
      await fs.promises.unlink(__dirname + "/uploads/" + pictureName);
      console.log(
        `Picture${pictureName} has been deleted successfully from server.`
      );
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }
}
