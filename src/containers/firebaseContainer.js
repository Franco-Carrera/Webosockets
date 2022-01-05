import admin from "firebase-admin";
import { createRequire } from "module";
import { __dirname } from "../utils.js";
import fs from "fs";

const require = createRequire(import.meta.url);
const serviceAccount = require("../dao/db/proyecto-backend-b5315-firebase-adminsdk-qpu7b-fcdbba61c8.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
});

export default class FirebaseContainer {
  constructor() {
    this.db = admin.firestore();
  }

  async deleteFileFromServer(product) {
    try {
      if (!product) throw new Error("Losing 'Product' parameter.");
      const picture = product.picture;
      const index = picture.lastIndexOf("/") + 1;
      const pictureName = picture.substring(index, picture.length);
      await fs.promises.unlink(__dirname + "/uploads/" + pictureName);
      console.log(
        `Picture ${pictureName} has been deleted successfully from server.`
      );
    } catch (err) {
      console.error(err);
    }
  }
}
