import { Server } from "socket.io";
import ServerApp from "./app.js";
import { productService } from "./services/services.js";
const server = new ServerApp();

export const io = new Server(server);
server.run();

//-------------------- socket ----------------//
io.on("connection", async (socket) => {
  console.log(`the socket ${socket.id} is connected`);
  let allProducts = await productService.getAll();
  socket.emit("deliverProducts", allProducts);

  //socket.emit('messagelog', await chats.getAll())

  // socket.on('message', async data => {
  //     await chats.saveChat(data)
  //     io.emit('messagelog', await chats.getAll())
  // })
});

//------------------ end socket ----------------//
