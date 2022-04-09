import UserDTO from "../dto/UserDTO.js";
import { userService } from "../services/services.js";
import loggerHandler from "../middlewares/loggerHandler.js";
const logger = loggerHandler();

export const createUser = async (req, res) => {
  try {
    let {
      first_name,
      last_name,
      email,
      password,
      username,
      phone,
      address,
      age,
      avatar,
    } = req.body;
    const file = req.file;
    avatar = file
      ? `${req.protocol}://${req.hostname}:${process.env.PORT}/uploads/${file.filename}`
      : avatar;

    const userFound = await userService.getOne({ email });
    if (userFound) throw new Error("User already exists.");

    const document = {
      first_name,
      last_name,
      email,
      password: await userService.encryptPassword(password),
      username,
      phone,
      address,
      age: parseInt(age),
      avatar,
      role: "user",
    };

    const user = await userService.add(document);
    const userDTO = new UserDTO(user);
    res.json({ user: userDTO });
  } catch (err) {
    logger.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

export const fetchUsers = async (req, res) => {
  try {
    const users = await userService.get();
    const userDTOs = users.map((user) => new UserDTO(user));
    res.json({ users: userDTOs });
  } catch (err) {
    logger.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

export const fetchUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userService.getOne({ _id: userId });
    if (!user) throw new Error("Non-existent user.");

    const userDTO = new UserDTO(user);
    res.json({ user: userDTO });
  } catch (err) {
    logger.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    let {
      first_name,
      last_name,
      email,
      password,
      username,
      phone,
      address,
      age,
      role,
      avatar,
    } = req.body;

    const file = req.file;
    avatar = file
      ? (avatar = `${req.protocol}://${req.hostname}:${process.env.PORT}/uploads/${file.filename}`)
      : avatar;

    const userNotFound = await userService.getOne({ _id: userId });
    if (!userNotFound) throw new Error("Non-existent user.");

    const userFound = await userService.getOne({
      _id: { $ne: userId },
      email: { $eq: email },
    });
    if (userFound) throw new Error("User already exists.");

    const document = {
      first_name,
      last_name,
      email,
      password: await userService.encryptPassword(password),
      username,
      phone,
      address,
      age: parseInt(age),
      avatar,
      role,
    };

    const user = await userService.update(userId, document);
    const userDTO = new UserDTO(user);
    res.json({ user: userDTO });
  } catch (err) {
    logger.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await userService.delete(userId);
    res.sendStatus(204);
  } catch (err) {
    logger.error(err.message);
    res.status(400).json({ message: err.message });
  }
};
