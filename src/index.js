import app from "./app.js";
import { PORT } from "./config/config.js";

const server = app.listen(PORT, () => {
  const message = `| Server listen on port ${PORT} |`;
  const link = `| - http://localhost:${PORT}    |`;
  console.log("-".repeat(message.length));
  console.log(message);
  console.log(link);
  console.log("-".repeat(message.length));
});
server.on("error", (error) => console.log(`Error server: ${error}`));
