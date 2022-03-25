import UserDTO from "../dtos/userDTO.js";
import UsersService from "../services/usersService.js";

const usersService = new UsersService();

const getUsers = async (req, res) => {
  let result = await usersService.getUsers();
  let resultsDTO = result.map((user) => new UserDTO(user));
  res.send(resultsDTO);
};
const saveUser = async (req, res) => {
  let user = req.body;
  //Van validaciones
  let result = await usersService.addUser(user);
  res.send(new UserDTO(result));
};

export default {
  getUsers,
  saveUser,
};
