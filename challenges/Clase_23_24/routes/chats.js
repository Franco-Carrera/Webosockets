import express from "express";
import dotenv from "dotenv";
import ChatsService from "../services/chatsService.js";
dotenv.config();

const chatsService = new ChatsService();
const chats = express.Router();

chats.get("/", (req, res) => {
  chatsService.getChats().then((result) => {
    if (result.status === "success") res.status(200).json(result);
    else res.status(500).send(result);
  });
});
/*
chats.post('/', (req, res) => {
  const chat = req.body
  chatsService.createChat(chat)
    .then(result => {
      if (result.status === 'success') res.status(200).json(result)
      else res.status(500).send(result)
    })
})
*/
export default chats;
