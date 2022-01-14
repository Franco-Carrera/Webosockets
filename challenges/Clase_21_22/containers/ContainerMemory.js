import { generate } from "../utils.js";

export default class MemoryContainer {
  constructor() {
    this.users = [];
  }

  generate(quantity = 50) {
    const people = generate(quantity);
    this.users.concat(people);
    return people;
  }

  getUsers() {
    return this.users;
  }
}
