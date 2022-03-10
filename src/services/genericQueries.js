//import Category from "../dao/models/Category.js";
//import Product from "../dao/models/Product.js";

export default class GenericQueries {
  constructor(dao, model) {
    this.dao = dao;
    this.model = model;
  }
  getBy = async (options) => {
    return this.dao.findOne(options, this.model);
  };
  getAll = async (options) => {
    return await this.dao.getAll(options, this.model);
  };
  createProduct = async (document) => {
    return await this.dao.createProduct(document, this.model); //create
  };
  save = async (document) => {
    return this.dao.insert(document, this.model);
  };
  update = async (id, document) => {
    document._id = id;
    return this.dao.update(document, this.model);
  };
  delete = async (id) => {
    return this.dao.delete(id, this.model);
  };
}
