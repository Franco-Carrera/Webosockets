import { ChatModel } from "../dao/models/Chat.js";
import { AuthorModel } from "../dao/models/Author.js";
import { normalize, schema } from "normalizr";

export default class ChatsService {
  async getChats() {
    try {
      const result = await ChatModel.find().populate("author");
      const originalData = {
        id: "messages",
        chats: JSON.parse(JSON.stringify(result)),
      };

      const author = new schema.Entity("author");

      const chat = new schema.Entity("chat", {
        author: author,
      });

      const messages = new schema.Entity("messages", {
        chats: [chat],
      });

      const normalizedData = normalize(originalData, messages);

      return { status: "success", payload: result };
    } catch (err) {
      console.error(err);
      return { status: "error", payload: err.message };
    }
  }

  async createChat(chat) {
    try {
      if (!chat) throw new Error("Losing attribute chat.");

      const authorData = {
        id: chat.id,
        firstName: chat.firstName,
        lastName: chat.lastName,
        age: parseInt(chat.age),
        alias: chat.alias,
        avatar: chat.avatar,
      };

      const authorCreated = await AuthorModel.create(authorData);

      const chatData = {
        author: authorCreated,
        message: chat.message,
      };

      const chatCreated = await ChatModel.create(chatData);

      return { status: "success", payload: chatCreated };
    } catch (err) {
      console.error(err);
      return { status: "error", payload: err.message };
    }
  }
}
