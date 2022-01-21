import { ChatModel } from "../dao/models/Chat.js";
import { UserModel } from "../dao/models/User.js";

export default class ChatsService {
  async getChats() {
    try {
      const result = await ChatModel.find().populate("user");
      return { status: "success", payload: result };
    } catch (err) {
      console.error(err);
      return { status: "error", payload: err.message };
    }
  }
  async createChat(chat) {
    try {
      if (!chat) throw new Error("Losing 'chat' attribute.");

      const userData = {
        ...chat,
        age: parseInt(chat.age),
      };

      const userCreated = await UserModel.create(userCreated);

      //Creamos objeto con la data del chat, contiene user y chat con texto
      const chatData = {
        user: userCreated,
        text: chat.text,
      };

      const chatCreated = await ChatModel.create(chatData);

      return { status: "success", payload: chatCreated };
    } catch (err) {
      console.error(err);
      return { status: "error", payload: err.message };
    }
  }
}
