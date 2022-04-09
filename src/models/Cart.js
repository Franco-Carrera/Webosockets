import mongoose from 'mongoose'

export default class Cart {
  static get model () {
    return 'Cart'
  }

  static get schema () {
    return {
      products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true }
    }
  }
}
