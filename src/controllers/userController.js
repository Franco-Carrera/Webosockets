import loggerHandler from "../utils/loggerHandler.js";
import { userService } from "../services/services.js";
const logger = loggerHandler();

export const getUsers = (req, res) => {
  userService
    .getAll()
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      logger.error(err);
      return res.status(500).json({ message: err.message });
    });
};

export const getUser = (req, res) => {
  const { userId } = req.params;

  userService
    .getId(userId)
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      logger.error(err);
      return res.status(500).json({ message: err.message });
    });
};
