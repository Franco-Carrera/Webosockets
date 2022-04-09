export default class UserDTO {
  constructor(user) {
    this.id = user._id;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.fullName = `${user.first_name} ${user.last_name}`;
    this.email = user.email;
    this.username = user.username;
    this.phone = user.phone;
    this.address = user.address;
    this.age = parseInt(user.age);
  }
}
