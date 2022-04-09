export default class ProductDTO {
  constructor (product) {
    this.id = product._id
    this.name = product.name
    this.category = product.category
    this.description = product.description
    this.code = product.code
    this.price = parseInt(product.price)
    this.stock = parseInt(product.stock)
  }
}
