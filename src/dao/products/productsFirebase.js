import FirebaseContainer from "../../containers/firebaseContainer.js";

export default class ProductsFirebase extends FirebaseContainer {
  constructor() {
    super();
    this.collecRef = this.db.collection("products");
  }

  async getProducts() {
    try {
      const documents = await this.collecRef.get();
      const products = documents.docs.map((p) => {
        const product = p.data();
        product.id = p.id;
        return product;
      });
      return { status: "success", payload: products };
    } catch (err) {
      console.error(err);
      return { status: "error", message: err.message };
    }
  }
  async getProductById(productId) {
    try {
      if (!productId) throw new Error("Losing 'productId' attribute! ");
      const document = await this.collecRef.doc(productId).get();
      const product = document.data();
      if (!product) throw new Error("Not exists product.");

      product.id = document.id;

      return { status: "success", payload: product };
    } catch (err) {
      console.error(err);
      return { status: "error", message: err.message };
    }
  }
  async createProduct(body) {
    try {
      if (Object.keys(body).length === 0)
        throw new Error("Losing 'body product' attribute! ");
      if (
        !body.name ||
        !body.description ||
        !body.code ||
        !body.picture ||
        !body.price ||
        !body.stock ||
        !body.category
      )
        throw new Error("Body attributes not formed correctly.");

      const hasProduct = await this.collecRef
        .where("name", "==", body.name)
        .get();
      if (!hasProduct.empty) throw new Error("Product already exists.");

      body.stock = parseInt(body.stock);
      body.price = parseInt(body.price);

      const created = await this.collecRef.add(body);

      return {
        status: "Created success!",
        message: `Product with ID ${created.id} has been created successfully.`,
      };
    } catch (err) {
      console.error(err);
      return { status: "error", message: err.message };
    }
  }
  async updateProductById(productId, body) {
    try {
      if (!productId || Object.keys(body).length === 0)
        throw new Error(
          "Missing or lost 'productId' or  'body product' parameter!"
        );
      if (
        !body.name ||
        !body.description ||
        !body.code ||
        !body.picture ||
        !body.price ||
        !body.stock ||
        !body.category
      )
        throw new Error("Body attributes not formed correctly.");

      const document = this.collecRef.doc(productId);
      const result = await document.get();
      const product = result.data();
      if (!product) throw new Error("Not exists product.");

      body.stock = parseInt(body.stock);
      body.price = parseInt(body.price);

      await document.update(body);

      return {
        status: "success",
        message: "Product has been updated successfully.",
      };
    } catch (err) {
      console.err(err);
      return { status: "error", message: err.message };
    }
  }
  async deleteProductById(productId) {
    try {
      if (!productId) throw new Error("Losing 'productId' attribute! ");

      const document = this.collecRef.doc(productId);
      const result = await document.get();
      const product = result.data();
      if (!product) throw new Error("Not exists product.");

      await document.delete();
      super.deleteFileFromServer(product);

      return {
        status: "success",
        message: "Product has been deleted successfully",
      };
    } catch (err) {
      console.error(err);
      return { status: "error", message: err.message };
    }
  }
}
