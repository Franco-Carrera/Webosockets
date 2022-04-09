export default class Product {
  static get model () {
    return 'Product'
  }

  static get schema () {
    return {
      name: { type: String, required: true },
      description: { type: String, required: true },
      category: { type: String, required: true },
      code: { type: String, required: true, unique: true },
      price: { type: Number, required: true },
      stock: { type: Number, required: true },
      picture: { type: String, required: true }
    }
  }
}
