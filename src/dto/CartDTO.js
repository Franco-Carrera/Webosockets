export default class CartDTO {
  constructor (cart) {
    this.id = cart._id
    this.products = cart.products
    this.user = cart.user
    this.createdAt = cart.createdAt
    this.updatedAt = cart.updatedAt
  }
}
