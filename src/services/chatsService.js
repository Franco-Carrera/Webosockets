import Chats from "../dao/models/Chats.js";
import GenericQueries from "./genericQueries.js";

export default class ChatService extends GenericQueries {
  constructor(dao) {
    super(dao, Chats.model);
  }
}
