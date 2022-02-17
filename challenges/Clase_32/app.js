import express from "express";
import os from "os";
import { createLogger } from "./logger.js";

const PORT = parseInt(process.argv[2]) || 8080;
const app = express();
app.listen(PORT, () => console.log(`Listening for Winston on ${PORT} port.`));

const logger = createLogger();

app.use((req, res, next) => {
  logger.info(`Received info request ${req.method} method at ${req.path}`);
  next();
});

app.get("/", (req, res) => {
  res.send({ status: "success", message: "Welcome Moro API." });
});

app.get("/error", (req, res) => {
  const { username } = req.query;
  if (!username)
    logger.error(
      `The username atributte is missing on ${req.method} at ${req.path} route.`
    );
  res.send({ status: "error", message: "Invalid atributtes." });
});

app.get("/info", (req, res) => {
  res.send({
    status: "success",
    payload: {
      args: process.argv,
      os: process.platform,
      nodeVersion: process.version,
      memoryUsage: process.memoryUsage(),
      execPath: process.execPath,
      processId: process.pid,
      projectFolder: process.cwd(),
      cores: os.cpus().length,
    },
  });
});

app.use((req, res) => {
  logger.warn(`${req.method} method in path ${req.path} not in use.`);
  res.status(404).json({
    status: "error",
    description: `${req.method} method in path ${req.path} not implemented.`,
  });
});
