import Cart from '../models/Cart.js'
import Repository from './Repository.js'

export default class CartService extends Repository {
  constructor (dao) {
    super(dao, Cart.model)
  }

  async createCart (userId) {
    return await this.add({ products: [], user: userId })
  }

  // async getCart (cartId) {
  //   if (!cartId) throw new Error('Missing \'cartId\' parameter!')

  //   const cartFound = await Cart.findById(cartId).populate('products')
  //   if (!cartFound) throw new Error('Cart not found.')

  //   return cartFound
  // }

  // async getCarts () {
  //   return await Cart.find()
  // }

  // async createCart (userId) {
  //   if (!userId) throw new Error('Missing \'userId\' parameter!')

  //   const userFound = await User.findById(userId)
  //   if (!userFound) throw new Error('User not found.')

  //   const cartCreated = await Cart.create({ products: [], user: userFound._id })

  //   userFound.cart = cartCreated._id
  //   userFound.save()

  //   return cartCreated
  // }

  // async addProduct (cartId, productId) {
  //   if (!cartId || !productId) throw new Error('Missing \'cartId\' or \'productId\' parameter!')

  //   const cart = await Cart.findById(cartId)
  //   if (!cart) throw new Error('Non-existent cart.')

  //   const product = await Product.findById(productId)
  //   if (!product) throw new Error('Non-existent product.')

  //   const productFound = await Cart.findById(cartId).findOne({ products: productId })
  //   if (productFound) throw new Error('Product already exists in cart.')

  //   await Cart.findByIdAndUpdate(cartId, { $push: { products: product } })
  // }

  // async getProducts (cartId) {
  //   if (!cartId) throw new Error('Missing \'cartId\' parameter!')

  //   const cart = await Cart.findById(cartId).populate('products')
  //   if (!cart) throw new Error('Non-existent cart.')

  //   const products = cart.products
  //   return products
  // }

  // async deleteProduct (cartId, productId) {
  //   if (!cartId || !productId) throw new Error('Missing \'cartId\' or \'productId\' parameter!')

  //   const cart = await Cart.findById(cartId)
  //   if (!cart) throw new Error('Non-existent cart.')

  //   const product = await Cart.findById(cartId).findOne({ products: productId })
  //   if (!product) throw new Error('Non-existent product in cart.')

  //   await Cart.findByIdAndUpdate(cartId, { $pull: { products: productId } })
  // }

  // async deleteCart (cartId) {
  //   if (!cartId) throw new Error('Missing \'cartId\' parameter!')

  //   const cart = await Cart.findById(cartId)
  //   if (!cart) throw new Error('Non-existent cart.')

  //   const userFound = await User.findById(cart.user)
  //   if (!userFound) throw new Error('User not found.')

  //   userFound.cart = undefined
  //   userFound.save()

  //   await Cart.findByIdAndDelete(cartId)
  // }
}
