import Product from '../models/Product.js'
import Repository from './Repository.js'

export default class ProductService extends Repository {
  constructor (dao) {
    super(dao, Product.model)
  }

  async getById (productId) {
    return this.dao.getOne({ _id: productId }, Product.model)
  }
}
