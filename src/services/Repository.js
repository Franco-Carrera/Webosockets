export default class Repository {
  constructor(dao, model) {
    this.dao = dao;
    this.model = model;
  }

  async get(params) {
    return this.dao.get(params, this.model);
  }

  async getOne(params) {
    return this.dao.getOne(params, this.model);
  }

  getId = async (options) => {
    return this.dao.getUser(options, this.model);
  }; //probar cambiar, poner async primero

  async add(document) {
    return this.dao.add(document, this.model);
  }

  async update(id, document) {
    return this.dao.update(id, document, this.model);
  }

  async delete(id) {
    return this.dao.delete(id, this.model);
  }
}
